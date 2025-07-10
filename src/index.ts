import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173', // for local testing
    'https://note-tracking-app-front-end.vercel.app', // your live frontend
  ],
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.get('/api/test',(req, res) => {
  res.send({ message: 'API is working' });
})
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });