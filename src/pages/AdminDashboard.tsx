
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import ArticleCard from '@/components/ArticleCard';
import { getStoredArticles, saveArticles } from '@/data/articles';
import { Article, User } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in and is admin
    const userJSON = localStorage.getItem('currentUser');
    if (!userJSON || userJSON === 'null') {
      navigate('/login');
      return;
    }

    try {
      const currentUser = JSON.parse(userJSON) as User;
      setUser(currentUser);

      // If user is not admin, redirect to dashboard
      if (currentUser.role !== 'admin') {
        navigate('/dashboard');
        return;
      }

      // Get all articles
      const fetchArticles = () => {
        const allArticles = getStoredArticles();
        setArticles(allArticles);
      };

      fetchArticles();
      
      // Set up interval to check for updates
      const interval = setInterval(fetchArticles, 3000);
      
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
          ? { ...article, status: 'approved', updatedAt: new Date() } 
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
          ? { ...article, status: 'rejected', updatedAt: new Date() } 
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

  // Group articles by status
  const pendingArticles = articles.filter(article => article.status === 'pending');
  const approvedArticles = articles.filter(article => article.status === 'approved');
  const rejectedArticles = articles.filter(article => article.status === 'rejected');

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-campus-dark mb-8">
            Admin Dashboard
          </h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Welcome, Admin!</h2>
            <p className="text-gray-700">
              This is the administrative dashboard where you can review and manage all articles submitted by students.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Pending Review</h3>
              <p className="text-3xl font-bold text-blue-800">{pendingArticles.length}</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Approved</h3>
              <p className="text-3xl font-bold text-green-800">{approvedArticles.length}</p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-100">
              <h3 className="text-lg font-semibold text-red-700 mb-2">Rejected</h3>
              <p className="text-3xl font-bold text-red-800">{rejectedArticles.length}</p>
            </div>
          </div>
          
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="pending">Pending Review ({pendingArticles.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedArticles.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedArticles.length})</TabsTrigger>
              <TabsTrigger value="all">All Articles ({articles.length})</TabsTrigger>
            </TabsList>
            
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
          </Tabs>
        </div>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Campus Scribe Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
