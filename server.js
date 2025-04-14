const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ Define allowed frontend origins
const allowedOrigins = [
  'https://fams-psi.vercel.app',
  'https://fams-8dzo66ee4-karim-rahals-projects-519f35ea.vercel.app'
];

// ✅ Proper CORS function
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked for origin: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Correct preflight handler
app.options('*', cors()); // DO NOT pass a full URL here

app.use(express.json());

// ✅ API routes (use path, not full URL)
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Root
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
