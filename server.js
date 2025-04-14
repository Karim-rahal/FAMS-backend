const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();


const allowedOrigin = 'https://fams-nceccijsl-karim-rahals-projects-519f35ea.vercel.app';

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Required to properly respond to preflight OPTIONS request
app.options('*', cors());

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.send('API is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
