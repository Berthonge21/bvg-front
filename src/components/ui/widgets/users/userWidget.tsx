import { Box, Flex, IconButton, Text, VStack, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { hexToRGB } from '_theme/colors';
import { Colors } from '_theme/variables';
import { AddCircle } from '_assets/svg';

const UserWidget = () => {
  const { t } = useTranslation();
  return (
    <Box
      bgColor={'white'}
      borderRadius={'7px'}
      padding={'3'}
      mt={'5'}
      boxShadow={'0 0 35px black.50'}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'17px'} color={'black'} fontWeight={'bold'}>
          {t('SIDE_BAR.MANAGE_USERS')}
        </Text>
        <IconButton
          bgColor={hexToRGB('primary', 0.1)}
          aria-label={'add-icon'}
          _hover={{ bgColor: 'none' }}
          icon={
            <AddCircle width={'24px'} height={'24px'} fill={Colors.primary} />
          }
        />
      </Flex>
      <VStack mt={'5'}>
        {Array?.from({ length: 3 }).map((_, index) => (
          <Flex
            width={'100%'}
            gap={'20px'}
            bgColor={hexToRGB('primary', 0.1)}
            borderRadius={'7px'}
            padding={'2'}
            key={index}>
            <Image
              alt={'img-url'}
              src={'https://avatar.iran.liara.run/public'}
              boxSize={'50px'}
            />
            <Flex
              alignItems={'flex-start'}
              justifyContent={'flex-start'}
              gap={'2px'}
              direction={'column'}>
              <Text fontSize={'17px'} color={'black'} fontWeight={'bold'}>
                User name
              </Text>
              <Text
                fontSize={'17px'}
                color={'lightgray.500'}
                fontWeight={'500'}>
                User role
              </Text>
            </Flex>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default UserWidget;
