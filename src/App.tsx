import React, { useState } from 'react';
import { Header } from './components/Header';
import { RedditForm } from './components/RedditForm';
import { MarkdownPreview } from './components/MarkdownPreview';
import { Footer } from './components/Footer';

function App() {
  const [markdown, setMarkdown] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Header />
        <RedditForm onSubmit={setMarkdown} />
        {markdown && <MarkdownPreview markdown={markdown} />}
        <Footer />
      </div>
    </div>
  );
}

export default App;