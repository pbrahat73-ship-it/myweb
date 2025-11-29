export interface BlogPost {
  id: string;
  title: string;
  content: string; // Markdown content
  excerpt: string;
  featuredImage: string;
  tags: string[];
  category: string;
  status: 'published' | 'draft';
  createdAt: number;
  updatedAt: number;
  author: string;
  views: number;
}

export interface User {
  username: string;
  role: 'admin';
}

export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
}

export interface Category {
  id: string;
  name: string;
}

export const CATEGORIES = [
  'Artificial Intelligence',
  'Web Development',
  'Cyber Security',
  'Cloud Computing',
  'Mobile Apps',
  'Blockchain',
  'IoT',
  'Gadgets'
];