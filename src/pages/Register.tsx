
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import RegisterForm from '@/components/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userJSON = localStorage.getItem('currentUser');
    if (userJSON && userJSON !== 'null') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Register for Campus Scribe Hub</CardTitle>
            <CardDescription className="text-center">
              Create an account to start submitting articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            
            <div className="mt-6 text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-campus-primary font-semibold hover:underline">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Campus Scribe Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
