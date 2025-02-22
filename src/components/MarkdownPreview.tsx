import React, { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface MarkdownPreviewProps {
  markdown: string;
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const decodeHTMLEntities = (text: string): string => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Basic markdown rendering (you might want to use a proper markdown library for production)
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((origLine, i) => {
      const line = decodeHTMLEntities(origLine);
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-2xl font-bold mb-4">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-bold mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={i} className="block mb-2">{line.slice(2, -2)}</strong>;
      }
      if (line.startsWith('*') && line.endsWith('*')) {
        return <em key={i} className="block mb-2">{line.slice(1, -1)}</em>;
      }
      if (line === '---') {
        return <hr key={i} className="my-4" />;
      }
      if (line.trim().startsWith('>')) {
        const match = line.match(/^((?:>\s?)+)\s*(.*)$/);
        if (match) {
          const markers = match[1].match(/>/g) || [];
          const level = markers.length;
          const content = match[2];
          const trimmedContent = content.trim();
          const inlineContent =
            /^\*\*u\/.+\*\*$/.test(trimmedContent) ? (
              <strong>{trimmedContent.slice(2, -2)}</strong>
            ) : (
              <p>{content}</p>
            );
          let nestedContent: JSX.Element = inlineContent;
          for (let j = 0; j < level; j++) {
            nestedContent = (
              <blockquote key={`${i}-${j}`} className="border-l-4 border-gray-300 pl-2 mb-0">
                {nestedContent}
              </blockquote>
            );
          }
          return nestedContent;
        }
      }
      return line ? <p key={i} className="mb-2">{line}</p> : <br key={i} />;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Generated Markdown</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {showRaw ? 'Show Rendered' : 'Show Raw'}
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md">
        {showRaw ? (
          <pre className="whitespace-pre-wrap font-mono text-sm">{markdown}</pre>
        ) : (
          <div className="prose max-w-none">{renderMarkdown(markdown)}</div>
        )}
      </div>
    </div>
  );
}