import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <SignedIn>
        <UserButton />
        Homepage
      </SignedIn>
      
      <SignedOut>
        <h1>Welcome to TeamConnect!</h1>
        <p>Please sign in to continue.</p>
        <SignInButton mode="modal">
          <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  )
}

export default HomePage;