
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getStoredUsers } from '@/data/articles';
import { useToast } from '@/components/ui/use-toast';

const LoginForm = () => {
  const [indexNumber, setIndexNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const users = getStoredUsers();
      
      // Find user by index number
      const user = users.find(user => 
        user.indexNumber === indexNumber && 
        // @ts-ignore - we added password to the user object in the register form
        user.password === password
      );

      if (!user) {
        toast({
          title: 'Error',
          description: 'Invalid index number or password',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      // Store current user (without password) in localStorage
      const { password: _, ...userWithoutPassword } = user as any;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${user.name}!`,
      });

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast({
        title: 'Error',
        description: 'There was an error logging in. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="indexNumber">Index Number</Label>
        <Input
          id="indexNumber"
          value={indexNumber}
          onChange={(e) => setIndexNumber(e.target.value)}
          placeholder="Enter your student index number"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;
