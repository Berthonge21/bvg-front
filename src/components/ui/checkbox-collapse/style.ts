import { BorderProps } from '@chakra-ui/react';
import { hexToRGB } from '_theme/colors';

export const borderRadius: BorderProps = {
  borderRadius: '7px',
  border: `1px solid ${hexToRGB('gray', 0.3)}`,
};
