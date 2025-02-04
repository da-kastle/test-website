// Import the Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase Configuration (replace with your actual Firebase project details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle user login
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login successful!");
            showSurvey();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// Handle user registration
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Registration successful! Please log in.");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// Display the survey section after login
function showSurvey() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("surveySection").style.display = "block";
}

// Submit the survey and save responses to Firestore
function submitSurvey() {
    const user = auth.currentUser;

    if (!user) {
        alert("Please log in first.");
        return;
    }

    const lazy = document.querySelector('input[name="lazy"]:checked');
    const thorough = document.querySelector('input[name="thorough"]:checked');

    if (!lazy || !thorough) {
        alert("Please answer all questions.");
        return;
    }

    const response = {
        userId: user.uid,
        email: user.email,
        lazy: lazy.value,
        thorough: thorough.value,
        timestamp: new Date().toISOString()
    };

    addDoc(collection(db, "surveyResponses"), response)
        .then(() => {
            alert("Response recorded successfully!");
            document.getElementById("results").innerHTML = `
                <p>Survey submitted! Your responses:</p>
                <p>I am lazy: ${lazy.value}</p>
                <p>I am thorough: ${thorough.value}</p>
            `;
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        showSurvey();
    }
});
