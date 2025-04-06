
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Settings, LogOut } from 'lucide-react';

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  path: string;
};

const AdminSidebar = () => {
  const location = useLocation();
  
  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin-dashboard',
    },
    {
      title: 'Articles',
      icon: FileText,
      path: '/admin-dashboard?tab=all',
    },
    {
      title: 'Users',
      icon: Users,
      path: '/admin-dashboard?tab=users',
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/admin-dashboard?tab=settings',
    },
  ];

  const handleLogout = () => {
    localStorage.setItem('currentUser', JSON.stringify(null));
    window.location.href = '/';
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">Campus Scribe</h2>
        <p className="text-sm text-gray-400">Admin Portal</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path || location.search.includes(item.path.split('?')[1] || '');
            
            return (
              <Link
                key={item.title}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 text-sm rounded-md text-gray-300 hover:bg-gray-800 hover:text-white w-full transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
