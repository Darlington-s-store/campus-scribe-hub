
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import ArticleCard from '@/components/ArticleCard';
import { getStoredArticles } from '@/data/articles';
import { Article } from '@/types';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all published articles
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // Try to fetch from Supabase first
        const { data: supabaseArticles, error } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        
        if (!error && supabaseArticles && supabaseArticles.length > 0) {
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
          
          // Extract all unique tags
          const tags = formattedArticles
            .flatMap(article => article.tags || [])
            .filter((tag, index, self) => self.indexOf(tag) === index);
          
          setAllTags(tags);
        } else {
          // Fallback to local storage
          const localArticles = getStoredArticles();
          const approvedArticles = localArticles.filter(article => article.status === 'approved');
          setArticles(approvedArticles);
          
          // Extract all unique tags
          const tags = approvedArticles
            .flatMap(article => article.tags || [])
            .filter((tag, index, self) => self.indexOf(tag) === index);
          
          setAllTags(tags);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        // Fallback to local storage
        const localArticles = getStoredArticles();
        const approvedArticles = localArticles.filter(article => article.status === 'approved');
        setArticles(approvedArticles);
        
        // Extract all unique tags
        const tags = approvedArticles
          .flatMap(article => article.tags || [])
          .filter((tag, index, self) => self.indexOf(tag) === index);
        
        setAllTags(tags);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    
    // Set up interval to check for new articles
    const interval = setInterval(fetchArticles, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter articles based on search term and tag
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm.trim() === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === null || 
      (article.tags && article.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-campus-dark mb-8 text-center">
            Campus Blog Articles
          </h1>
          
          {/* Search and filters */}
          <div className="max-w-3xl mx-auto mb-8">
            <Input
              type="text"
              placeholder="Search articles by title, content, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-gray-600">Filter by tag:</span>
                {allTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {selectedTag && (
                  <Badge 
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setSelectedTag(null)}
                  >
                    Clear filter
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          {/* Articles grid */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm animate-pulse h-64"></div>
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">No articles found</h3>
              <p className="text-gray-600">
                {articles.length === 0 
                  ? "No approved articles available yet. Check back soon!" 
                  : "No articles match your search criteria. Try a different search term or tag."}
              </p>
            </div>
          )}
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

export default Blog;
