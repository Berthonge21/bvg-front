import React, { memo, ReactNode } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  styled,
  Box,
} from '@chakra-ui/react';
import { FilterIcon } from '_assets/svg';
import { boxContainer } from '_theme/containerStyles';
import { useTranslation } from 'react-i18next';
import CustomTooltip from '_components/CustomTooltip/CustomTooltip';
import Button from '_components/button/Button';

export const StyledAccordionItem = styled(AccordionItem, {
  baseStyle: {
    '&.chakra-accordion__item .chakra-collapse': {
      overflow: 'visible !important',
    },
  },
});

type FilterProps = {
  children: ReactNode;
  isExpanded?: boolean;
};

export const Filter = memo<FilterProps>(({ children, isExpanded = false }) => {
  const { t } = useTranslation();
  return (
    <Accordion
      allowToggle={true}
      marginBottom={'2%'}
      defaultIndex={isExpanded ? [0] : [1]}>
      <StyledAccordionItem border={0}>
        <AccordionButton
          display={'flex'}
          justifyContent={'end'}
          _hover={{ bg: 'transparent' }}
          w={'full'}
          p={0}
          h={0}>
          <CustomTooltip label={t('COMMON.FILTER')} aria-label="Filter tooltip">
            <Button
              variant={'secondary'}
              alignItems={'center'}
              justifyContent={'center'}
              boxSize={'45px'}
              mt={'3px'}
              ml={'3px'}
              bottom={'25px'}
              withGradient>
              <FilterIcon />
            </Button>
          </CustomTooltip>
        </AccordionButton>
        <AccordionPanel pb={4} mt="10px" {...boxContainer}>
          <Box position="relative" my="20px">
            {children}
          </Box>
        </AccordionPanel>
      </StyledAccordionItem>
    </Accordion>
  );
});
