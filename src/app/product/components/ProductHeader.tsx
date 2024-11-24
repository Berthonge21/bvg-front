'use client';

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { LogoIcon } from '_assets/svg';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '_app/config/routes';

const ProductHeader = () => {
  const router = useRouter();
  return (
    <Box bgColor={'primary.500'} flexGrow={1}>
      <Flex align={'center'} justify={'space-between'} p={4}>
        <Box>
          <Flex align={'center'} justifyContent={'flex-start'} gap={2}>
            <Box borderRadius="9px" bgColor="#F5F5F5">
              <LogoIcon />
            </Box>
            <Text
              fontSize={{ md: '14px', lg: '18px' }}
              fontWeight="bold"
              color={'white'}
              cursor="pointer"
              onClick={() => window.location?.reload()}>
              BVG - INNOVATION
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex gap={5} flexGrow={1}>
            <Button
              borderRadius={50}
              p={'20px'}
              bgColor={'primary.500'}
              color={'white'}
              _hover={{ backgroundColor: 'primary.500' }}
              onClick={() => router.push(APP_ROUTES.PUBLIC.SIGN_IN)}>
              Sign In
            </Button>
            <Button
              borderRadius={50}
              p={'20px'}
              bgColor={'secondary.500'}
              color={'white'}
              _hover={{ backgroundColor: 'secondary.500' }}
              onClick={() => router.push(APP_ROUTES.PUBLIC.SIGN_UP)}>
              Get started
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductHeader;
