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

            // Set cell values or placeholders
            // Uses the ?? (nullish coalescing operator) operator to ensure values default correctly to 'No information available' only when they are null or undefined.
            // This allows for the display of values that are 0
            foodName.innerHTML = product.product_name ?? 'No information available';

            // Round the returned values to one decimal place if they exist
            const getRoundedValue = (value) => value ? parseFloat(value).toFixed(1) : 'No information available';
            
            calories.innerHTML = product.nutriments ? getRoundedValue(product.nutriments["energy-kcal"]) : 'No information available';
            fat.innerHTML = product.nutriments?.fat ? getRoundedValue(product.nutriments.fat) : 'No information available';
            protein.innerHTML = product.nutriments?.proteins ? getRoundedValue(product.nutriments.proteins) : 'No information available';
            carbohydrates.innerHTML = product.nutriments?.carbohydrates ? getRoundedValue(product.nutriments.carbohydrates) : 'No information available';

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

// Import Firebase modules globally
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjffc4HUjtmPLMNs3ZzacNrQZ4Sy_UsLc",
    authDomain: "inst377-final-project-f3de6.firebaseapp.com",
    projectId: "inst377-final-project-f3de6",
    storageBucket: "inst377-final-project-f3de6.firebasestorage.app",
    messagingSenderId: "606452978860",
    appId: "1:606452978860:web:3215f12b8d554c751fbb09",
    measurementId: "G-RGBB5HX6RM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
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
        // Confirm Success
        console.log("User login successful:", user);
        window.location.href = "/userProfile.html";  // Redirect to profile page
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
        window.location.href = "/index.html";  // Redirect after sign out
      }).catch((error) => {
        // An error happened.
        console.error("Error signing out user", error.message)
      });
}


// Function to load user profile
function loadUserProfile(user) {
    // Ensure user is defined before attempting to access properties
    if (!user) {
        console.error("No user data available for profile.");
        return; // Exit if there's no user
    }

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
            console.error("No such document!");
            alert("Error fetching user details.");
        }
        })
        .catch((error) => {
        console.error("Error fetching user document:", error.message);
        });
}

// Function for faq page
function initializeFAQToggle() {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
        question.addEventListener("click", () => {
            question.classList.toggle("active");

            const answer = question.nextElementSibling;

            // Toggle visibility using the class
            answer.classList.toggle("visible");
        });
    });
}

// Function for join page
function initializeChart() {
    const ctx = document.getElementById('userCountChart')
            const months = {
                labels: ["August", "September", "October", "November", "December"],
                datasets: [{
                    label: "User Count Since August",
                    weight: "bold",
                    data: [100, 264, 340, 578, 767],
                    borderColor: "blue",
                    backgroundColor: "lightblue",
                    borderWidth: 2
                }]
            };
            new Chart(ctx, {
                type: "line",
                data: months,
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 16,
                                    weight: "bold",
                                    color: "black"
                                }
                            }
                        }
                    }
                }
            });
}

async function initializeSlider() {
    try {
        const { tns } = await import("tiny-slider");

        const slider = tns({
            container: '.my-slider',
            items: 1, // Show 1 image at a time
            slideBy: 'page',
            autoplay: true, // Enable autoplay
            autoplayTimeout: 3000, // Set the delay for the autoplay
            autoplayHoverPause: false, // Disable pause on hover
            controls: false, // Remove navigation controls
            nav: false, // Remove navigation dots
            loop: true, // Enable infinite loop
            speed: 400, // Set transition speed
        });
    } catch (error) {
        console.error("Error loading tiny-slider:", error);
    }
}

window.onload = async function () {
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
        const script = document.createElement('script');
        if (signupForm) {
            signupForm.addEventListener("submit", userCreation);
        }
        
        script.src = "https://cdn.jsdelivr.net/npm/chart.js";
        script.onload = initializeChart;
        document.body.appendChild(script);
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
        // Listen to the user's authentication state
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in, load the user profile
                console.log("User is logged in:", user);
                loadUserProfile(user);  // Pass the user object to load the profile
            } else {
                // No user is logged in
                console.log("No user logged in.");
                window.location.href = "/index.html";  // Redirect to login if not logged in
            }
        });

        const signOutButton = document.getElementById("signoutButton");
        if (signOutButton) {
            signOutButton.addEventListener("click", userSignout)
        }
    }

    // Check if the page is the About page
    if (document.body.classList.contains('about-page')) {
        try {
            await initializeSlider();
        } catch (error) {
            console.error("Error loading tiny-slider:", error);
        }
    }

    // Check if the page is the Help page
    if (document.body.classList.contains("help-page")) {
        initializeFAQToggle();
    }
};