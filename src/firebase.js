import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDANn5qstLGpeXcxrRkYbqP42fFnvEvMFY",
    authDomain: "find-em-c35ef.firebaseapp.com",
    projectId: "find-em-c35ef",
    storageBucket: "find-em-c35ef.appspot.com",
    messagingSenderId: "126947846609",
    appId: "1:126947846609:web:7b0bc36492e3a8e0abd8f0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;