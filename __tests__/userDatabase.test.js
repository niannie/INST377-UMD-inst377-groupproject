// __tests__/userDatabase.test.js
import UserCreation from '../src/userCreation.js';
import UserDatabase from '../src/userDatabase.js';

describe('UserDatabase', () => {

    test('should add multiple users to the database', () =>{
        let userDatabase = new UserDatabase();
        const user1 = new UserCreation(1, 'test@example.com', 'password123', 'John', 'Doe', 25, 180, 75);
        const user2 = new UserCreation(2, 'test2@example.com', 'password456', 'Jane', 'Doe', 30, 170, 65);
        

        userDatabase.addUserToDatabase(user1);
        userDatabase.addUserToDatabase(user2);
        expect(userDatabase.database[1]).toBeDefined();
        expect(userDatabase.database[2]).toBeDefined();

    });

    test('should throw an error when adding a user with an existing user ID', () => {
        let userDatabase = new UserDatabase();

        const user1 = new UserCreation(1, 'test1@example.com', 'password123', 'John', 'Doe', 25, 180, 75);
        const user2 = new UserCreation(1, 'test2@example.com', 'password456', 'Jane', 'Doe', 30, 170, 65);
        
        userDatabase.addUserToDatabase(user1);
        
        expect(() => userDatabase.addUserToDatabase(user2)).toThrow('User ID already exists');
    });

    test('should throw an error when adding a user with an existing email', () => {
        let userDatabase = new UserDatabase();

        const user1 = new UserCreation(1, 'test@example.com', 'password123', 'John', 'Doe', 25, 180, 75);
        const user2 = new UserCreation(2, 'test@example.com', 'password456', 'Jane', 'Doe', 30, 170, 65);
        
        userDatabase.addUserToDatabase(user1);
        
        expect(() => userDatabase.addUserToDatabase(user2)).toThrow('User email already exists');
    });
});
