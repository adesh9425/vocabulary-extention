import React, { useEffect, useState } from "react";
import WordCardComponent from "../core/WordCardComponent";
import { getAllWordsFromRealtimeDatabase } from "../utils/FireBaseHandler";
import { ArrowRightIcon } from "lucide-react";
import WordPopupComponent from "../core/WordPopUpComponent";

export const Cards = () => {
    const [words, setWords] = useState<string[]>([]);
    const [pointer, setPointer] = useState<number>(0);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [selectedWord, setSelectedWord] = useState<string>("");

    // Function to handle pointer changes
    const handlePointerChange = () => {
        if (words.length > 1) {
            let number;
            do {
                number = Math.floor(Math.random() * words.length);
            } while (number === pointer); // Avoid selecting the same word
            setPointer(number);
        }
    };

    // Fetch words from the database
    useEffect(() => {
        const fetchWords = async () => {
            try {
                const wordsList = await getAllWordsFromRealtimeDatabase();
                const listOfWords = wordsList.map((word: { value: string }) => word.value);
                setWords(listOfWords);
            } catch (error) {
                console.error("Error in getAllWordsFromRealtimeDatabase:", error);
            }
        };
        fetchWords();
    }, []);

    // Handle card click to show the popup
    const handleCardClick = (word: string) => {
        setSelectedWord(word);
        setIsPopupVisible(true);
    };

    // Close the popup
    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    return (
        <>
            <div>
                <button
                    className="flex items-center justify-between gap-4 btn btn-primary bg-blue-400 hover:bg-blue-500 float-end px-5 py-3 rounded-full shadow-2xl"
                    onClick={handlePointerChange}
                    disabled={words.length <= 1}
                >
                    <span>Next</span>
                    <ArrowRightIcon size={16} />
                </button>
            </div>
            <div className=" p-20 mx-10 my-10 float-right">
                {words.length > 0 ? (
                    <WordCardComponent
                        word={words[pointer]}
                        onClick={() => handleCardClick(words[pointer])} // Trigger click to show popup
                    />
                ) : (
                    <WordCardComponent
                        word="No words found"
                        onClick={() => handleCardClick("No words found")}
                    />
                )}
            </div>

            {/* Word Popup */}
            {isPopupVisible && selectedWord && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-800">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transition-opacity duration-300 ease-in-out opacity-100">
                        <WordPopupComponent word={selectedWord} />
                        <button
                            className="mt-4 btn btn-danger bg-red-400 hover:bg-red-500 px-4 py-2 rounded-full"
                            onClick={handlePopupClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
