const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// ✅ CORS: allow frontend from Vercel
app.use(cors({
  origin: 'https://fams-nceccijsl-karim-rahals-projects-519f35ea.vercel.app',
  credentials: true
}));

// ✅ Enable preflight CORS handling for all routes
app.options('*', cors());

app.use(express.json());

// ✅ Mount API routes
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Root route for testing
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
