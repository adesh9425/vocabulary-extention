import React from "react";

interface WordCardProps {
    word: string;
    onClick: () => void; // Triggered on card click
}

export default function WordCardComponent({ word, onClick }: WordCardProps) {
    return (
        <div
            className="flex items-center justify-center w-[50vw] h-[50vh] bg-white rounded-2xl p-8 border border-gray-300 shadow-xl cursor-pointer"
            onClick={onClick} // Triggered when the card is clicked
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">{word}</h1>
            </div>
        </div>
    );
}
