import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import fs from 'fs';
import csvParser from 'csv-parser';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCUtwxk7WTWLSYuxoI_TwTF53vlNMlcSI",
    authDomain: "vocabulary-extension.firebaseapp.com",
    projectId: "vocabulary-extension",
    storageBucket: "vocabulary-extension.appspot.com",
    messagingSenderId: "757120853126",
    appId: "1:757120853126:web:50c768b8f4e272b5b25d07",
    measurementId: "G-93SKFPN280",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);



export const getAllWordsFromRealtimeDatabase = async () => {
    try {
        const wordsRef = ref(db, 'words');
        const snapshot = await get(wordsRef);
        const data = snapshot.val();
        if (data) {
            const words = Object.entries(data).map(([key, value]) => ({
                value,
            }));
            return shuffleArray(words);
        } else {
            console.log("No words found");
            return [];
        }
    } catch (error) {
        console.error("Error fetching words:", error);
        throw error;
    }
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array.slice(100);
};
