const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5020;

// Middleware
app.use(cors());
app.use(express.json());

// Define trusted proxies
const trustedProxies = ['your-trusted-proxy-ip']; // Replace with your trusted proxy IPs

// Middleware to validate X-Forwarded-For header
app.use((req, res, next) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    const ip = forwardedFor.split(',')[0].trim(); // Get the first IP in the list (most likely to be real)
    if (trustedProxies.includes(ip)) {
      console.log('Valid IP:', ip);
      next(); // Allow request if from a trusted proxy
    } else {
      res.status(403).send('Forbidden'); // Reject request if IP is not trusted
    }
  } else {
    next(); // If no X-Forwarded-For header, proceed normally
  }
});

// Routes
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('UniPlay API is running');
});

// Example additional route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test API working fine!' });
});

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
})
.catch(err => console.log(err));
