import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes'; // ✅ Correct name now

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// ✅ Mount routes here
app.use('/api/auth', authRoutes);   // /api/auth/login, /signup
app.use('/api/notes', noteRoutes);  // /api/notes

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => console.log('🚀 Server running at http://localhost:5000'));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });