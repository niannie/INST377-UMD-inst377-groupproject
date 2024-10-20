// __tests__/userCreation.test.js
import UserCreation from '../src/Javascripts/userCreation.js';

describe('UserCreation', () => {
    test('should create a user with the provided properties', () => {
        const user = new UserCreation(1, 'test@example.com', 'password123', 'John', 'Doe', 25, 180, 75);
        
        expect(user.userID).toBe(1);
        expect(user.email).toBe('test@example.com');
        expect(user.password).toBe('password123');
        expect(user.firstName).toBe('John');
        expect(user.lastName).toBe('Doe');
        expect(user.age).toBe(25);
        expect(user.height).toBe(180);
        expect(user.weight).toBe(75);
    });
});