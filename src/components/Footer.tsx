import React from 'react';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-12 text-center text-gray-600">
      <a
        href="https://github.com/frankwiersma/reddit2markdown"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Github className="w-5 h-5" />
        View on GitHub
      </a>
    </footer>
  );
}