import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

// ✅ Proper middleware order
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.29.226:3000'],
  credentials: true,
}));
app.use(express.json());

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.use('/api/auth', authRoutes);

// ✅ MongoDB + Start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
