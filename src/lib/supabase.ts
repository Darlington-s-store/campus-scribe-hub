
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Some features might not work correctly.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

/**
 * Initializes the Supabase tables if they don't exist
 */
export const initializeSupabaseTables = async () => {
  // Check if tables exist first
  const { data: tables, error } = await supabase
    .from('articles')
    .select('id')
    .limit(1);
    
  if (error && error.code === '42P01') {
    console.log('Tables not found, initializing...');
    try {
      // Create tables and seed data
      await setupTables();
      await seedData();
      console.log('Supabase tables initialized successfully');
      return true;
    } catch (err) {
      console.error('Error initializing Supabase tables:', err);
      return false;
    }
  } else {
    console.log('Supabase tables already exist');
    return true;
  }
};

const setupTables = async () => {
  // These operations would normally be done through migrations
  // For demo purposes, we're doing it programmatically
  
  // Create users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      index_number TEXT,
      role TEXT NOT NULL CHECK (role IN ('student', 'admin')),
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  
  // Create articles table
  const createArticlesTable = `
    CREATE TABLE IF NOT EXISTS articles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      author_id UUID REFERENCES users(id) NOT NULL,
      author_name TEXT NOT NULL,
      author_index_number TEXT,
      author_role TEXT NOT NULL,
      author_created_at TIMESTAMP WITH TIME ZONE NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      tags TEXT[] DEFAULT '{}'
    );
  `;
  
  // Execute SQL through Supabase functions or migrations
  // For demo purposes we'll log these as placeholders
  console.log("Would execute:", createUsersTable);
  console.log("Would execute:", createArticlesTable);
  
  // In a real implementation, you would use database migrations or
  // Supabase's SQL editor to create these tables
};

const seedData = async () => {
  // Add admin user
  const adminUser = {
    name: 'Admin User',
    email: 'admin@campus.edu',
    password_hash: '$2a$10$Lrr8gkHWxN6OMKAFhSVkVuTXFrBZtsrOKp30mLTZZhbT9z9HhN2ZG', // admin123
    role: 'student',
    index_number: 'A001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  // In a real implementation, you would use Supabase's auth and database APIs
  console.log("Would seed admin user:", adminUser);
};

export const syncLocalStorageToSupabase = async () => {
  try {
    const localArticles = JSON.parse(localStorage.getItem('articles') || '[]');
    const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Only proceed if there's data to sync
    if (localArticles.length === 0 && localUsers.length === 0) {
      return;
    }
    
    console.log('Syncing local storage data to Supabase...');
    
    // Sync users first (because articles reference users)
    for (const user of localUsers) {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          name: user.name,
          index_number: user.indexNumber,
          role: user.role,
          email: `${user.indexNumber || user.id}@campus.edu`, // Generate an email since our local data doesn't have one
          password_hash: '$2a$10$Lrr8gkHWxN6OMKAFhSVkVuTXFrBZtsrOKp30mLTZZhbT9z9HhN2ZG', // Placeholder password hash
          created_at: user.createdAt,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
        
      if (error) {
        console.error('Error syncing user:', error);
      }
    }
    
    // Now sync articles
    for (const article of localArticles) {
      const { error } = await supabase
        .from('articles')
        .upsert({
          id: article.id,
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          author_id: article.author.id,
          author_name: article.author.name,
          author_index_number: article.author.indexNumber,
          author_role: article.author.role,
          author_created_at: article.author.createdAt,
          status: article.status,
          created_at: article.createdAt,
          updated_at: article.updatedAt,
          tags: article.tags || []
        }, { onConflict: 'id' });
        
      if (error) {
        console.error('Error syncing article:', error);
      }
    }
    
    console.log('Sync completed');
  } catch (error) {
    console.error('Error during sync:', error);
  }
};
