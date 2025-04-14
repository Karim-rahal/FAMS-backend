const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS with preflight support
app.use(cors({
  origin: 'https://fams-nceccijsl-karim-rahals-projects-519f35ea.vercel.app',
  credentials: true,
}));

// ✅ Must handle preflight OPTIONS request
app.options('*', cors({
  origin: 'https://fams-nceccijsl-karim-rahals-projects-519f35ea.vercel.app',
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Root test route
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
