import { hexToRGB } from '_theme/colors';
import { AccordionItem, styled } from '@chakra-ui/react';

export const TextStyle = {
  fontWeight: 800,
  fontSize: '19px',
  color: 'overlay.500',
  lineHeight: '19px',
};

export const AccordionTextStyle = {
  fontWeight: 700,
  fontSize: '15px',
  lineHeight: '18px',
  color: '#333333',
  textOverflow: 'ellipsis ',
};
export const accordionStyle = {
  boxShadow: `0 20px 35px ${hexToRGB('light', 0.1)}`,
  border: `1px solid ${hexToRGB('lighter', 0.58)}`,
  borderRadius: '7px',
};
export const ButtonStyle = {
  _hover: { bg: 'transparent' },
  justifyContent: 'space-between',
};
export const AccordionPanelFlexStyle = {
  my: '2',
  p: '3',
  style: { backgroundColor: 'rgba(194, 199, 202, 0.3)' },
  minW: '100%',
  minH: '40%',
  borderRadius: '7px',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const HeaderTextStyle = {
  fontWeight: 700,
  fontSize: '15px',
  color: 'white',
  lineHeight: '15px',
};
export const TitleStyle = {
  fontWeight: 800,
  fontSize: '17px',
  color: 'black.500',
  lineHeight: '19px',
};
export const formGroupStyle = {
  flex: 1,
  minWidth: { base: '100%', lg: '280px' },
  flexBasis: '280px',
};
export const formGroupButtonStyle = {
  flex: 1,
  maxWidth: '250px',
  flexBasis: '250px',
};
export const StyledAccordionItem = styled(AccordionItem, {
  baseStyle: {
    '&.chakra-accordion__item .chakra-collapse': {
      overflow: 'visible !important',
    },
  },
});
