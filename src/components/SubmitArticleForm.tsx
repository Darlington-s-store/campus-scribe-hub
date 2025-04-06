
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getStoredArticles, saveArticles } from '@/data/articles';
import { Article, User } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const SubmitArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userJSON = localStorage.getItem('currentUser');
    if (!userJSON) {
      toast({
        title: 'Error',
        description: 'You must be logged in to submit an article',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    try {
      const currentUser = JSON.parse(userJSON) as User;
      const articles = getStoredArticles();
      
      // Generate excerpt from content (first 150 chars)
      const excerpt = content.length > 150 
        ? content.substring(0, 150) + '...' 
        : content;
      
      // Process tags
      const processedTags = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const newArticle: Article = {
        id: Date.now().toString(),
        title,
        content,
        excerpt,
        author: currentUser,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: processedTags.length > 0 ? processedTags : undefined,
      };

      saveArticles([...articles, newArticle]);

      toast({
        title: 'Article Submitted',
        description: 'Your article has been submitted for review',
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting article:', error);
      toast({
        title: 'Error',
        description: 'There was an error submitting your article. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Article Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title"
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Article Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your article here..."
          required
          className="min-h-[300px] w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="education, research, technology"
          className="w-full"
        />
        <p className="text-xs text-gray-500">Optional: Add tags to help categorize your article</p>
      </div>

      <div className="pt-4">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Article for Review'}
        </Button>
      </div>
    </form>
  );
};

export default SubmitArticleForm;
