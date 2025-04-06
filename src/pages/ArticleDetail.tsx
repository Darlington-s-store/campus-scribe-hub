
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { getStoredArticles } from '@/data/articles';
import { Article } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = () => {
      try {
        const articles = getStoredArticles();
        const foundArticle = articles.find(article => article.id === id);
        
        if (foundArticle && foundArticle.status === 'approved') {
          setArticle(foundArticle);
        } else {
          // Article not found or not approved
          setArticle(null);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or hasn't been approved yet.
          </p>
          <Button onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            className="mb-6 hover:bg-gray-100"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
          
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b">
              <h1 className="text-3xl font-bold text-campus-dark mb-3">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 items-center mb-3">
                <span className="text-gray-600">
                  By {article.author.name}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">
                  {formatDate(article.createdAt)}
                </span>
                
                {article.tags && article.tags.length > 0 && (
                  <>
                    <span className="text-gray-400">•</span>
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="article-content prose prose-slate max-w-none">
                {article.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
                ))}
              </div>
            </div>
          </article>
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

export default ArticleDetail;
