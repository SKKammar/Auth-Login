import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import authRoutes from './routes/auth.js';
import { verifyToken } from './middleware/auth.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/openapi.json' assert { type: 'json' };

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
