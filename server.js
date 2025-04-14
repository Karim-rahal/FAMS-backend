const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();
connectDB();

const app = express();

// ✅ Define allowed frontend domains (production + preview)
const allowedOrigins = [
  'https://fams-psi.vercel.app', // Production
  'https://fams-8dzo66ee4-karim-rahals-projects-519f35ea.vercel.app' // Preview
];

// ✅ Apply CORS securely
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Handle preflight requests
app.options('*', cors());

app.use(express.json());

// ✅ Register backend routes (no full URL here!)
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Test root route
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
