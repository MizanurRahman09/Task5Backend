const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid'); // Import the UUID function

function generateUserData(region, errors, seed, page) {
    faker.seed(seed); // Seed the faker for reproducibility

    const userData = [];
    const offset = (page - 1) * 20; // Calculate offset for pagination

    for (let i = 0; i < 20; i++) {
        const user = {
            index: offset + i + 1,
            id: uuidv4(), // Use uuidv4() to generate a UUID
            name: faker.name.fullName(), // Full name
            address: `${faker.address.city()}, ${faker.address.streetAddress()}`, // Address
            phone: faker.phone.number() // Generate phone number
        };

        // Introduce errors based on the specified count
        introduceErrors(user, errors);
        userData.push(user);
    }

    return userData;
}

// Function to introduce errors in the data
function introduceErrors(user, errors) {
    for (let i = 0; i < errors; i++) {
        const errorType = Math.floor(Math.random() * 3); // Random error type

        switch (errorType) {
            case 0: // Delete a character
                user.name = deleteRandomCharacter(user.name);
                break;
            case 1: // Add a random character
                user.name = addRandomCharacter(user.name);
                break;
            case 2: // Swap two characters
                user.name = swapRandomCharacters(user.name);
                break;
        }
    }
}

// Function to add a random character at a random position
function addRandomCharacter(str) {
    const char = faker.string.alpha(); // Generate a random character using the updated method
    const index = Math.floor(Math.random() * str.length);
    return str.slice(0, index) + char + str.slice(index);
}

// Functions to manipulate strings
function deleteRandomCharacter(str) {
    const index = Math.floor(Math.random() * str.length);
    return str.slice(0, index) + str.slice(index + 1);
}

function swapRandomCharacters(str) {
    const index1 = Math.floor(Math.random() * str.length);
    const index2 = Math.floor(Math.random() * str.length);
    if (index1 !== index2) {
        const charArray = str.split('');
        [charArray[index1], charArray[index2]] = [charArray[index2], charArray[index1]];
        return charArray.join('');
    }
    return str;
}

module.exports = { generateUserData };
