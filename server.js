const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: 'https://fams-nceccijsl-karim-rahals-projects-519f35ea.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

