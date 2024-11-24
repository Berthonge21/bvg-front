import { Box, Text, VStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface BoxContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  marginTop?: string;
}

const BoxContainer: FC<BoxContainerProps> = ({
  title = '',
  description = '',
  children,
  marginTop = '50px',
}) => {
  const { t } = useTranslation();
  return (
    <Box position={'relative'} mt={marginTop}>
      <VStack alignItems={'flex-start'} spacing={4}>
        <Text color={'black'} fontWeight={'bold'} fontSize={'20px'}>
          {t(title)}
        </Text>
        <Text color={'black'} fontWeight={'regular'} fontSize={'16px'}>
          {t(description)}
        </Text>
      </VStack>
      <Box
        mt={marginTop}
        borderColor={'gray.200'}
        padding={'5'}
        borderWidth={'1px'}
        borderRadius={'lg'}>
        {children}
      </Box>
    </Box>
  );
};

export default BoxContainer;
