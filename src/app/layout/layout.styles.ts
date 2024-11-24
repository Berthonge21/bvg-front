import { BoxProps, FlexProps } from '@chakra-ui/react';
import { hexToRGB } from '_theme/colors';

const layoutStyle: BoxProps = {
  bg: 'white',
  transition: 'all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  ms: { base: 0, md: '70px', lg: '240px' },
  w: { base: '100vw', md: 'calc(100vw - 70px)', lg: 'calc(100vw - 240px)' },
  position: 'relative',
  boxShadow: `0 0 35px ${hexToRGB('black', 0.06)}`,
  borderBottomStartRadius: '18px',
  overflow: 'hidden',
  height: 'calc(100vh - 35px)',
};
const footerStyles: FlexProps = {
  position: 'fixed',
  w: '100%',
  bottom: '0',
  h: { base: 'auto', md: '35px' },
  fontSize: 'fs-13',
  alignItems: 'center',
  justifyContent: 'center',
};
export { layoutStyle, footerStyles };
