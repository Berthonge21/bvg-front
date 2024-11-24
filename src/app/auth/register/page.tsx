'use client';
import React, { Suspense } from 'react';
const SignUpForm = React.lazy(() => import('_app/auth/components/SignUpForm'));

const SignUpPage = () => {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpPage;
