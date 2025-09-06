import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <SignedIn>
        <UserButton />
        Homepage
      </SignedIn>
    </div>
  )
}

export default HomePage;