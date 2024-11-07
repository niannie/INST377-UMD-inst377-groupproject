//import UserCreation from './userCreation.js';
const UserCreation = require('./userCreation.js');

class UserDatabase {
    constructor() {
        this.database = {};
    }

    addUserToDatabase(user) {
        // Check if user ID or user email are unique
        if (user.userID in this.database) {
            throw new Error('User ID already exists'); // Throw an error if the user ID is not unique
        }
        else if (Object.values(this.database).some(u => u.email === user.email)) {
            throw new Error('User email already exists')  // Throw an error if the user email is not unique
        }

        // If user ID and user email is unique, add the user to the database
        this.database[user.userID] = {
            'email': user.email,
            'password': user.password,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'age': user.age,
            'height': user.height,
            'weight': user.weight
        };
    }
}
export default UserDatabase; 