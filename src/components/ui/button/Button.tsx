import React from 'react';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import { TYPES } from '_store/src';
import { keyframes } from '@emotion/react';

interface Props extends ButtonProps {
  children: React.ReactNode;
  withGradient?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  status?: string;
  animation?: 'pulse' | 'shake' | 'rotate';
  onClick?: () => void;
}

const VARIANT_STYLES: any = {
  primary: {
    bg: 'rgb(26, 60, 138)',
    gradient: 'linear-gradient(to right, rgb(26, 60, 138), rgb(13, 98, 172))',
    hover: 'linear-gradient(to right, rgb(34, 76, 158), rgb(18, 115, 195))',
    textColor: 'white',
  },
  secondary: {
    bg: 'rgb(255, 168, 0)',
    gradient: 'linear-gradient(to right, rgb(255, 168, 0), rgb(255, 136, 0))',
    hover: 'linear-gradient(to right, rgb(255, 184, 28), rgb(255, 152, 28))',
    textColor: 'white',
  },
  danger: {
    bg: 'rgb(200, 57, 98)',
    gradient: 'linear-gradient(to right, rgb(200, 57, 98), rgb(138, 21, 56))',
    hover: 'linear-gradient(to right, rgb(220, 77, 118), rgb(158, 41, 76))',
    textColor: 'white',
  },
  success: {
    bg: 'rgb(3, 186, 153)',
    gradient: 'linear-gradient(to right, rgb(3, 186, 153), rgb(0, 145, 119))',
    hover: 'linear-gradient(to right, rgb(23, 206, 173), rgb(0, 165, 129))',
    textColor: 'white',
  },
  warning: {
    bg: 'rgb(255, 193, 7)',
    gradient: 'linear-gradient(to right, rgb(255, 193, 7), rgb(255, 152, 0))',
    hover: 'linear-gradient(to right, rgb(255, 214, 10), rgb(255, 167, 38))',
    textColor: 'white',
  },
};

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const getVariantFromStatus = (status?: string) => {
  switch (status) {
    case TYPES.CONSTANTS.STATUS.STATUS_OPTIONS_TYPE.ACTIVE:
      return 'success';
    case TYPES.CONSTANTS.STATUS.STATUS_OPTIONS_TYPE.INACTIVE:
      return 'danger';
    default:
      return null;
  }
};

const Button = ({
  children,
  withGradient = true,
  variant,
  status,
  animation,
  onClick,
  ...rest
}: Props) => {
  const resolvedVariant: any = status
    ? getVariantFromStatus(status)
    : variant || 'primary';

  const { bg, gradient, hover, textColor } = VARIANT_STYLES[resolvedVariant];

  const animationMap: Record<string, string> = {
    pulse: `${pulse} 1.5s infinite`,
    shake: `${shake} 0.5s ease-in-out`,
    rotate: `${rotate} 1s linear infinite`,
  };

  return (
    <ChakraButton
      bg={withGradient ? gradient : bg}
      color={textColor}
      _hover={{ background: withGradient ? hover : `${bg}CC` }}
      _active={{ background: withGradient ? hover : `${bg}AA` }}
      _disabled={{ background: 'gray.300', cursor: 'not-allowed' }}
      animation={animation ? animationMap[animation] : undefined}
      onClick={onClick}
      {...rest}>
      {children}
    </ChakraButton>
  );
};

export default Button;
