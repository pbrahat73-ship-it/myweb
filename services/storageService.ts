import { BlogPost } from '../types';
import { nanoid } from 'nanoid';

const STORAGE_KEY = 'techflow_posts';

// Seed data if empty
const seedData: BlogPost[] = [
  {
    id: '1',
    title: 'The Rise of Generative AI in Software Development',
    excerpt: 'How AI tools like Gemini and ChatGPT are reshaping the way we write code.',
    content: `
# The Rise of Generative AI

Artificial Intelligence has moved from a buzzword to a daily utility for developers. With the advent of **LLMs (Large Language Models)**, coding has become more accessible and efficient.

## Key Benefits
1. **Speed**: Boilerplate code is generated in seconds.
2. **Debugging**: AI acts as a pair programmer, spotting errors instantly.
3. **Learning**: Complex concepts are explained in simple terms.

Stay tuned for more updates on how this technology evolves!
    `,
    featuredImage: 'https://picsum.photos/800/400?random=1',
    tags: ['AI', 'Development', 'Future'],
    category: 'Artificial Intelligence',
    status: 'published',
    createdAt: Date.now() - 10000000,
    updatedAt: Date.now(),
    author: 'Admin',
    views: 120,
  },
  {
    id: '2',
    title: 'Understanding React Server Components',
    excerpt: 'A deep dive into the new paradigm of React rendering.',
    content: `
# React Server Components (RSC)

React is evolving. Server Components allow developers to keep some components on the server, reducing the bundle size sent to the client.

## Why RSC?
- **Zero Bundle Size**: Server components aren't included in the JS bundle.
- **Direct Backend Access**: Query databases directly from your components.

This is a game changer for performance.
    `,
    featuredImage: 'https://picsum.photos/800/400?random=2',
    tags: ['React', 'Frontend', 'Web'],
    category: 'Web Development',
    status: 'published',
    createdAt: Date.now() - 5000000,
    updatedAt: Date.now(),
    author: 'Admin',
    views: 85,
  }
];

export const StorageService = {
  getAllPosts: (): BlogPost[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      return seedData;
    }
    return JSON.parse(data);
  },

  getPostById: (id: string): BlogPost | undefined => {
    const posts = StorageService.getAllPosts();
    return posts.find((p) => p.id === id);
  },

  savePost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'> & { id?: string }): BlogPost => {
    const posts = StorageService.getAllPosts();
    
    if (post.id) {
      // Update existing
      const index = posts.findIndex((p) => p.id === post.id);
      if (index !== -1) {
        const updatedPost = {
          ...posts[index],
          ...post,
          updatedAt: Date.now(),
        };
        posts[index] = updatedPost;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        return updatedPost;
      }
    }

    // Create new
    const newPost: BlogPost = {
      ...post,
      id: nanoid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      views: 0,
    };
    posts.unshift(newPost); // Add to top
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
  },

  deletePost: (id: string): void => {
    const posts = StorageService.getAllPosts();
    const filtered = posts.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  incrementViews: (id: string): void => {
    const posts = StorageService.getAllPosts();
    const index = posts.findIndex((p) => p.id === id);
    if (index !== -1) {
      posts[index].views += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
  }
};