import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface RedditFormProps {
  onSubmit: (markdown: string) => void;
}

export function RedditForm({ onSubmit }: RedditFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Recursive function to process a single comment and its children.
  const processComment = (comment: any, depth = 0): string => {
    const indent = "> ".repeat(depth);
    let mdComment = `${indent}**u/${comment.data.author}**\n`;

    // Split the comment body into lines and add indent for each line.
    const commentBody = comment.data.body
      .split('\n')
      .map((line: string) => `${indent}${line}`)
      .join('\n');
    mdComment += `${commentBody}\n\n`;

    // Check if the comment has any replies
    if (comment.data.replies && comment.data.replies.data && comment.data.replies.data.children) {
      comment.data.replies.data.children.forEach((child: any) => {
        if (child.kind === 't1') {
          mdComment += processComment(child, depth + 1);
        }
      });
    }
    
    return mdComment;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const jsonUrl = url.replace(/\/?$/, '.json');
      const response = await fetch(jsonUrl);
      const data = await response.json();
      
      const post = data[0].data.children[0].data;
      let md = `# ${post.title}\n\n`;
      md += `*Posted by u/${post.author}*\n\n`;
      md += `${post.selftext}\n\n---\n\n`;
      
      const comments = data[1].data.children;
      comments.forEach((comment: any) => {
        if (comment.kind === 't1') {
          // Use the recursive processor for each top-level comment.
          md += processComment(comment, 0);
        }
      });
      
      onSubmit(md);
    } catch (error) {
      console.error('Error fetching Reddit data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Reddit thread URL here..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              Convert <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}