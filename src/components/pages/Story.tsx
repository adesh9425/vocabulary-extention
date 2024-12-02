import StoryCard from "../core/StoryCard";
import { useEffect, useState } from "react";

import { getAllWordsFromRealtimeDatabase } from "../utils/FireBaseHandler";
import { generateStory } from "../utils/OpenAIresponse";

export const Story = () => {
    const [storyArticles, setStoryArticles] = useState("");
    const [words, setWords] = useState<string[]>([]);

    // Fetch words from Firebase
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
    }, []); // Empty dependency array ensures this runs only once

    // Fetch story from OpenAI
    useEffect(() => {
        const fetchStory = async () => {
            if (words.length === 0) return; // Ensure words are available before calling the API
            try {
                const response = await generateStory(words);
                setStoryArticles(response);
            } catch (error) {
                console.log("Couldn't fetch from OpenAI", error);
            }
        };
        fetchStory();
    }, [words]); // Run this effect only when `words` changes

    return (
        <>
            <StoryCard story={storyArticles} />
        </>
    );
};
