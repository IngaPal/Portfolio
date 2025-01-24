import React, { useState } from 'react';
import { Bold, Italic, List, Link as LinkIcon } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    const content = document.querySelector('[contenteditable]')?.innerHTML;
    if (content) onChange(content);
  };

  const handleLink = () => {
    if (!showLinkInput) {
      setShowLinkInput(true);
      return;
    }

    if (linkUrl && linkText) {
      handleCommand('insertHTML', `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
      setShowLinkInput(false);
      setLinkUrl('');
      setLinkText('');
    }
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-800 p-2 flex items-center space-x-2">
        <button
          onClick={() => handleCommand('bold')}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCommand('italic')}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={handleLink}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        {showLinkInput && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Link Text"
              className="px-2 py-1 bg-gray-700 rounded text-sm"
            />
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://"
              className="px-2 py-1 bg-gray-700 rounded text-sm"
            />
          </div>
        )}
      </div>

      <div
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;