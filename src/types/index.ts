
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
  imageUrl?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Add Supabase Database types for type safety
export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string;
          author_id: string;
          author_name: string;
          author_index_number: string | null;
          author_role: string;
          author_created_at: string;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
          tags: string[] | null;
          image_url: string | null;
        };
      };
      users: {
        Row: {
          id: string;
          name: string;
          index_number: string | null;
          role: string;
          email: string;
          password_hash: string;
          created_at: string;
          updated_at: string;
        }
      }
    }
  }
}
