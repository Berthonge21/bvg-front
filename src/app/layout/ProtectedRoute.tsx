'use client';

import { useSelector } from 'react-redux';
import { AuthModule } from '_store/src/modules';
import React, { memo, useEffect, useState } from 'react';
import Layout from '_app/layout/Layout';
import { APP_ROUTES } from '_app/config/routes';
import { useRouter, usePathname } from 'next/navigation';
import Loader from '_components/Loader/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, currentUser } = useSelector(
    AuthModule.selectors.authSelector,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        router.push(APP_ROUTES.PUBLIC.HOME);
      }, 2000);
      setIsLoading(true);
    }
  }, [isLoggedIn, router, isLoading]);

  useEffect(() => {
    const isBackOfficeRoute = pathname?.startsWith('/private/back-office');
    if (isLoggedIn && currentUser?.roleType !== 'ADMIN' && isBackOfficeRoute) {
      router.replace(APP_ROUTES.PRIVATE.CLIENT.DASHBOARD);
      setIsLoading(true);
    }
  }, [isLoggedIn, currentUser, pathname, router, isLoading]);

  if (isLoading) {
    return <Loader show={isLoading} />;
  }

  return <>{isLoggedIn && pathname ? <Layout>{children}</Layout> : null}</>;
};

export default memo(ProtectedRoute);
