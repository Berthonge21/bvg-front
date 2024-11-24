import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PacksModule } from '_store/src/modules';

const PacksList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { entityPacks } = useSelector(PacksModule.selectors.packsSelector);
  useEffect(() => {
    if (entityPacks?.length === 0) {
      dispatch(PacksModule.actions.getAllPackRequestAction());
    }
  }, [entityPacks?.length]);

  return (
    <Box
      minW="400px"
      minH="200px"
      bgColor="white"
      borderRadius="7px"
      borderWidth={2}
      borderColor="lightgray.500"
      p="3">
      <Text fontSize="18px" fontWeight="bold">
        {t('OFFERS.LIST')}
      </Text>
      <Box gap="10px" mt="20px">
        {entityPacks?.content?.map((pack: any, index: number) => (
          <Flex
            key={index}
            alignItems="center"
            justifyContent="space-between"
            mt="10px">
            <Flex alignItems="center" gap="10px">
              <Image
                src="https://avatar.iran.liara.run/public"
                boxSize="30px"
                borderRadius="full"
                boxShadow="0 0 5px rgba(0, 0, 0, 0.1)"
                alt="user"
              />
              <Box ml="10px">
                <Text fontSize="15px" fontWeight="bold">
                  {pack.name}
                </Text>
              </Box>
            </Flex>
            <Text fontSize="15px" fontWeight="bold" color="primary.500">
              {pack.price}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default PacksList;
