const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ Allow both production and preview Vercel URLs
const allowedOrigins = [
  'https://fams-psi.vercel.app',
  'https://fams-8dzo66ee4-karim-rahals-projects-519f35ea.vercel.app'
];

// ✅ Safe CORS setup
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

// ✅ Preflight support — use '*' not a full URL
app.options('*', cors());

app.use(express.json());

// ✅ Use path only, not full URL
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
