const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// File to store donation data
const donationFile = './donationData.json';

// Function to read donation amount
function getDonationAmount() {
    try {
        const data = fs.readFileSync(donationFile);
        return JSON.parse(data).amount;
    } catch (err) {
        return 0; // Default to 0 if file doesn't exist or cannot be read
    }
}

// Function to write donation amount
function setDonationAmount(amount) {
    fs.writeFileSync(donationFile, JSON.stringify({ amount }));
}

// Endpoint to get donation amount
app.get('/donation', (req, res) => {
    const amount = getDonationAmount();
    res.json({ amount });
});

// Endpoint to update donation amount
app.post('/donation', (req, res) => {
    const { amount } = req.body;
    if (typeof amount === 'number' && amount >= 0) {
        setDonationAmount(amount);
        res.json({ success: true, amount });
    } else {
        res.status(400).json({ success: false, message: 'Invalid amount' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
