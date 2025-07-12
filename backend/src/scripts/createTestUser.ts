import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function createUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('✅ Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('123456', 10);

    const user = await User.create({
      email: 'test@example.com',
      password: hashedPassword,
    });

    console.log('✅ Test user created:', user);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating user:', err);
    process.exit(1);
  }
}

createUser();
