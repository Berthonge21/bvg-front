import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Text,
  Button,
  Divider,
  Center,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { TYPES } from '_store/src';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '_app/config/routes';

const PricingCard = ({
  offers,
  isSelected,
  onSelect,
}: {
  offers: any;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const router = useRouter();
  return (
    <>
      {offers?.status !==
      TYPES.CONSTANTS.STATUS.STATUS_OPTIONS_TYPE.INACTIVE ? (
        <Box
          bgColor={isSelected ? 'primary.500' : 'white'}
          borderRadius={20}
          p={4}
          onClick={onSelect}
          borderWidth={1}
          borderColor={'light'}>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Text
              fontSize={'22px'}
              fontWeight={'bold'}
              color={isSelected ? 'white' : 'black'}>
              {offers?.name}
            </Text>
            {offers.reduction && (
              <Box
                borderRadius={50}
                bgColor={isSelected ? 'white' : '#EFECFF'}
                color={'primary.500'}
                py={'5px'}
                px={'12px'}>
                <Text fontSize={'13px'} fontWeight={'bold'}>
                  {offers.percent}%
                </Text>
              </Box>
            )}
          </Flex>
          <Divider marginTop={3} bgColor={'gray.200'} size={'lg'} />
          <Center mt={2}>
            <VStack>
              {offers?.freePlan ? (
                <Text
                  fontSize={'3xl'}
                  color={isSelected ? 'white' : 'primary.500'}
                  fontWeight={'bold'}>
                  Gratuit
                </Text>
              ) : (
                <>
                  <Text
                    textDecorationLine={'line-through'}
                    fontSize={'11px'}
                    color={isSelected ? 'white' : 'black'}>
                    {offers.price} FCFA/mois
                  </Text>
                  <Text
                    fontSize={'16px'}
                    fontWeight={'bold'}
                    color={isSelected ? 'white' : 'black'}>
                    {offers.price}{' '}
                    <span style={{ fontSize: '10px' }}>FCFA/mois</span>
                  </Text>
                </>
              )}
              <Box
                borderRadius={50}
                bgColor={'#FFEECC'}
                color={'#C68A15'}
                px={'20px'}
                py={'2px'}>
                <Text fontSize={'12px'}>
                  Soit {offers?.price * 12} fcfa par an
                </Text>
              </Box>
            </VStack>
          </Center>
          <Divider marginTop={3} bgColor={'gray.200'} size={'lg'} />
          <Center flexDirection={'column'} width={'100%'}>
            <VStack mt={5} spacing={4} align={'start'} width={'100%'}>
              {offers?.modules?.map(
                (feature: Record<string, any>, index: number) => (
                  <Flex
                    key={index}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    gap={2}>
                    <CheckIcon color={isSelected ? 'white' : 'black'} />
                    <Text
                      textAlign={'center'}
                      color={isSelected ? 'white' : 'black'}>
                      {feature?.name}
                    </Text>
                  </Flex>
                ),
              )}
            </VStack>
            <Button
              bgColor={isSelected ? 'primary.500' : 'white'}
              borderRadius={50}
              borderColor={'#D3D3D3'}
              borderWidth={'1px'}
              mt={'50px'}
              px={'20px'}
              onClick={() => router.push(APP_ROUTES.PUBLIC.SIGN_UP)}
              _hover={{ backgroundColor: 'transparent' }}>
              <Text fontSize={'10px'} color={isSelected ? 'white' : 'black'}>
                Commencer
              </Text>
            </Button>
          </Center>
        </Box>
      ) : null}
    </>
  );
};

export default PricingCard;
