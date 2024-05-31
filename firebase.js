import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8mDIQwrzdBA2cVU1lX95C2VAeOCU6muM",
    authDomain: "hackathone-3cd56.firebaseapp.com",
    projectId: "hackathone-3cd56",
    storageBucket: "hackathone-3cd56.appspot.com",
    messagingSenderId: "962176382131",
    appId: "1:962176382131:web:36cc05747eb718c6fe6cc6",
    measurementId: "G-K33GP5JN19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    let bookNowBtns = document.getElementsByClassName('book-now-btn');
    let locations = document.getElementsByClassName('location');
    let prices = document.getElementsByClassName('price');
    
    console.log(bookNowBtns, locations, prices);

    // Convert HTMLCollection to an array
    bookNowBtns = Array.from(bookNowBtns);

    bookNowBtns.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            try {
                const location = locations[index]?.textContent;
                const price = prices[index]?.textContent;
                
                const docRef = await addDoc(collection(db, "bookings"), {
                    location: location,
                    price: price,
                    bookedAt: new Date()
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        });
    });
});
