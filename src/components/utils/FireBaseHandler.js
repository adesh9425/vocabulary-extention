// Import required Firebase functions
import {initializeApp} from "firebase/app";
import {getDatabase, onValue, push, ref, set} from "firebase/database";
import {  get, child } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCNMlcSI",
    authDomain: "vocan.firebaseapp.com",
    projectId: "vocabuxtension",
    storageBucket: "vocabul.appspot.com",
    messagingSenderId: "757120853126",
    appId: "1:757120853126:web:",
    measurementId: "G-",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);



export const addWordToRealtimeDatabase = async (wordData) => {
    try {
        const wordsRef = ref(db, 'words'); // Reference to "words" node
        const wordKey = wordData; // Use the word as the unique key

        // Check if the word already exists
        const existingWordSnapshot = await get(child(wordsRef, wordKey));
        if (existingWordSnapshot.exists()) {
            console.log("Word already exists:", wordKey);
            return;
        }

        // Save the word data with the word as the key
        await set(child(wordsRef, wordKey), wordData);
        console.log("Word added with ID:", wordKey);
    } catch (error) {
        console.error("Error adding word:", error);
    }
};



// Get all words from Firestore
// Get all words from Realtime Database
export const getAllWordsFromRealtimeDatabase = () => {
    return new Promise((resolve, reject) => {
        const wordsRef = ref(db, 'words');
        onValue(wordsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const words = Object.entries(data).map(([key, value]) => ({
                    value
                }));
                resolve(words);
            } else {
                console.log("No words found");
                resolve([]);
            }
        }, (error) => {
            reject(error);
        });
    });
};
