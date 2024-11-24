'use client';

import React, { Suspense } from 'react';

import ProtectedRoute from '_app/layout/ProtectedRoute';
import Loader from '_components/Loader/Loader';

const ClassDetail = React.lazy(
  () => import('_private/manage-class/components/ClassDetail'),
);

const ClassDetailPage = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader show />}>
        <ClassDetail />
      </Suspense>
    </ProtectedRoute>
  );
};

export default ClassDetailPage;
