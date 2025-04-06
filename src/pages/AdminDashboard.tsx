import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import ArticleCard from '@/components/ArticleCard';
import { getStoredArticles, saveArticles, getStoredUsers } from '@/data/articles';
import { Article, User } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { FileText } from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [users, setUsers] = useState<User[]>([]);
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

      const fetchArticles = () => {
        const allArticles = getStoredArticles();
        setArticles(allArticles);
      };

      const fetchUsers = () => {
        const allUsers = getStoredUsers();
        setUsers(allUsers);
      };

      fetchArticles();
      fetchUsers();
      
      const interval = setInterval(() => {
        fetchArticles();
        fetchUsers();
      }, 3000);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleApproveArticle = (articleId: string) => {
    try {
      const allArticles = getStoredArticles();
      const updatedArticles = allArticles.map(article => 
        article.id === articleId 
          ? { ...article, status: 'approved' as const, updatedAt: new Date() } 
          : article
      );
      
      saveArticles(updatedArticles);
      setArticles(updatedArticles);
      
      toast({
        title: 'Article Approved',
        description: 'The article has been approved and is now published.',
      });
    } catch (error) {
      console.error('Error approving article:', error);
      toast({
        title: 'Error',
        description: 'There was an error approving the article. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRejectArticle = (articleId: string) => {
    try {
      const allArticles = getStoredArticles();
      const updatedArticles = allArticles.map(article => 
        article.id === articleId 
          ? { ...article, status: 'rejected' as const, updatedAt: new Date() } 
          : article
      );
      
      saveArticles(updatedArticles);
      setArticles(updatedArticles);
      
      toast({
        title: 'Article Rejected',
        description: 'The article has been rejected.',
      });
    } catch (error) {
      console.error('Error rejecting article:', error);
      toast({
        title: 'Error',
        description: 'There was an error rejecting the article. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const pendingArticles = articles.filter(article => article.status === 'pending');
  const approvedArticles = articles.filter(article => article.status === 'approved');
  const rejectedArticles = articles.filter(article => article.status === 'rejected');

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
          
          <div className="grid grid-cols-3 gap-6 mb-8">
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
                  <h3 className="text-lg font-semibold text-gray-700">Approved</h3>
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
                <TabsTrigger value="approved">Approved ({approvedArticles.length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({rejectedArticles.length})</TabsTrigger>
                <TabsTrigger value="all">All Articles ({articles.length})</TabsTrigger>
                <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="pending">
                  {pendingArticles.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pendingArticles.map(article => (
                        <ArticleCard 
                          key={article.id} 
                          article={article} 
                          isAdmin={true}
                          onApprove={handleApproveArticle}
                          onReject={handleRejectArticle}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-gray-600">There are no articles pending review.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="approved">
                  {approvedArticles.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {approvedArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-gray-600">There are no approved articles yet.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="rejected">
                  {rejectedArticles.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rejectedArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-gray-600">There are no rejected articles.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="all">
                  {articles.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {articles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-gray-600">There are no articles in the system yet.</p>
                    </div>
                  )}
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
