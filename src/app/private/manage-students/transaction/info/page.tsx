'use client';
import React, { Suspense } from 'react';
import ProtectedRoute from '_app/layout/ProtectedRoute';
import Loader from '_components/Loader/Loader';

const TransactionInfo = React.lazy(
  () => import('_private/manage-students/components/TransactionInfo'),
);

const TransactionInfoPage = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader show />}>
        <TransactionInfo />
      </Suspense>
    </ProtectedRoute>
  );
};

export default TransactionInfoPage;
