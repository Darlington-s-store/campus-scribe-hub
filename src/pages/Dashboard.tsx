
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import ArticleCard from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { getStoredArticles } from '@/data/articles';
import { Article, User } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userArticles, setUserArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userJSON = localStorage.getItem('currentUser');
    if (!userJSON || userJSON === 'null') {
      navigate('/login');
      return;
    }

    try {
      const currentUser = JSON.parse(userJSON) as User;
      setUser(currentUser);

      // If user is admin, redirect to admin dashboard
      if (currentUser.role === 'admin') {
        navigate('/admin-dashboard');
        return;
      }

      // Get user's articles
      const fetchUserArticles = () => {
        const allArticles = getStoredArticles();
        const userArticles = allArticles.filter(article => article.author.id === currentUser.id);
        setUserArticles(userArticles);
      };

      fetchUserArticles();
      
      // Set up interval to check for updates
      const interval = setInterval(fetchUserArticles, 3000);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Group articles by status
  const pendingArticles = userArticles.filter(article => article.status === 'pending');
  const approvedArticles = userArticles.filter(article => article.status === 'approved');
  const rejectedArticles = userArticles.filter(article => article.status === 'rejected');

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-campus-dark">
              Student Dashboard
            </h1>
            <Link to="/submit-article">
              <Button>Write New Article</Button>
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
            <p className="text-gray-700">
              This is your personal dashboard where you can manage your articles and track their status.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Articles ({userArticles.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending Review ({pendingArticles.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedArticles.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedArticles.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {userArticles.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">No articles yet</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't submitted any articles yet. Start writing and sharing your knowledge!
                  </p>
                  <Link to="/submit-article">
                    <Button>Submit Your First Article</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pending">
              {pendingArticles.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-600">You don't have any articles pending review.</p>
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
                  <p className="text-gray-600">You don't have any approved articles yet.</p>
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
                  <p className="text-gray-600">You don't have any rejected articles.</p>
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

export default Dashboard;
