import StoryCard from "../core/StoryCard"
import {useEffect, useState} from "react";
import {generateArticle} from "../utils/OpenAIresponse";
import {getAllWordsFromRealtimeDatabase} from "../utils/FireBaseHandler";

export const Story=()=>{
    const [storyArticles,setStoryArticles] = useState("");
    const [words, setWords] = useState<string[]>([]);
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

    useEffect(()=>{
        const fetchStory=async ()=>{
            try {
                let response = await generateArticle(words);
                setStoryArticles(response);
            }
            catch (error) {
                console.log("Couldn't fetch from openAI", error);
            }
        }
        fetchStory();
    })
    return (
        <>
        <StoryCard story={storyArticles} />
        </>
    )
}