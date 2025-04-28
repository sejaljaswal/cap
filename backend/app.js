const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5020;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('UniPlay API is running');
});


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
