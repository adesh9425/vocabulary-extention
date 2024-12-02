
const COHORE_API_KEY=" Bearer 6cNjDfgROZFRHK9KzCpqDfvJQnZWmrmTuyhbxEZ3"



export const generateStory = async (words) => {
    const response = await fetch('https://api.cohere.ai/generate', {
        method: 'POST',
        headers: {
            'Authorization': COHORE_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'command-r-08-2024',
            prompt: `Write a technical article with tough vocabulary of high frequency it should have good genre and must have very coherent and contextual use of the provided words using these words: ${words.join(', ')}.`,
            max_tokens: 500,
        }),
    });

    const data = await response.json();
    return data.text;
};


