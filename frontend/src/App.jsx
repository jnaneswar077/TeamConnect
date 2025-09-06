import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
// import toast from 'react-hot-toast';

import * as Sentry from "@sentry/react";

// Temporarily use regular Routes for debugging
// const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);
const SentryRoutes = Routes;


const App = () => {
  return (
  <>
  {/* <button onClick={() => toast.success("congrats ")}>Test Toast</button> */}
    {/* <button onClick={() => {
      throw new Error("MY test error not coming::::::::::::::")
    }}>
      THROW ERROR
    </button> */} 

    <SignedIn>
        <SentryRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </SentryRoutes>
    </SignedIn>

    <SignedOut>
      <SentryRoutes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to={"/auth"} replace />} />
      </SentryRoutes>
    </SignedOut>
    
  </>);
}

export default App