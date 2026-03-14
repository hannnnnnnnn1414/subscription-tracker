import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT, NODE_ENV } from './config/env';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Subscription Tracker API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} in ${NODE_ENV} mode`);
});

export default app;