
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getStoredUsers, saveUsers } from '@/data/articles';
import { User } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [indexNumber, setIndexNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const users = getStoredUsers();
      
      // Check if index number already exists
      const existingUser = users.find(user => user.indexNumber === indexNumber);
      if (existingUser) {
        toast({
          title: 'Error',
          description: 'A user with this index number already exists',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        indexNumber,
        role: 'student',
        createdAt: new Date(),
      };

      // In a real app, we would hash the password
      // For this demo, we'll store it in local storage
      const usersWithPassword = [
        ...users, 
        { ...newUser, password }
      ];
      
      saveUsers(usersWithPassword);

      toast({
        title: 'Registration Successful',
        description: 'You have been registered successfully. Please log in.',
      });

      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      toast({
        title: 'Error',
        description: 'There was an error registering. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>

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
          placeholder="Create a password"
          required
          minLength={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
          minLength={6}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};

export default RegisterForm;
