
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Article, User } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload } from 'lucide-react';

const SubmitArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('article_images')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('article_images')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check authentication status
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: 'Error',
          description: 'You must be logged in to submit an article',
          variant: 'destructive',
        });
        navigate('/login');
        return;
      }

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

      const currentUser = JSON.parse(userJSON) as User;
      
      // Generate excerpt from content (first 150 chars)
      const excerpt = content.length > 150 
        ? content.substring(0, 150) + '...' 
        : content;
      
      // Process tags
      const processedTags = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Upload image if provided
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      // Use the actual Supabase user ID if possible, otherwise fallback to local user
      const authorId = session?.user?.id || currentUser.id;

      // Insert article into Supabase
      const { data: article, error } = await supabase
        .from('articles')
        .insert({
          title,
          content,
          excerpt,
          author_id: authorId,
          author_name: currentUser.name,
          author_index_number: currentUser.indexNumber,
          author_role: currentUser.role,
          author_created_at: new Date(currentUser.createdAt),
          status: 'pending',
          tags: processedTags.length > 0 ? processedTags : [],
          image_url: imageUrl
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

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

      <div className="space-y-2">
        <Label htmlFor="image">Article Image (Optional)</Label>
        <input
          ref={fileInputRef}
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <div 
          onClick={triggerFileInput}
          className="cursor-pointer border-2 border-dashed rounded-md p-6 text-center hover:bg-gray-50 transition-colors"
        >
          {imagePreview ? (
            <div className="space-y-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-64 mx-auto"
              />
              <p className="text-sm text-gray-500">Click to change image</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-10 w-10 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-500">Click to upload an image</p>
            </div>
          )}
        </div>
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
