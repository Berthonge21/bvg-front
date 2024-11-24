'use client';

import React, { Suspense } from 'react';
import { Flex } from '@chakra-ui/react';

const LoginForm = React.lazy(() => import('_app/auth/components/LoginForm'));

const SingInPage = () => {
  return (
    <Flex width={'100%'} overflow={'hidden'}>
      <Suspense>
        <LoginForm />
      </Suspense>
    </Flex>
  );
};

export default SingInPage;
