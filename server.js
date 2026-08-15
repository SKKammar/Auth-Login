import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import authRoutes from './routes/auth.js';
import { verifyToken } from './middleware/auth.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const swaggerDocument = JSON.parse(fs.readFileSync(new URL('./swagger/openapi.json', import.meta.url), 'utf8'));

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

// Enable CORS
app.use(cors());

app.use(express.json());

// Rate limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' }
});

// Routes
app.use('/auth', authLimiter, authRoutes);

// Public route
app.get('/public/info', (req, res) => {
  res.json({ message: 'Welcome stranger! This info is public.' });
});

// Protected profile (verified)
app.get('/protected/profile', verifyToken, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    created_at: req.user.created_at
  });
});

// Protected dashboard
app.get('/protected/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Dashboard data' });
});

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Connected to Supabase');
});
