'use client';

import React, { Suspense } from 'react';
import ProtectedRoute from '_app/layout/ProtectedRoute';
import Loader from '_components/Loader/Loader';

const TransactionForm = React.lazy(
  () => import('../../components/TransactionForm'),
);

const TransactionAddEdit = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader show />}>
        <TransactionForm />
      </Suspense>
    </ProtectedRoute>
  );
};

export default TransactionAddEdit;
