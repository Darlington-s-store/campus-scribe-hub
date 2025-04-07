
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import AdminArticleManager from '@/components/AdminArticleManager';
import { getStoredArticles, getStoredUsers } from '@/data/articles';
import { Article, User } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Users, Settings, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const activeTab = searchParams.get('tab') || 'pending';

  useEffect(() => {
    const userJSON = localStorage.getItem('currentUser');
    if (!userJSON || userJSON === 'null') {
      navigate('/login');
      return;
    }

    try {
      const currentUser = JSON.parse(userJSON) as User;
      setUser(currentUser);

      if (currentUser.role !== 'admin') {
        navigate('/dashboard');
        return;
      }

      const fetchData = async () => {
        // Try to fetch from Supabase first
        try {
          const { data: supabaseArticles, error: articlesError } = await supabase
            .from('articles')
            .select('*');
            
          const { data: supabaseUsers, error: usersError } = await supabase
            .from('users')
            .select('*');
          
          if (!articlesError && supabaseArticles) {
            // Convert from Supabase format to our Article type
            const formattedArticles = supabaseArticles.map(item => ({
              id: item.id,
              title: item.title,
              content: item.content,
              excerpt: item.excerpt,
              author: {
                id: item.author_id,
                name: item.author_name,
                indexNumber: item.author_index_number || '',
                role: item.author_role as 'student' | 'admin',
                createdAt: new Date(item.author_created_at)
              },
              status: item.status as 'pending' | 'approved' | 'rejected',
              createdAt: new Date(item.created_at),
              updatedAt: new Date(item.updated_at),
              tags: item.tags
            }));
            
            setArticles(formattedArticles);
          } else {
            // Fallback to local storage
            const localArticles = getStoredArticles();
            setArticles(localArticles);
          }
          
          if (!usersError && supabaseUsers) {
            // Convert from Supabase format to our User type
            const formattedUsers = supabaseUsers.map(item => ({
              id: item.id,
              name: item.name,
              indexNumber: item.index_number || '',
              role: item.role as 'student' | 'admin',
              createdAt: new Date(item.created_at)
            }));
            
            setUsers(formattedUsers);
          } else {
            // Fallback to local storage
            const localUsers = getStoredUsers();
            setUsers(localUsers);
          }
        } catch (error) {
          console.error('Error fetching from Supabase:', error);
          // Fallback to local storage
          const localArticles = getStoredArticles();
          const localUsers = getStoredUsers();
          setArticles(localArticles);
          setUsers(localUsers);
        }
      };

      fetchData();
      
      // Set up polling for updates
      const interval = setInterval(() => {
        fetchData();
      }, 10000);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const pendingArticles = articles.filter(article => article.status === 'pending');
  const approvedArticles = articles.filter(article => article.status === 'approved');
  const rejectedArticles = articles.filter(article => article.status === 'rejected');

  const handleSyncData = async () => {
    try {
      setIsSyncing(true);
      toast({
        title: 'Syncing Data',
        description: 'Synchronizing local data with Supabase...',
      });
      
      await supabase.functions.invoke('sync-data');
      
      toast({
        title: 'Sync Complete',
        description: 'Data has been synchronized successfully.',
      });
    } catch (error) {
      console.error('Error syncing data:', error);
      toast({
        title: 'Sync Failed',
        description: 'There was an error synchronizing data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Admin Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Pending Review</h3>
                  <p className="text-3xl font-bold text-blue-600">{pendingArticles.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Published</h3>
                  <p className="text-3xl font-bold text-green-600">{approvedArticles.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Rejected</h3>
                  <p className="text-3xl font-bold text-red-600">{rejectedArticles.length}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <Tabs defaultValue={activeTab} onValueChange={(value) => setSearchParams({ tab: value })}>
              <TabsList className="border-b border-gray-200 p-4">
                <TabsTrigger value="pending">Pending Review ({pendingArticles.length})</TabsTrigger>
                <TabsTrigger value="approved">Published ({approvedArticles.length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({rejectedArticles.length})</TabsTrigger>
                <TabsTrigger value="all">All Articles ({articles.length})</TabsTrigger>
                <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="pending">
                  <AdminArticleManager 
                    articles={articles} 
                    status="pending" 
                    onArticlesChanged={() => setArticles(getStoredArticles())}
                  />
                </TabsContent>
                
                <TabsContent value="approved">
                  <AdminArticleManager 
                    articles={articles} 
                    status="approved" 
                    onArticlesChanged={() => setArticles(getStoredArticles())}
                  />
                </TabsContent>
                
                <TabsContent value="rejected">
                  <AdminArticleManager 
                    articles={articles} 
                    status="rejected" 
                    onArticlesChanged={() => setArticles(getStoredArticles())}
                  />
                </TabsContent>
                
                <TabsContent value="all">
                  <AdminArticleManager 
                    articles={articles} 
                    status="all" 
                    onArticlesChanged={() => setArticles(getStoredArticles())}
                  />
                </TabsContent>
                
                <TabsContent value="users">
                  <div className="rounded-lg border">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-sm text-gray-700 border-b grid grid-cols-6">
                      <div className="col-span-2">Name</div>
                      <div className="col-span-2">Index Number</div>
                      <div>Role</div>
                      <div>Joined</div>
                    </div>
                    <div className="divide-y">
                      {users.map(user => (
                        <div key={user.id} className="px-4 py-3 grid grid-cols-6 items-center text-sm">
                          <div className="col-span-2 font-medium">{user.name}</div>
                          <div className="col-span-2">{user.indexNumber || 'N/A'}</div>
                          <div className="capitalize">{user.role}</div>
                          <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="database">
                  <div className="max-w-3xl mx-auto">
                    <Card className="p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                          <Info className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold">Supabase Integration</h3>
                      </div>
                      
                      <p className="mb-4">
                        Your application is now connected to Supabase for permanent data storage. 
                        You can manually synchronize data between local storage and Supabase if needed.
                      </p>
                      
                      <Button 
                        onClick={handleSyncData} 
                        disabled={isSyncing}
                        className="mt-2"
                      >
                        {isSyncing ? 'Syncing...' : 'Sync Data Now'}
                      </Button>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h3 className="font-semibold text-lg mb-4">Database Tables</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <span className="w-24 font-medium">users</span>
                            <span className="text-gray-600">{users.length} records</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-24 font-medium">articles</span>
                            <span className="text-gray-600">{articles.length} records</span>
                          </li>
                        </ul>
                      </Card>
                      
                      <Card className="p-6">
                        <h3 className="font-semibold text-lg mb-4">Storage</h3>
                        <p className="text-sm text-gray-600">
                          You can use Supabase Storage to store images, files, and other assets.
                        </p>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="font-semibold text-lg mb-4">Admin Settings</h3>
                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
                        This is a demo version of the admin panel. In a production environment, you would be able to configure various settings here.
                      </div>
                      
                      <div className="grid gap-4">
                        <div className="bg-white rounded-md border border-gray-200 p-4">
                          <h4 className="font-medium mb-2">Admin Credentials</h4>
                          <div className="text-sm text-gray-500">
                            <p>Email: admin@campus.edu</p>
                            <p>Password: admin123</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
