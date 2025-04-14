const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ Allow multiple Vercel origins (production + preview)
const allowedOrigins = [
  'https://fams-psi.vercel.app', // production domain
  'https://fams-8dzo66ee4-karim-rahals-projects-519f35ea.vercel.app' // preview domain
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Enable preflight for all routes
app.options('*', cors());

app.use(express.json());

// ✅ API routes
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Health check / root
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
