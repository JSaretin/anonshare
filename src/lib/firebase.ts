import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCCRFbd7Vhf0_7C9i5YkSynQz46qPCTvsE",
    authDomain: "anoshare-87aee.firebaseapp.com",
    projectId: "anoshare-87aee",
    storageBucket: "anoshare-87aee.appspot.com",
    messagingSenderId: 387702795271,
    appId: "1:387702795271:web:3ff5f140e324c93f558ea2",
    measurementId: "G-G9CQPKL3T",
};
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)