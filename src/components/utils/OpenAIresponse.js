import axios from "axios";

// Replace with your actual OpenAI API key
const OPENAI_API_KEY = "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";

// Function to fetch article based on words
export const generateArticle = async (words) => {
    try {
        const prompt = `Write a detailed article using the following words: ${words.join(", ")}. The article should include a natural and informative use of all these words in context.`;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",  // Updated endpoint
            {
                model: "gpt-3.5-turbo",  // Using GPT-4 model
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 500,
                temperature: 0.7, // Adjust the creativity of the model
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.choices[0].message.content.trim(); // Extract generated article
    } catch (error) {
        console.error("Error generating article:", error);
        throw error;
    }
};
