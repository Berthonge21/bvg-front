import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Center, VStack, Text } from '@chakra-ui/react';
import PricingCard from './PricingCard/PricingCard';
import { useDispatch, useSelector } from 'react-redux';
import { PacksModule } from '_store/src/modules';
import { useTranslation } from 'react-i18next';
import CustomSkeleton from '_components/custom-skeleton';
import { LoaderType } from '_components/custom-skeleton/CustomSkeleton';

const Product = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { entityPacks, isLoading } = useSelector(
    PacksModule.selectors.packsSelector,
  );
  const [selectedCard, setSelectedCard] = useState(1);

  const handleCardSelect = (index: number) => {
    setSelectedCard(index);
  };

  useEffect(() => {
    if (entityPacks?.length === 0) {
      dispatch(PacksModule.actions.getAllPackRequestAction());
    }
  }, [entityPacks?.length]);

  return (
    <Box bgColor={'#F5F8FF'} width={'100%'}>
      <Center flexDirection={'column'} width={'100%'}>
        <VStack width={'50%'} p={4} mt={10}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            {t('OFFERS.TITLE')}
          </Text>
          <Text textAlign={'center'}>{t('OFFERS.DESCRIPTION')}</Text>
        </VStack>

        {isLoading ? (
          <Box width={'80%'} p={4}>
            <CustomSkeleton
              type={LoaderType.PACK_LIST}
              width={'100%'}
              height={'300px'}
            />
          </Box>
        ) : (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={4}
            width={'50%'}
            mt={10}
            mb={20}>
            {entityPacks?.content?.map((pricing: any, index: number) => (
              <PricingCard
                offers={pricing}
                key={index}
                isSelected={selectedCard === index}
                onSelect={() => handleCardSelect(index)}
              />
            ))}
          </SimpleGrid>
        )}
      </Center>
    </Box>
  );
};

export default Product;
