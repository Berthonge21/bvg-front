'use client';

import { Box, Center, Text } from '@chakra-ui/react';

import React from 'react';
import { BvgWhiteLogo, StatsDashboard } from '_assets/svg';
import { useTranslation } from 'react-i18next';

export const AuthBackground = () => {
  const { t } = useTranslation();
  return (
    <Box bgColor={'primary.500'} width={'50%'} height={'100vh'}>
      <Box pl={5}>
        <BvgWhiteLogo width={120} height={120} />
      </Box>
      <Center flexDir={'column'} alignItems={'center'} gap={'30px'}>
        <Text
          fontSize={'20px'}
          fontWeight={'bold'}
          textAlign={'center'}
          color={'white'}>
          {t('DASHBOARD.WELCOME')}
        </Text>
        <StatsDashboard />
      </Center>
    </Box>
  );
};
