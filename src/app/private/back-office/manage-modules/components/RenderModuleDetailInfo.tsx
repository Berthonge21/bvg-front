import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { hexToRGB } from '_theme/colors';
import React from 'react';

const RenderModuleDetailInfo = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  return (
    <VStack
      alignItems="flex-start"
      width="100%"
      spacing={4}
      borderRadius="7px"
      p="3"
      bgColor="white">
      <VStack spacing={2} alignItems="flex-start">
        <Flex gap="10px">
          <Text>{t('MANAGE_MODULE.NAME')}</Text>
          <Text>{data?.name}</Text>
        </Flex>
        <Flex gap="10px">
          <Text>{t('MANAGE_MODULE.STATUS')}</Text>
          <Text>{data?.status}</Text>
        </Flex>
      </VStack>

      <Box width="100%">
        <Text>{t('MANAGE_MODULE.FEATURES')}</Text>
        <Flex
          border="1px solid #E7EAEA"
          bgColor={hexToRGB('lighter', 0.1)}
          p="3"
          mt="3"
          alignItems="flex-start"
          gap="10px"
          maxHeight="200px"
          overflowY="auto"
          borderRadius="7px"
          flexWrap="wrap">
          {data?.features?.map((feature: any, index: number) => (
            <Flex
              key={index}
              bgColor={hexToRGB('primary', 0.1)}
              p="2"
              borderRadius="7px"
              minWidth="120px"
              mb="10px"
              alignItems="center"
              justifyContent="center">
              <Text>{feature?.name || t('COMMON.NO_DATA_FOUND')}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </VStack>
  );
};

export default RenderModuleDetailInfo;
