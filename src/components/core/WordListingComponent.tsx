import { useEffect, useState, useRef } from "react";
import { getAllWordsFromRealtimeDatabase } from "../utils/FireBaseHandler";
import WordPopupComponent from "./WordPopUpComponent";

export const WordListingComponent = () => {
    const [words, setWords] = useState<string[]>([]);
    const [newWord, setNewWord] = useState("");
    const [hoveredWord, setHoveredWord] = useState<string | null>(null);
    const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
    const popupTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const allWords = await getAllWordsFromRealtimeDatabase();
                const words = allWords.map((wordObj: { value: string }) => wordObj.value);
                setWords(words);
            } catch (error) {
                console.error("Error fetching words:", error);
            }
        };

        fetchWords();
    }, []);

    const handleMouseEnter = (word: string, event: React.MouseEvent) => {
        if (popupTimeout.current) {
            clearTimeout(popupTimeout.current);
        }
        setHoveredWord(word);
        const rect = event.currentTarget.getBoundingClientRect();
        setPopupPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    };

    const handleMouseLeave = () => {
        popupTimeout.current = setTimeout(() => {
            setHoveredWord(null);
            setPopupPosition(null);
        }, 200); // 200ms delay
    };

    const handlePopupEnter = () => {
        if (popupTimeout.current) {
            clearTimeout(popupTimeout.current);
        }
    };

    const handlePopupLeave = () => {
        popupTimeout.current = setTimeout(() => {
            setHoveredWord(null);
            setPopupPosition(null);
        }, 200); // 200ms delay
    };

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
                {words.map((word: string) => (
                    <div
                        key={word}
                        className="relative bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-shadow"
                        onMouseEnter={(e) => handleMouseEnter(word, e)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="text-lg font-medium text-gray-800">{word}</span>
                    </div>
                ))}
            </div>

            {/* Popup */}
            {hoveredWord && popupPosition && (
                <div
                    className="absolute bg-white shadow-lg rounded-lg p-4 border border-gray-200"
                    style={{
                        top: `${popupPosition.top}px`,
                        left: `${popupPosition.left}px`,
                        zIndex: 10,
                    }}
                    onMouseEnter={handlePopupEnter}
                    onMouseLeave={handlePopupLeave}
                >
                    <WordPopupComponent word={hoveredWord} />
                </div>
            )}
        </div>
    );
};
