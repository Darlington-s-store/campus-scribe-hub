
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getStoredArticles } from '@/data/articles';
import { supabase } from '@/integrations/supabase/client';

const FeaturedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) {
          console.error('Error fetching from Supabase:', error);
          throw error;
        }
        
        if (data && data.length > 0) {
          // Convert from Supabase format to our Article type
          const formattedArticles = data.map(item => ({
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
            tags: item.tags,
            imageUrl: item.image_url
          }));
          
          setArticles(formattedArticles);
        } else {
          // Fallback to local storage if no articles in Supabase
          const localArticles = getStoredArticles();
          const approvedArticles = localArticles
            .filter(article => article.status === 'approved')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3);
          
          setArticles(approvedArticles);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        // Fallback to local storage
        const localArticles = getStoredArticles();
        const approvedArticles = localArticles
          .filter(article => article.status === 'approved')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);
        
        setArticles(approvedArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-7 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-100 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-12 bg-gray-100 rounded"></div>
            </CardContent>
            <CardFooter>
              <div className="h-10 bg-gray-200 rounded w-28"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No articles available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map(article => (
        <Card key={article.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
          {article.imageUrl && (
            <div className="relative w-full h-40 overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{article.title}</CardTitle>
            <CardDescription>
              By {article.author.name} • {new Date(article.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
          </CardContent>
          <CardFooter className="justify-between border-t pt-4">
            <Link to={`/blog/${article.id}`}>
              <Button variant="outline" size="sm">Read More</Button>
            </Link>
            
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {article.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{article.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedArticles;
