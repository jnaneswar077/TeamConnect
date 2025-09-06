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



const startServer = async () => {
    try {
      await connectDB();
      if (ENV.NODE_ENV !== "production") {
        app.listen(ENV.PORT, () => {
          console.log("Server started on port:", ENV.PORT);
        });
      }
    } catch (error) {
      console.error("Error starting server:", error);
      process.exit(1); // Exit the process with a failure code
    }
  };
  
  startServer();


    export default app;