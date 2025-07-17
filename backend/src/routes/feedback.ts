import express from 'express';
import Feedback from '../models/Feedback';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { userId, name, email, message, rating } = req.body;
    const feedback = new Feedback({ userId, name, email, message, rating });
    await feedback.save();
    res.status(201).json({ message: 'Feedback saved', feedback });
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

export default router; 