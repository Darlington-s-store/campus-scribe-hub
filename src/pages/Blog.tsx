
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import ArticleCard from '@/components/ArticleCard';
import { getStoredArticles } from '@/data/articles';
import { Article } from '@/types';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    // Get all published articles
    const fetchArticles = () => {
      const allArticles = getStoredArticles();
      const approvedArticles = allArticles.filter(article => article.status === 'approved');
      setArticles(approvedArticles);
      
      // Extract all unique tags
      const tags = approvedArticles
        .flatMap(article => article.tags || [])
        .filter((tag, index, self) => self.indexOf(tag) === index);
      
      setAllTags(tags);
    };

    fetchArticles();
    
    // Set up interval to check for new articles
    const interval = setInterval(fetchArticles, 5000);
    
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
          {filteredArticles.length > 0 ? (
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
