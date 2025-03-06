const express = require("express");  
const axios = require("axios");      
require("dotenv").config();          

const app = express();
app.use(express.json());

// Endpoint to handle authentication request
app.post("/auth", async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password
        const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress; // Get IP address

        // Send request to NowPayments API
        const response = await axios.post("https://api.nowpayments.io/v1/auth", 
            { email, password }, 
            { headers: { "Content-Type": "application/json" } }
        );

        // Send NowPayments response + IP back to the bot
        res.json({
            ip: userIp,  // Add IP address
            response: response.data
        });
    } catch (error) {
        res.status(500).json({ 
            ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress, // Still send IP
            error: error.response?.data || "Error processing request" 
        });
    }
});

// Export the app for Vercel
module.exports = app;

