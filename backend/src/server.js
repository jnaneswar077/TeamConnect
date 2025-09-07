import '../instrument.mjs';
import dotenv from 'dotenv';  
import * as Sentry from "@sentry/node";

import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from './config/inngest.js';
import { serve } from 'inngest/express';
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";


dotenv.config();

const app = express();



app.use(express.json());
app.use(cors({ 
  origin: ENV.CLIENT_URL, 
  credentials: true 
}));

app.use(clerkMiddleware());//req.auth is available in the request object


app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

// app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send('Hello World! 123');
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: ENV.NODE_ENV 
    });
});



// Initialize database connection
const initDB = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    // In production, don't crash the function, just log the error
    if (ENV.NODE_ENV === "production") {
      console.error("Database connection failed, but continuing without DB");
    } else {
      throw error;
    }
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
  // In production (Vercel), initialize DB but don't crash on failure
  initDB().catch(error => {
    console.error("Failed to initialize database:", error);
  });
}


export default app;