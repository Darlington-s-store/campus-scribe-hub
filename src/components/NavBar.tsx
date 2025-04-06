
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from '@/types';

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserJSON = localStorage.getItem('currentUser');
    if (storedUserJSON) {
      try {
        const storedUser = JSON.parse(storedUserJSON);
        setCurrentUser(storedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem('currentUser', JSON.stringify(null));
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-campus-primary">Campus Scribe Hub</h1>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-700 hover:text-campus-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="border-transparent text-gray-700 hover:text-campus-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Blog
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {currentUser.role === 'admin' && (
                  <Link to="/admin-dashboard">
                    <Button variant="outline">Admin Dashboard</Button>
                  </Link>
                )}
                {currentUser.role === 'student' && (
                  <Link to="/dashboard">
                    <Button variant="outline">My Dashboard</Button>
                  </Link>
                )}
                <span className="text-sm text-gray-700">Hello, {currentUser.name}</span>
                <Button onClick={handleLogout} variant="ghost">Logout</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
