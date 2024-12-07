# Developer Manual

## How to Install the Application and All Dependencies
1. Clone this repository to your local machine using:
2. Navigate to the project directory:
3. Install all dependencies:

## How to Run the Application on a Server
1. Make sure Firebase CLI is installed. If not, install it globally:
2. Login to Firebase:
3. Serve the application locally:
4. Open the application at `http://localhost:5000`.

## How to Run Tests
No tests have been implemented yet.

## API Endpoints for the Server
- **GET** `/nutrition`: Retrieves nutritional information from the external API.
- **POST** `/user`: Adds a new user to the database.
- **PATCH** `/user/:id`: Updates user information.
- **DELETE** `/user/:id`: Deletes a user from the database.

## Known Bugs and Future Development Roadmap
### Known Bugs
- Possible responsive design issues on larger screens.
  
### Future Development
- Add user authentication for better security.
- Implement charts for tracking progress.
