import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Make supabase available to routes
app.locals.supabase = supabase;

app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Public route
app.get('/public/info', (req, res) => {
  res.json({ message: 'Welcome stranger! This info is public.' });
});

// Protected profile (initially unverified)
app.get('/protected/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }
  res.json({ message: 'Profile data (unverified for now)' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Connected to Supabase');
});
