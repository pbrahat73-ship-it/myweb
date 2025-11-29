import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Eye, Hash } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { BlogPost } from '../types';
import { format } from 'date-fns';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [heroPost, setHeroPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const allPosts = StorageService.getAllPosts().filter(p => p.status === 'published');
    setPosts(allPosts);
    if (allPosts.length > 0) {
      setHeroPost(allPosts[0]);
    }
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      {heroPost && (
        <div className="relative bg-slate-900 h-[500px] flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={heroPost.featuredImage} 
              alt={heroPost.title} 
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded mb-4 uppercase tracking-wider">
                Featured
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {heroPost.title}
              </h1>
              <p className="text-lg text-slate-300 mb-8 line-clamp-3">
                {heroPost.excerpt}
              </p>
              <Link
                to={`/post/${heroPost.id}`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-white hover:bg-slate-100 transition-colors"
              >
                Read Article
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="h-48 overflow-hidden relative group">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-slate-500 mb-3 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(post.createdAt, 'MMM d, yyyy')}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {post.views}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                  <Link to={`/post/${post.id}`} className="hover:text-indigo-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                     {post.tags.slice(0, 2).map(tag => (
                       <span key={tag} className="text-xs text-slate-500 flex items-center">
                         <Hash className="w-2 h-2 mr-0.5" />{tag}
                       </span>
                     ))}
                  </div>
                  <Link 
                    to={`/post/${post.id}`}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium inline-flex items-center group"
                  >
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;