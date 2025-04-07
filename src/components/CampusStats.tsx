
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Users, PenTool, Award } from 'lucide-react';
import { getStoredArticles, getStoredUsers } from '@/data/articles';
import { supabase } from '@/lib/supabase';

const CampusStats = () => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    registeredUsers: 0,
    userContributors: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Try to get stats from Supabase
        const { data: articles, error: articlesError } = await supabase
          .from('articles')
          .select('id, status, author_id');
        
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('id');
        
        if (articlesError || usersError || !articles || !users) {
          // Fallback to local storage
          const localArticles = getStoredArticles();
          const localUsers = getStoredUsers();
          
          const publishedArticles = localArticles.filter(a => a.status === 'approved');
          const uniqueContributors = [...new Set(localArticles.map(a => a.author.id))].length;
          
          setStats({
            totalArticles: localArticles.length,
            publishedArticles: publishedArticles.length,
            registeredUsers: localUsers.length,
            userContributors: uniqueContributors
          });
        } else {
          // Process Supabase data
          const publishedArticles = articles.filter(a => a.status === 'approved');
          const uniqueContributors = [...new Set(articles.map(a => a.author_id))].length;
          
          setStats({
            totalArticles: articles.length,
            publishedArticles: publishedArticles.length,
            registeredUsers: users.length,
            userContributors: uniqueContributors
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to local storage
        const localArticles = getStoredArticles();
        const localUsers = getStoredUsers();
        
        const publishedArticles = localArticles.filter(a => a.status === 'approved');
        const uniqueContributors = [...new Set(localArticles.map(a => a.author.id))].length;
        
        setStats({
          totalArticles: localArticles.length,
          publishedArticles: publishedArticles.length,
          registeredUsers: localUsers.length,
          userContributors: uniqueContributors
        });
      }
    };
    
    fetchStats();
  }, []);

  const statItems = [
    {
      title: 'Total Articles',
      value: stats.totalArticles,
      icon: FileText,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Published Articles',
      value: stats.publishedArticles,
      icon: Award,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Registered Users',
      value: stats.registeredUsers,
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Contributing Writers',
      value: stats.userContributors,
      icon: PenTool,
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item) => (
        <Card key={item.title} className="border border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${item.color} mr-4`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                <p className="text-3xl font-bold text-campus-primary">{item.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CampusStats;
