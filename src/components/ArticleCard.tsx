
import { Article } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
  isAdmin?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const ArticleCard = ({ article, isAdmin, onApprove, onReject }: ArticleCardProps) => {
  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
          {article.status !== 'approved' && (
            <Badge 
              variant={article.status === 'pending' ? 'outline' : 'destructive'}
              className="ml-2"
            >
              {article.status === 'pending' ? 'Pending Review' : 'Rejected'}
            </Badge>
          )}
        </div>
        <CardDescription>
          By {article.author.name} • {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        {isAdmin && article.status === 'pending' ? (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onReject && onReject(article.id)}
              className="border-red-300 text-red-500 hover:bg-red-50"
            >
              Reject
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onApprove && onApprove(article.id)}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
          </div>
        ) : (
          <Link to={`/blog/${article.id}`} className="inline-block">
            <Button variant="outline" size="sm">Read More</Button>
          </Link>
        )}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
