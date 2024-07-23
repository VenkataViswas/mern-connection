const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/MERN', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define a User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Define routes
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Create a new user document
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(200).json({ message: 'User data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
