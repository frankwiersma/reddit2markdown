import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface RedditFormProps {
  onSubmit: (markdown: string) => void;
}

export function RedditForm({ onSubmit }: RedditFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

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
          md += `**u/${comment.data.author}**\n\n${comment.data.body}\n\n`;
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