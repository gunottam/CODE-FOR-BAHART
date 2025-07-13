import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  mood: { type: String, required: true }, // e.g., "happy", "sad", "anxious"
  tags: [String] // e.g., ["anxious", "tired"]
});

export default mongoose.model('JournalEntry', journalEntrySchema);