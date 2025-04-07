import { createClient } from '@supabase/supabase-js';
import { Article, User } from '@/types';
import { getStoredArticles, getStoredUsers, saveArticles } from '@/data/articles';
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the supabase client for use in other files
export const supabase = supabaseClient;

/**
 * Initializes the Supabase tables if they don't exist
 */
export const initializeSupabaseTables = async () => {
  // If Supabase is not configured, return false
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials are missing. Using local storage only.');
    return false;
  }
  
  try {
    // Check if we can connect to Supabase
    const { data, error } = await supabase
      .from('articles')
      .select('id')
      .limit(1);
      
    if (error) {
      console.error('Error checking Supabase tables:', error);
      return false;
    } else {
      console.log('Supabase tables already exist');
      return true;
    }
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
    return false;
  }
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
      // Check if the user exists in auth
      const { data: authUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();
        
      if (!authUser) {
        // Create a new user
        const { error } = await supabase
          .from('users')
          .insert({
            id: user.id,
            name: user.name,
            index_number: user.indexNumber,
            role: user.role,
            email: `${user.indexNumber || user.id}@campus.edu`, // Generate an email since our local data doesn't have one
            password_hash: '$2a$10$Lrr8gkHWxN6OMKAFhSVkVuTXFrBZtsrOKp30mLTZZhbT9z9HhN2ZG', // Placeholder password hash
            created_at: user.createdAt,
            updated_at: new Date().toISOString()
          });
            
        if (error) {
          console.error('Error syncing user:', error);
        }
      }
    }
    
    // Now sync articles
    for (const article of localArticles) {
      // Format the article data for Supabase
      const supabaseArticle = {
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
      };
      
      // Check if article exists
      const { data: existingArticle } = await supabase
        .from('articles')
        .select('id')
        .eq('id', article.id)
        .single();
        
      if (!existingArticle) {
        const { error } = await supabase
          .from('articles')
          .insert(supabaseArticle);
            
        if (error) {
          console.error('Error syncing article:', error);
        }
      }
    }
    
    console.log('Sync completed');
  } catch (error) {
    console.error('Error during sync:', error);
  }
};

export const fetchArticlesFromSupabase = async (): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      throw error;
    }
    
    // Convert from Supabase format to our Article type
    return data.map(item => ({
      id: item.id,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      author: {
        id: item.author_id,
        name: item.author_name,
        indexNumber: item.author_index_number || '',
        role: item.author_role as 'student' | 'admin',
        createdAt: new Date(item.author_created_at)
      },
      status: item.status as 'pending' | 'approved' | 'rejected',
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
      tags: item.tags,
      imageUrl: item.image_url
    }));
  } catch (error) {
    console.error('Error fetching articles from Supabase:', error);
    return getStoredArticles();
  }
};

export const updateArticleStatus = async (articleId: string, newStatus: 'approved' | 'rejected') => {
  try {
    const { error } = await supabase
      .from('articles')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', articleId);
    
    if (error) {
      throw error;
    }
    
    // Also update in localStorage as fallback
    const allArticles = getStoredArticles();
    const updatedArticles = allArticles.map(article => 
      article.id === articleId 
        ? { ...article, status: newStatus, updatedAt: new Date() } 
        : article
    );
    
    saveArticles(updatedArticles);
    
    return true;
  } catch (error) {
    console.error('Error updating article status:', error);
    return false;
  }
};

export const deleteArticle = async (articleId: string) => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', articleId);
    
    if (error) {
      throw error;
    }
    
    // Also delete from localStorage as fallback
    const allArticles = getStoredArticles();
    const updatedArticles = allArticles.filter(article => article.id !== articleId);
    
    saveArticles(updatedArticles);
    
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
};
