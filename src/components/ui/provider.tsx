'use client';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '_theme/customTheme';
import React from 'react';

export function CustomProvider({ children }: { children: React.ReactNode }) {
  const themeExtended = theme();
  return <ChakraProvider theme={themeExtended}>{children}</ChakraProvider>;
}
