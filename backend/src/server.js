import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from './config/inngest.js';
import { serve } from 'inngest/express';
dotenv.config();

const app = express();

app.use(express.json());
app.use(clerkMiddleware());//req.auth is available in the request object

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});



// Initialize database connection
const initDB = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

// Start server only in development
if (ENV.NODE_ENV !== "production") {
  const startServer = async () => {
    try {
      await initDB();
      app.listen(ENV.PORT, () => {
        console.log("Server started on port:", ENV.PORT);
      });
    } catch (error) {
      console.error("Error starting server:", error);
      process.exit(1);
    }
  };
  
  startServer();
} else {
  // In production (Vercel), just initialize DB
  initDB();
}


export default app;