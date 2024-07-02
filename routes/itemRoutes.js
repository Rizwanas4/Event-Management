// backend/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Create a new item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an item by ID
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await item.remove();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
