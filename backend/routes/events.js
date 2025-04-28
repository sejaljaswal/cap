// In routes/events.js

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET /api/events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();

    // Normalize whitespace in the event data before sending it back to the client
    const sanitizedEvents = events.map(event => {
      // Normalize event name and event date (if applicable)
      event.name = event.name.replace(/\s+/g, ' ').trim();  // Normalize whitespace in event name
      event.date = event.date.replace(/\s+/g, ' ').trim();  // Normalize whitespace in event date (if applicable)

      return event;
    });

    res.status(200).json(sanitizedEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
