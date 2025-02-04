// Import the Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPpkBsAqXHmLjy2SQ9ccxmPRjx1ekI8vc",
  authDomain: "test-project-1-c42ee.firebaseapp.com",
  projectId: "test-project-1-c42ee",
  storageBucket: "test-project-1-c42ee.firebasestorage.app",
  messagingSenderId: "935167234229",
  appId: "1:935167234229:web:1c4d8c9c93bc409379aefc",
  measurementId: "G-571V19Z2XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login function
window.login = function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Login successful!");
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("surveySection").style.display = "block";
        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
};

// Register function
window.register = function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Registration successful! Please log in.");
        })
        .catch((error) => {
            alert("Registration failed: " + error.message);
        });
};

// Submit Survey function
window.submitSurvey = function submitSurvey() {
    const lazy = document.querySelector('input[name="lazy"]:checked');
    const thorough = document.querySelector('input[name="thorough"]:checked');

    if (!lazy || !thorough) {
        alert("Please answer all the questions before submitting.");
        return;
    }

    const response = {
        lazy: lazy.value,
        thorough: thorough.value,
        timestamp: new Date().toISOString(),
    };

    const db = firebase.firestore();
    db.collection("surveyResponses").add(response)
        .then(() => {
            alert("Survey submitted successfully!");
            document.getElementById("results").innerHTML = `
                <p>Thank you for your submission!</p>
                <p>You rated "I am lazy" as: <strong>${lazy.value}</strong></p>
                <p>You rated "I am thorough" as: <strong>${thorough.value}</strong></p>
            `;
        })
        .catch((error) => {
            console.error("Error submitting survey: ", error);
        });
};
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
