import { TextProps } from '@chakra-ui/react';
import { hexToRGB } from '_theme/colors';

const iconAdd = {
  borderRadius: '7px',
  bg: hexToRGB('tertiary', 1),
  color: 'white',
  boxSize: '45px',
};
const addbuttonStyles = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '15px',
  fontWeight: 700,
  lineHeight: '15px',
};
const titleStyles: TextProps = {
  fontSize: '17px',
  fontWeight: 800,
  color: 'primary.900',
};

export { addbuttonStyles, iconAdd, titleStyles };
