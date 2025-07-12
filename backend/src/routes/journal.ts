import express from 'express';
import JournalEntry from '../models/JournalEntry';

const router = express.Router();

// Create a new journal entry
router.post('/add', async (req, res) => {
  try {
    // In a real app, userId should come from authentication middleware
    const { userId, content, mood, tags } = req.body;
    const newEntry = new JournalEntry({ userId, content, mood, tags });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

// Get all journal entries for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.params.userId });
    res.json(entries);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

export default router;