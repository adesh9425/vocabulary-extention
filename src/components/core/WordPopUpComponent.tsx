import React from 'react';
import { BookOpen, Share2, Star, BookmarkPlus } from 'lucide-react';

const WordPopup = ({ word }: { word: string }) => {
  return (
    <div className="w-96 bg-white shadow-xl rounded-lg p-6 max-h-[500px] overflow-y-auto">
      {/* Word Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{word}</h2>
        <div className="flex space-x-2">
          <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
            <BookmarkPlus size={20} />
          </button>
          <button className="text-green-500 hover:bg-green-50 p-2 rounded-full">
            <Star size={20} />
          </button>
          <button className="text-purple-500 hover:bg-purple-50 p-2 rounded-full">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Pronunciation */}
      <div className="mb-4">
        <span className="text-gray-600 italic">/wərd/</span>
        <button className="ml-2 text-blue-500">
          <BookOpen size={16} />
        </button>
      </div>

      {/* Part of Speech & Definition */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <span className="mr-2 text-sm font-semibold text-gray-600">noun</span>
          <div className="h-px flex-grow bg-gray-200"></div>
        </div>
        <p className="text-gray-700">A single distinct meaningful element of speech or writing.</p>
      </div>

      {/* Synonyms Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Synonyms</h3>
        <div className="flex flex-wrap gap-2">
          {['term', 'expression', 'lexeme', 'vocable'].map((syn) => (
            <span 
              key={syn} 
              className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
            >
              {syn}
            </span>
          ))}
        </div>
      </div>

      {/* Antonyms Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Antonyms</h3>
        <div className="flex flex-wrap gap-2">
          {['silence', 'quiet', 'stillness'].map((ant) => (
            <span 
              key={ant} 
              className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs"
            >
              {ant}
            </span>
          ))}
        </div>
      </div>

      {/* Context Usage */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Context Usage</h3>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-gray-600 italic">
            "Every <span className="font-bold text-gray-800">{word}</span> has its place in the intricate tapestry of language."
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordPopup;