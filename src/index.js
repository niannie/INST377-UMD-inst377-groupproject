import './styles.css'; // Importing styling

// Load header and navigation buttons
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        // Insert the fetched header HTML into the header section
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error)); // Error handling

// Load footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error)); // Error handling

async function loadNutrition(foodItem){
    const encodedFoodItem = encodeURIComponent(foodItem);
    const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodedFoodItem}&action=process&json=true`);
    const data = await res.json();
    return data
}

async function fetchNutrition() {
    // Get the food item from the input box
    const foodItem = document.getElementById("foodInput").value;

    // Show loading message
    document.getElementById("nutritionInfo").innerHTML = `<p>Loading...</p>`;

    try { 
        // Load Nutrition Data
        const products = await loadNutrition(foodItem);

        // Define and set up the table
        const nutritionInfoTable = document.getElementById('nutritionInfo');
        // Set up table columns
        nutritionInfoTable.innerHTML = '<tr><th>Food</th><th>Calories</th><th>Fat</th><th>Protein</th><th>Carbohydrates</th></tr>';

        // Loop through products and create rows for each
        products.products.forEach(product => {
            console.log(product);
            const tableRow = document.createElement('tr');
            const foodName = document.createElement('td');
            const calories = document.createElement('td');
            const fat = document.createElement('td');
            const protein = document.createElement('td');
            const carbohydrates = document.createElement('td');

            //TODO: change the returned values to only be up to 1 or 2 decimal points
            
            // Set cell values or placeholders
            // Uses the ?? (nullish coalescing operator) operator to ensure values default correctly to 'No information available' only when they are null or undefined.
            // This allows for the display of values that are 0
            foodName.innerHTML = product.product_name ?? 'No information available';
            //FIXME: is returning 'undefined', when it should be 'no information available'
            calories.innerHTML = product.nutriments ? product.nutriments["energy-kcal"] 
                // The issue was that dot notation could not be used since there is a hyphen between "energy-kcal," so access it through bracket notation instead
                : 'No information available';
            fat.innerHTML = product.nutriments?.fat ?? 'No information available';
            protein.innerHTML = product.nutriments?.proteins ?? 'No information available';
            carbohydrates.innerHTML = product.nutriments?.carbohydrates ?? 'No information available';


            // Append data to the row
            tableRow.appendChild(foodName);
            tableRow.appendChild(calories);
            tableRow.appendChild(fat);
            tableRow.appendChild(protein);
            tableRow.appendChild(carbohydrates);

            // Append row to table
            nutritionInfoTable.appendChild(tableRow);
        });
    } catch (error) {
        // Show error message if there's an issue
        document.getElementById("nutritionInfo").innerHTML = `<p>Error fetching data</p>`;
        console.error("Error:", error);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.toggle("active");
}

// Imports from Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfsevWRhWLFsyRy-5WknOBPWGlkZMo0Lo",
  authDomain: "snack-track-7f768.firebaseapp.com",
  projectId: "snack-track-7f768",
  storageBucket: "snack-track-7f768.firebasestorage.app",
  messagingSenderId: "560371500579",
  appId: "1:560371500579:web:36697c5426813161505396",
  measurementId: "G-WG25VD42FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth();

// Initialize Firestore Database
const db = getFirestore();

// Handle User Sign-Up
function userCreation(event) {
    event.preventDefault();

    // Get form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;

    // Firebase Sign-Up
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;

            // Save additional user info to Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                age,
                height,
                weight,
            });

            // Confirm Success
            console.log("User created successfully:", user);
            alert("Account created! Welcome to SnackTrack.");
        })
        .catch((error) => {
            console.error("Error signing up:", error.message);
            alert(error.message);
        });
}

function userLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //Firebase login
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...

        // Confirm Success
        console.log("User login successful:", user);
        alert("Welcome back to SnackTrack.");
    })
    .catch((error) => {
        console.error("Error with user login:", error.message);
        alert(error.message);
    });
}

function userSignout() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
        alert("Hope to see you again soon!");
      }).catch((error) => {
        // An error happened.
        console.error("Error signing out user", error.message)
      });
}

window.onload = function () {
    // Check if the page is the homepage
    if (document.body.classList.contains("homepage")) {
        const searchButton = document.getElementById("searchButton");
        if (searchButton) {
            searchButton.addEventListener("click", fetchNutrition);
        }
    }

    // Check if the page is the join page
    if (document.body.classList.contains("join-page")) {
        const signupForm = document.getElementById("sign-up");
        if (signupForm) {
            signupForm.addEventListener("submit", userCreation);
        }
    }

    // Check if the page is the login page
    if (document.body.classList.contains("login-page")) {
        const loginForm = document.getElementById("login");
        if (loginForm) {
            loginForm.addEventListener("submit", userLogin);
        }
    }

    // Check if the page is the user profile page
    if (document.body.classList.contains("userProfile-page")) {
        loadUserProfile();
    }

    /*// Check if the page is the userProfile page
    if (document.body.classList.contains("userProfile-page")) {
        // Add logic for sign-out or profile actions
        const signoutButton = document.getElementById("signoutButton");
        if (signoutButton) {
            signoutButton.addEventListener("click", userSignout);
        }
    }*/
};

function loadUserProfile() {
    const user = auth.currentUser;

    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();

                    document.getElementById("userName").textContent = `${userData.firstName}`;
                    document.getElementById("userFullName").textContent = `${userData.firstName} ${userData.lastName}`;
                    document.getElementById("userEmail").textContent = user.email;
                    document.getElementById("userAge").textContent = userData.age || "No data";
                    document.getElementById("userHeight").textContent = userData.height || "No data";
                    document.getElementById("userWeight").textContent = userData.weight || "No data";
                } else {
                    alert("Error fetching user details.");
                }
            })
            .catch((error) => {
                console.error("Error fetching user document:", error.message);
            });
    } else {
        alert("Please log in to view your profile.");
        window.location.href = "login.html";
    }
}