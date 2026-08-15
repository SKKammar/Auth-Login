import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Connected to Supabase');
});
