import React, { FunctionComponent } from 'react';

import { Image, Flex, Text, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '_assets/svg';
import { Colors } from '_theme/variables';

const HelpCenter: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useRouter();
  return (
    <Box backgroundColor={'white'} borderRadius={'7px'} padding={'3'} mb={'5'}>
      <Box
        borderRadius={'7px'}
        background={
          'linear-gradient(163.61deg, rgba(194, 199, 202, 0.03) 9.75%, rgba(194, 199, 202, 0.165) 120.73%)'
        }
        padding={'3'}>
        <Text
          fontSize={'17px'}
          color={'secondary.500'}
          mb={'5px'}
          fontWeight={'bold'}>
          {t('HELP_CENTER.TITLE')}
        </Text>
        <Text fontSize={'14px'} color={'lightGray.500'}>
          {t('HELP_CENTER.DESCRIPTION')}
        </Text>
        <Flex justifyContent={'space-between'} alignItems={'end'}>
          <Box
            cursor={'pointer'}
            mt={5}
            onClick={() => navigate.push('/private/contact-us')}>
            <ArrowRightIcon fill={Colors.secondary} width={'24px'} />
          </Box>
          <Image src={'/assets/images/assistance.png'} alt={'assistance'} />
        </Flex>
      </Box>
    </Box>
  );
};
export default HelpCenter;
