import { CloseButtonProps, styled, ModalCloseButton } from '@chakra-ui/react';
import { ImageProps } from '@chakra-ui/react';
import { hexToRGB } from '_theme/colors';

const buttonCloseStyles: CloseButtonProps = {
  borderRadius: '7px',
  backgroundColor: hexToRGB('lightGray', 0.3),
  color: 'overlay.500',
  boxSize: '36px',
  _focus: {
    boxShadow: 'none !important',
  },
  margin: '5px 5px  0 0',
};

export const StyledCloseButton = styled(ModalCloseButton, {
  baseStyle: {
    '.css-onkibi': {
      w: '11.41px',
      h: '11.41px',
      color: 'overlay.500',
    },
  },
});
const LogoBNAStyle: ImageProps = {
  width: '70px',
  height: '40px',
};
export { buttonCloseStyles, LogoBNAStyle };
