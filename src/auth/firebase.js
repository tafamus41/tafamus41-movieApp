import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCbXt2IYV4rxlPu-4OzOUfkN29hWvctXlk",
    authDomain: "sosa-movie-app.firebaseapp.com",
    projectId: "sosa-movie-app",
    storageBucket: "sosa-movie-app.appspot.com",
    messagingSenderId: "685253141717",
    appId: "1:685253141717:web:b817a01df7b0967a812e5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
