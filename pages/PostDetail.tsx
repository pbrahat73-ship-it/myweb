import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Calendar, User, Clock, ArrowLeft, Tag } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { BlogPost } from '../types';
import { format } from 'date-fns';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (id) {
      const foundPost = StorageService.getPostById(id);
      setPost(foundPost || null);
      if (foundPost) {
        StorageService.incrementViews(id);
      }
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Post not found</h2>
        <Link to="/" className="text-indigo-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <article className="pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center text-slate-400 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {format(post.createdAt, 'MMMM d, yyyy')}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-slate-400 text-sm">
             <User className="w-4 h-4 mr-2" />
             <span className="mr-6">By {post.author}</span>
             <Clock className="w-4 h-4 mr-2" />
             <span>5 min read</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-xl shadow-lg border-4 border-white"
        />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
        <div className="prose prose-lg prose-indigo prose-slate mx-auto">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-slate-200 transition-colors">
                <Tag className="w-3 h-3 mr-2" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;