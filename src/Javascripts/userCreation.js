class UserCreation {
    //TODO: call this in script when creating a new user
    constructor(userID, email, password, firstName, lastName, age, height, weight) {
        this.userID = userID;   // Using the setter for userID
        this.email = email;     // Using the setter for email
        this.password = password; // Using the setter for password
        this.firstName = firstName; // Using the setter for firstName
        this.lastName = lastName; // Using the setter for lastName
        this.age = age;         // Using the setter for age
        this.height = height;   // Using the setter for height
        this.weight = weight;    // Using the setter for weight
    }


    // Getters
    get userID() {
        return this._userID;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get age() {
        return this._age;
    }
    get height() {
        return this._height;
    }
    get weight() {
        return this._weight;
    }

    // Setters
    set userID(newID) {
        this._userID = newID;
    }
    set email(newEmail) {
        this._email = newEmail;
    }
    set password(newPassword) {
        this._password = newPassword;
    }
    set firstName(newFirstName) {
        this._firstName = newFirstName;
    }
    set lastName(newLastName) {
        this._lastName = newLastName;
    }
    set age(newAge) {
        if (newAge < 0) {
            console.log('Age cannot be negative.');
        } else {
            this._age = newAge;
        }
    }
    set height(newHeight) {
        if (newHeight < 0) {
            console.log('Height cannot be negative.');
        } else {
            this._height = newHeight;
        }
    }
    set weight(newWeight) {
        if (newWeight < 0) {
            console.log('Weight cannot be negative.');
        } else {
            this._weight = newWeight;
        }
    }
}

export default UserCreation; 