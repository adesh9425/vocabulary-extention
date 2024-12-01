import React, { useEffect, useState } from 'react';
import { BookOpen, Share2, Star, BookmarkPlus } from 'lucide-react';
import {extractSynsAndAnts, merriamParser} from "../utils/MerriamParser";


const WordPopupComponent = ({ word }) => {
  const[currentWord, setCurrentWord] = useState(word);
  const [meaningfulInfo, setMeaningfulInfo] = useState(null);
  const [synsAndAnts, setSynsAndAnts] = useState(null);

  useEffect(() => {
    if (word) {
      fetchWordData().then((data) => setMeaningfulInfo(data));
      fetchSynsAndAnts().then((data) => setSynsAndAnts(data));
    }
  }, [currentWord]);

  const handleClick = (wordToSet) => {
    console.log("Clicked:", wordToSet);
    setCurrentWord(wordToSet);
     console.log("Clicked:", currentWord);
  }


  const fetchSynsAndAnts = async () => {
    try {
      const response = await fetch(
          `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${currentWord}?key=97129730-c5ce-4afc-bb35-0efce3d6838a`
      );
      if (response.status === 200) {
        const data = await response.json();
        const parsedData = extractSynsAndAnts(data);
        console.log(parsedData); // Debugging output
        return parsedData;
      } else {
        console.error('Error fetching word data');
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };


  const fetchWordData = async () => {
    try {
      const response = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${currentWord}?key=024eb78c-fe39-4ff8-8148-5ffbb5b3226f`
      );
      if (response.status === 200) {
        const data = await response.json();
        const parsedData = merriamParser(data)[0];
        console.log(parsedData);
        return parsedData;
      } else {
        console.error('Error fetching word data');
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };

  return (
    <div className="ml-100 w-96 bg-white shadow-xl rounded-lg p-6 max-h-[500px] overflow-y-auto">
      {/* Word Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{meaningfulInfo?.word || 'Loading...'}</h2>
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
      {meaningfulInfo?.pronunciation && (
        <div className="mb-4">
          <span className="text-gray-600 italic">{meaningfulInfo.pronunciation}</span>
          <button className="ml-2 text-blue-500">
            <BookOpen size={16} />
          </button>
        </div>
      )}

      {/* Part of Speech & Definition */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <span className="mr-2 text-sm font-semibold text-gray-600">{meaningfulInfo?.partOfSpeech || 'N/A'}</span>
          <div className="h-px flex-grow bg-gray-200"></div>
        </div>
        {(meaningfulInfo?.shortDefinitions || []).map((definition, index) => (
          <li key={index} className="mt-1 text-gray-700">
            {definition}
          </li>
        ))}
      </div>

      {/* Synonyms Section */}
      {synsAndAnts?.synonyms?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Synonyms</h3>
          <div className="flex flex-wrap gap-2">
            {(synsAndAnts.synonyms || []).map((syn,index) => (
              <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs hover:bg-blue-100 focus:outline-none"
                    onClick={()=>handleClick(syn)} role="button">
                {syn}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Antonyms Section */}
      {synsAndAnts?.antonyms?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Antonyms</h3>
          <div className="flex flex-wrap gap-2">
            {(synsAndAnts.antonyms || []).map((ant,index) => (
              <span key={index} className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs hover:bg-blue-100 focus:outline-none"
              onClick={()=>handleClick(ant)} role={"button"}>
                {ant}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Context Usage */}
      {meaningfulInfo?.quotes?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Context Usage</h3>
          <div className="bg-gray-50 p-3 rounded-md">
            {(meaningfulInfo.quotes || []).map((quote, index) => (
              <p key={index} className="text-gray-600 italic mb-2">
                "{quote}"
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordPopupComponent;
