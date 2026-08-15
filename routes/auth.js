import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  const { data, error } = await req.app.locals.supabase.auth.signUp({
    email,
    password
  });
  
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  
  res.status(201).json(data.user);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  const { data, error } = await req.app.locals.supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    return res.status(401).json({ error: 'Invalid login credentials' });
  }
  
  res.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: data.user
  });
});

// Logout (protected)
router.post('/logout', verifyToken, async (req, res) => {
  const { error } = await req.app.locals.supabase.auth.signOut();
  
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  
  res.status(204).send();
});

export default router;
