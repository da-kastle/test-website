// Firebase configuration (Replace with your actual Firebase project details)
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
firebase.initializeApp(firebaseConfig);

// Reference Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Login function
window.login = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
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
window.register = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Registration successful! Please log in.");
        })
        .catch((error) => {
            alert("Registration failed: " + error.message);
        });
};

// Submit Survey function
window.submitSurvey = function () {
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

