
import { useState } from 'react';
import { Article } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Pencil, Trash2, CheckCircle, XCircle, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { updateArticleStatus, deleteArticle } from '@/lib/supabase';

interface AdminArticleManagerProps {
  articles: Article[];
  status: 'pending' | 'approved' | 'rejected' | 'all';
  onArticlesChanged: () => void;
}

const AdminArticleManager = ({ articles, status, onArticlesChanged }: AdminArticleManagerProps) => {
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const filteredArticles = status === 'all' 
    ? articles 
    : articles.filter(article => article.status === status);

  const handleStatusChange = async (articleId: string, newStatus: 'approved' | 'rejected') => {
    try {
      setProcessing(prev => ({ ...prev, [articleId]: true }));
      
      const success = await updateArticleStatus(articleId, newStatus);
      
      if (!success) {
        throw new Error('Failed to update article status');
      }
      
      toast({
        title: `Article ${newStatus === 'approved' ? 'Approved' : 'Rejected'}`,
        description: `The article has been ${newStatus === 'approved' ? 'approved and published' : 'rejected'}.`,
      });
      
      onArticlesChanged();
    } catch (error) {
      console.error('Error updating article status:', error);
      toast({
        title: 'Error',
        description: 'There was an error updating the article status. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setProcessing(prev => ({ ...prev, [articleId]: false }));
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return;
    }
    
    try {
      setProcessing(prev => ({ ...prev, [articleId]: true }));
      
      const success = await deleteArticle(articleId);
      
      if (!success) {
        throw new Error('Failed to delete article');
      }
      
      toast({
        title: 'Article Deleted',
        description: 'The article has been permanently deleted.',
      });
      
      onArticlesChanged();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: 'Error',
        description: 'There was an error deleting the article. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setProcessing(prev => ({ ...prev, [articleId]: false }));
    }
  };

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">No articles found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map(article => (
        <Card key={article.id} className="h-full flex flex-col">
          {article.imageUrl && (
            <div className="relative w-full h-36 overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          <CardHeader className={article.imageUrl ? 'pt-3' : ''}>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
              <Badge 
                variant={
                  article.status === 'approved' ? 'default' :
                  article.status === 'pending' ? 'outline' : 'destructive'
                }
                className="ml-2"
              >
                {article.status === 'approved' ? 'Published' : 
                 article.status === 'pending' ? 'Pending' : 'Rejected'}
              </Badge>
            </div>
            <CardDescription>
              By {article.author.name} • {new Date(article.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
          </CardContent>
          <CardFooter className="flex flex-col border-t pt-4 gap-2">
            <div className="flex justify-between w-full">
              <Link to={`/blog/${article.id}`} className={article.status === 'approved' ? '' : 'pointer-events-none opacity-50'}>
                <Button variant="outline" size="sm">
                  Preview
                </Button>
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
            </div>
            
            <div className="flex justify-between w-full mt-2">
              {article.status === 'pending' ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleStatusChange(article.id, 'rejected')}
                    disabled={processing[article.id]}
                    className="border-red-300 text-red-500 hover:bg-red-50"
                  >
                    <XCircle size={16} className="mr-1" />
                    Reject
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => handleStatusChange(article.id, 'approved')}
                    disabled={processing[article.id]}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle size={16} className="mr-1" />
                    Approve
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteArticle(article.id)}
                    disabled={processing[article.id]}
                    className="border-red-300 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                  {article.status === 'rejected' ? (
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => handleStatusChange(article.id, 'approved')}
                      disabled={processing[article.id]}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Approve
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleStatusChange(article.id, 'rejected')}
                      disabled={processing[article.id]}
                    >
                      <Pencil size={16} className="mr-1" />
                      Unpublish
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AdminArticleManager;
