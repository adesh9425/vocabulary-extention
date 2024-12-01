export const merriamParser = (entries) => {
    if (!Array.isArray(entries)) return []; // Ensure entries is an array.

    return entries.map((entry) => {
        const {
            meta: { id } = {}, // Fallback to an empty object.
            hwi: { hw, prs } = {}, // Fallback to an empty object.
            fl = "Unknown", // Fallback for part of speech.
            shortdef = [], // Fallback to an empty array for definitions.
            quotes = [], // Fallback to an empty array for quotes.
        } = entry || {};

        // Extract pronunciation if available.
        const pronunciation = prs?.[0]?.mw || "N/A";

        // Extract quotes safely.
        const quoteDetails = quotes.map((q) => q.t || "No quote available");

        return {
            word: id || "Unknown",
            headword: hw || "Unknown",
            partOfSpeech: fl,
            pronunciation,
            shortDefinitions: shortdef,
            quotes: quoteDetails,
        };
    });
};



export const extractSynsAndAnts = (entries) => {
    // Ensure entries is an array.
    if (!Array.isArray(entries)) return { synonyms: [], antonyms: [] };

    return entries.reduce(
        (acc, entry) => {
            // Extract syns and ants safely with fallbacks.
            const synonyms = entry.meta?.syns?.flat() || [];
            const antonyms = entry.meta?.ants?.flat() || [];

            // Append them to the accumulated result.
            acc.synonyms.push(...synonyms);
            acc.antonyms.push(...antonyms);

            return acc;
        },
        { synonyms: [], antonyms: [] } // Initial accumulator structure.
    );
};




