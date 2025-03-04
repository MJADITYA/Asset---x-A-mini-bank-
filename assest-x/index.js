const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Ensure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Replace 'your_connection_string' with your actual MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/username'; // Update this line with your actual connection string

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Welcome to Asset-x Banking System API');
});

// User Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
        return res.status(400).json({ message: 'User  already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser  = new User({ username, password: hashedPassword });
    await newUser .save();

    res.status(201).json({ message: 'User  registered successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
