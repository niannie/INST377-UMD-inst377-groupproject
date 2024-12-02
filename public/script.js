// Load header and navigation buttons
fetch('/header.html')
    .then(response => response.text())
    .then(data => {
        // Insert the fetched header HTML into the header section
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error)); // Error handling

// Load footer
fetch('/footer.html')
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

