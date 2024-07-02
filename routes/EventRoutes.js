const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create a new event
router.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send({ message: 'Failed to create event.', error: error.message });
  }
});

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch events.', error: error.message });
  }
});

module.exports = router;
