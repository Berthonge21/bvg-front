'use client';

import { Box, BoxProps } from '@chakra-ui/react';
import React, { FunctionComponent, useMemo, useState } from 'react';

import Container from './container';
import Header from './header';
import { layoutStyle } from './layout.styles';
import Sidebar from './sidebar';
import Footer from '_app/layout/footer';

const Layout: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggledLayoutStyle = useMemo(
    () =>
      isSidebarOpen
        ? layoutStyle
        : {
            ...layoutStyle,
            ms: { base: '', md: '220px', lg: '70px' },
            w: {
              base: '',
              md: 'calc(100vw - 220px)',
              lg: 'calc(100vw - 70px)',
            },
            h: 'calc(100vh - 35px)',
          },
    [isSidebarOpen],
  );
  const toggledOverlayStyle: BoxProps = useMemo(
    () =>
      isSidebarOpen
        ? {
            display: 'none',
            w: '0',
            h: '0',
            bg: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            insetStart: 0,
            top: 0,
            zIndex: 0,
          }
        : {
            display: { base: 'block', md: 'none', lg: 'none' },
            w: '100%',
            h: '100%',
            bg: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            insetStart: 0,
            top: 0,
            zIndex: 9,
          },
    [isSidebarOpen],
  );

  return (
    <Box bgColor={'#F8FAFC'}>
      <Sidebar
        sideToggled={isSidebarOpen}
        showSidebarButton={true}
        onShowSidebar={toggleSidebar}
      />
      <Box
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        {...toggledOverlayStyle}
      />
      <Box {...toggledLayoutStyle}>
        <Header showSidebarButton onShowSidebar={toggleSidebar} />
        <Container sideToggled={isSidebarOpen}>{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
};
export default Layout;
