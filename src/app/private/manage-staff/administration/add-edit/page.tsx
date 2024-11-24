'use client';

import React, { Suspense } from 'react';
import ProtectedRoute from '_app/layout/ProtectedRoute';
import Loader from '_components/Loader/Loader';

const AddNewStaffForm = React.lazy(
  () => import('_private/manage-staff/components/AddNewStaffForm'),
);

const page = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader show />}>
        <AddNewStaffForm />
      </Suspense>
    </ProtectedRoute>
  );
};

export default page;
