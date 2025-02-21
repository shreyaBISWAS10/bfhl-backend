require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("Backend is running! Use /bfhl for API requests.");
});

// ✅ GET Request - Returns { "operation_code": 1 }
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// ✅ POST Request - Processes Input
app.post("/bfhl", (req, res) => {
    try {
        const data = req.body.data;

        // ✅ Validate if "data" exists and is an array
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid JSON format. Expected { data: [] }" });
        }

        // ✅ Separate numbers and alphabets
        const numbers = data.filter(item => /^[0-9]+$/.test(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

        // ✅ Find the highest alphabet (case insensitive)
        const highestAlphabet = alphabets.length
            ? [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))]
            : [];

        // ✅ Construct Response
        const response = {
            is_success: true,
            user_id: "Shreya_biswas",
            email: "Shreyabiswas1033@gmail.com",
            roll_number: "22BCS15325",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        };

        return res.json(response);
    } catch (error) {
        return res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
