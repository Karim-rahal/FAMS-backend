const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();
connectDB();

const app = express();

// ✅ Only allow Vercel frontend origins
const allowedOrigins = [
  'https://fams-psi.vercel.app',
  'https://fams-8dzo66ee4-karim-rahals-projects-519f35ea.vercel.app'
];

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

app.options('*', cors()); // ✅ wildcard route only — NO full URLs

app.use(express.json());

// ✅ Use relative route paths — not URLs
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.send('API is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
