require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const helmet = require('helmet');

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { collection: "User" }); // Explicitly set the collection name

const User = mongoose.model('User', UserSchema);

// Authentication Middleware
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    res.status(res.statusCode || 500).json({ success: false, message: err.message || 'Server Error' });
};

// Routes

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
      const { username, password } = req.body;
      if (!username || !password) {
          return res.status(400).json({ error: "Username and password are required" });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
      console.error("❌ Registration Error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});




// Login
app.post('/api/auth/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) 
            return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) { next(err); }
});

//Dashboard Data
app.get("/api/dashboard", authMiddleware, (req, res) => {
  try {
      const locations = [
          { name: "India", description: "Country-wide View", image: "https://res.cloudinary.com/duajungih/image/upload/v1742875310/250px-India__28orthographic_projection_29.svg_iwauoy.png" },
          { name: "Delhi", description: "Capital of India", image: "https://res.cloudinary.com/duajungih/image/upload/v1742875257/red-fort-lal-qila-indian-flag-delhi_wl1sg3.webp" },
          { name: "Mumbai", description: "Financial Capital", image: "https://res.cloudinary.com/duajungih/image/upload/v1742875486/mumbai-main-data_uxk5ht.jpg" },
          { name: "Bangalore", description: "Tech Hub", image: "https://res.cloudinary.com/duajungih/image/upload/v1742875640/prestige-raintree-park-bangalore_xggmbk.png" }
      ];
      res.json(locations);
  } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});



// Map Data
app.get("/api/map/:location", authMiddleware, async (req, res) => {
  try {
      const { location } = req.params; // Get location from URL params

      // Simulated map data for different locations
      const mapData = {
          India: { latitude: 20.5937, longitude: 78.9629, zoom: 5 },
          Delhi: { latitude: 28.6139, longitude: 77.2090, zoom: 10 },
          Mumbai: { latitude: 19.0760, longitude: 72.8777, zoom: 10 },
          Bangalore: { latitude: 12.9716, longitude: 77.5946, zoom: 10 },
      };

      if (!mapData[location]) {
          return res.status(404).json({ error: "Location not found" });
      }

      res.json({ location, coordinates: mapData[location] });
  } catch (error) {
      console.error("Error fetching map data:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


// Global Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
