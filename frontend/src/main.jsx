import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import {BrowserRouter} from "react-router-dom"
import {
  Routes,
  Route,
  // BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import * as Sentry from "@sentry/react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './providers/AuthProvider.jsx'

const queryClient = new QueryClient()


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

Sentry.init({
  dsn: "https://4f47bb738e85e490aa85949fea979879@o4509967880945664.ingest.de.sentry.io/4509972318781520",
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 1.0,
  // debug: true, // Disabled for production
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter> 
        <QueryClientProvider client={queryClient}>
          <Sentry.ErrorBoundary fallback={<div>Something went wrong!</div>}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </Sentry.ErrorBoundary>
          <Toaster position='top-right'/>
        </QueryClientProvider>
      </BrowserRouter>
     </ClerkProvider>
    
  </StrictMode>,
)

