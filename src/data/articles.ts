
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
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Impact of AI on Education',
    content: `Artificial Intelligence (AI) is revolutionizing the way we approach education. From personalized learning experiences to automated grading systems, AI technologies are transforming traditional educational paradigms.\n\nPersonalized learning is perhaps one of the most significant contributions of AI to education. By analyzing student performance data, AI systems can identify strengths, weaknesses, and learning patterns unique to each student. This enables the creation of tailored learning paths that adapt to individual needs, ensuring that students progress at their own pace and receive targeted support when necessary.\n\nAutomated assessment tools powered by AI can now evaluate a wide range of student submissions, from multiple-choice questions to complex essays. These tools not only save educators valuable time but also provide immediate feedback to students, facilitating faster learning cycles.\n\nAI-powered virtual tutors and chatbots are becoming increasingly sophisticated, offering students 24/7 assistance with their studies. These digital assistants can answer questions, provide explanations, and guide students through complex problem-solving processes.\n\nHowever, the integration of AI in education is not without challenges. Concerns about data privacy, algorithmic bias, and the potential devaluation of human interaction in learning environments remain significant considerations.\n\nAs we continue to develop and deploy AI technologies in educational settings, it is crucial to maintain a balance between technological innovation and the irreplaceable value of human teaching and mentorship. The future of education likely lies in harnessing the power of AI to enhance, rather than replace, the human elements that are essential to effective learning.`,
    excerpt: 'Artificial Intelligence (AI) is revolutionizing the way we approach education. From personalized learning experiences to automated grading systems, AI technologies are transforming traditional educational paradigms.',
    author: mockUsers[2],
    status: 'approved',
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-11-16'),
    tags: ['education', 'technology', 'AI'],
  }
];

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
