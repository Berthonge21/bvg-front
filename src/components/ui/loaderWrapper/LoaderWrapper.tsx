'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { BVGCommonModule } from '_store/src/modules';
import Loader from '_components/Loader/Loader';

const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const showLoader = useSelector(BVGCommonModule.selectors.getLoaderSelector);
  return (
    <Box position="relative">
      <Loader show={showLoader} />
      {children}
    </Box>
  );
};

export default LoaderWrapper;
