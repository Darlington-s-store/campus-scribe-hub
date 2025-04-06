
export interface User {
  id: string;
  name: string;
  indexNumber: string;
  role: 'student' | 'admin';
  createdAt: Date;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
