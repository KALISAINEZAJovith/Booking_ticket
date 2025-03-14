// routes/events.js
const express = require('express');
const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
 
});

// Get a specific event
router.get('/:id', async (req, res) => {
 
});

// Create a new event (admin only)
router.post('/', async (req, res) => {
  try {
    const newEvent = req.body;
    
    console.log(newEvent)
    res.status(201).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message
    });
  }
});

// Update an event (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEventData = req.body;
    
    // Get existing events
    const events = await readData('events.json');
    const eventIndex = events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Update the event
    const updatedEvent = {
      ...events[eventIndex],
      ...updatedEventData,
      updatedAt: new Date().toISOString()
    };
    
    // Validate event data
    const validation = validateEvent(updatedEvent);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event data',
        errors: validation.errors
      });
    }
    
    events[eventIndex] = updatedEvent;
    await writeData('events.json', events);
    
    res.json({
      success: true,
      data: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update event',
      error: error.message
    });
  }
});

// Delete an event (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get existing events
    const events = await readData('events.json');
    const updatedEvents = events.filter(event => event.id !== id);
    
    if (events.length === updatedEvents.length) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    await writeData('events.json', updatedEvents);
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message
    });
  }
});

module.exports = router;