// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin123@cluster0.ytjenqf.mongodb.net/portfolio_submission', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

// Create a schema for the form data
const submissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Create a model based on the schema
const Submission = mongoose.model('Submission', submissionSchema);

// API endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Create a new submission document
    const newSubmission = new Submission({
        name,
        email,
        message
    });

    // Save the submission to the database
    newSubmission.save()
        .then(() => {
            console.log('Form submission saved to database');
            res.status(200).send('Form submission successful');
        })
        .catch(error => {
            console.error('Error saving form submission:', error);
            res.status(500).send('An error occurred while saving the form submission');
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
