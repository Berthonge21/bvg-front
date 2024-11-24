'use client';

import React, { Suspense } from 'react';

import ProtectedRoute from '_app/layout/ProtectedRoute';
import Loader from '_components/Loader/Loader';

const ClassForm = React.lazy(
  () => import('_private/manage-class/components/ClassForm'),
);

const AddEditClass = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader show />}>
        <ClassForm />
      </Suspense>
    </ProtectedRoute>
  );
};

export default AddEditClass;
