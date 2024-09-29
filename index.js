const express = require('express');
const cors = require('cors'); // Import CORS
const { generateUserData } = require('./dataGenerator'); // Import the data generation function

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// API Endpoint to generate user data
app.post('/generate', (req, res) => {
    const { region, errors, seed, page } = req.body;

    // Validate that none of the fields are undefined
    if (region === undefined || errors === undefined || seed === undefined || page === undefined) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const userData = generateUserData(region, errors, seed, page);
    res.json(userData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
