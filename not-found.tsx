'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { APP_ROUTES } from '_app/config/routes';
import { useTranslation } from 'react-i18next';

export default function Custom404() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.back();
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Flex
      width={'100%'}
      height={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
      mt={'50px'}
      gap={10}>
      <VStack align={'start'} spacing={10}>
        <Box>
          <Text fontSize={'42px'}>{t('PAGE.OOPS')}</Text>
          <Text fontSize={'42px'}>{t('PAGE.NOT_FOUND')}</Text>
        </Box>
        <Box maxW={'500px'}>
          <Text>{t('PAGE.REDIRECT_MESSAGE')}</Text>
        </Box>

        <Button
          iconSpacing={3}
          leftIcon={<ArrowBackIcon />}
          color={'white'}
          onClick={() => router.push(APP_ROUTES.PUBLIC.HOME)}>
          {t('COMMON.BACK')}
        </Button>
      </VStack>
      <Center>
        <Image src={'/assets/images/404.png'} alt={'404-error-page'} />
      </Center>
    </Flex>
  );
}
