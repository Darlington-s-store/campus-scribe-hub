
import { Article, User } from '@/types';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    indexNumber: 'admin123',
    role: 'admin',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'John Doe',
    indexNumber: 'STU001',
    role: 'student',
    createdAt: new Date('2023-02-15'),
  },
  {
    id: '3',
    name: 'Jane Smith',
    indexNumber: 'STU002',
    role: 'student',
    createdAt: new Date('2023-03-10'),
  },
];

// Mock articles
export const mockArticles: Article[] = [];

// Function to simulate storage
export const getStoredArticles = (): Article[] => {
  const storedArticles = localStorage.getItem('articles');
  return storedArticles ? JSON.parse(storedArticles) : mockArticles;
};

export const saveArticles = (articles: Article[]): void => {
  localStorage.setItem('articles', JSON.stringify(articles));
};

// Function to simulate storage for users
export const getStoredUsers = (): User[] => {
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : mockUsers;
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Initialize local storage with mock data if empty
export const initializeStorage = () => {
  if (!localStorage.getItem('users')) {
    saveUsers(mockUsers);
  }
  
  if (!localStorage.getItem('articles')) {
    saveArticles(mockArticles);
  }

  // Save current user for session
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(null));
  }
};
