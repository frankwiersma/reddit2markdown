import React from 'react';
import { FileText } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <FileText className="w-12 h-12 text-indigo-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Reddit to Markdown Converter
      </h1>
      <p className="text-lg text-gray-600">
        Transform Reddit threads into beautifully formatted Markdown
      </p>
    </div>
  );
}