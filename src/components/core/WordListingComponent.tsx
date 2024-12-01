import { useState } from "react";
export const WordListingComponent=()=>{


    const [words, setWords] = useState([
        'Serendipity', 'Eloquent', 'Resilience', 
        'Ephemeral', 'Quintessential', 'Melancholy'
      ]);
      const [newWord, setNewWord] = useState('');
    
      
      
    

    return (
        <div className="container mx-auto p-6 max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Words</h1>
          
          {/* Add Word Input */}
          <div className="flex mb-4">
            <input 
              type="text" 
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="Search a word"
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
           
          </div>
    
          {/* Word Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {words.map((word, index) => (
              <div 
                key={word} 
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-shadow"
              >
                <span className="text-lg font-medium text-gray-800">{word}</span>
              </div>
            ))}
          </div>
        </div>
      );
    };
