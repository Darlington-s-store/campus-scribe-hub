
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import SubmitArticleForm from '@/components/SubmitArticleForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/types';

const SubmitArticle = () => {
  const [user, setUser] = useState<User | null>(null);
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

      // If user is admin but accessing student page, redirect to admin dashboard
      // (admins don't submit articles in this system)
      if (currentUser.role === 'admin') {
        navigate('/admin-dashboard');
        return;
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Submit a New Article</CardTitle>
              <CardDescription>
                Share your knowledge and insights with the campus community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubmitArticleForm />
            </CardContent>
          </Card>
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

export default SubmitArticle;
