
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getStoredUsers } from '@/data/articles';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LoginForm = () => {
  const [indexNumber, setIndexNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStudentSubmit = (e: React.FormEvent) => {
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

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Admin credentials
    const adminEmail = "admin@campus.edu";
    const correctAdminPassword = "admin123";

    if (email === adminEmail && adminPassword === correctAdminPassword) {
      // Create admin user object
      const adminUser = {
        id: "admin-1",
        name: "Admin User",
        email: adminEmail,
        role: "admin",
        createdAt: new Date(),
      };

      // Store admin user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(adminUser));

      toast({
        title: 'Admin Login Successful',
        description: 'Welcome to the admin dashboard!',
      });

      navigate('/admin-dashboard');
    } else {
      toast({
        title: 'Error',
        description: 'Invalid admin credentials',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Tabs defaultValue="student" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="student">Student Login</TabsTrigger>
        <TabsTrigger value="admin">Admin Login</TabsTrigger>
      </TabsList>
      
      <TabsContent value="student">
        <form onSubmit={handleStudentSubmit} className="space-y-6">
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
      </TabsContent>
      
      <TabsContent value="admin">
        <form onSubmit={handleAdminSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input
              id="adminEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
            <p className="text-xs text-muted-foreground">Use: admin@campus.edu</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminPassword">Admin Password</Label>
            <Input
              id="adminPassword"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
            <p className="text-xs text-muted-foreground">Use: admin123</p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Admin Login'}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
