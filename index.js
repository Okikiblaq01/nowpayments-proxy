const express = require("express");  // Import Express.js
const axios = require("axios");      // Import Axios for making HTTP requests
require("dotenv").config();          // Load environment variables

const app = express();
app.use(express.json());  // Middleware to parse JSON request bodies

// Endpoint to handle authentication request
app.post("/auth", async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from request

        // Send request to NowPayments API
        const response = await axios.post("https://api.nowpayments.io/v1/auth", 
            { email, password }, 
            { headers: { "Content-Type": "application/json" } }
        );

        // Send NowPayments response back to the bot
        res.json(response.data);
    } catch (error) {
        // Handle errors and send response
        res.status(500).json({ error: error.response?.data || "Error processing request" });
    }
});

// Export the app for Vercel
module.exports = app;
