// Load header and navigation buttons
fetch('../Assets/header.html')
    .then(response => response.text())
    .then(data => {
        // Insert the fetched header HTML into the header section
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error)); // Error handling

// Load footer
fetch('../Assets/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error)); // Error handling

function userCreation(event) {
    event.preventDefault();

    // our logic

    console.log("Form submitted but prevented default behavior");
}
<<<<<<< HEAD

function fetchNutrition() {
    // Get the food item from the input box
    const foodItem = document.getElementById("foodInput").value;

    // Show loading message
    document.getElementById("nutritionInfo").innerHTML = `<p>Loading...</p>`;

    fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${foodItem}&action=process&json=true`)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            if (products && products.length > 0) {
                const info = products[0]; // Get the first product
                document.getElementById("nutritionInfo").innerHTML = `
                    <p><strong>Food:</strong> ${info.product_name}</p>
                    <p><strong>Calories:</strong> ${info.nutriments?.energy_kcal} kcal</p>
                    <p><strong>Fat:</strong> ${info.nutriments?.fat} g</p>
                    <p><strong>Protein:</strong> ${info.nutriments?.proteins} g</p>
                    <p><strong>Carbohydrates:</strong> ${info.nutriments?.carbohydrates} g</p>
                `;
            } else {
                document.getElementById("nutritionInfo").innerHTML = `<p>No information found for "${foodItem}"</p>`;
            }
        })
        .catch(error => {
            document.getElementById("nutritionInfo").innerHTML = `<p>Error fetching data</p>`;
            console.error("Error:", error);
        });
}
=======
function userValidate(event){
    event.preventDefault();

    // our logic
}
>>>>>>> 3039d3d2e0e32ee418651c455f21a5b83f1677c8
