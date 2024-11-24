'use client';

import React, { Suspense } from 'react';
import ProtectedRoute from '_app/layout/ProtectedRoute';
import Loader from '_components/Loader/Loader';

const StudentInscriptionForm = React.lazy(
  () => import('../components/StudentInscriptionForm'),
);

const AddEditStudent = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader show />}>
        <StudentInscriptionForm />
      </Suspense>
    </ProtectedRoute>
  );
};

export default AddEditStudent;
