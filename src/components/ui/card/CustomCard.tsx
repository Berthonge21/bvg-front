import {
  Card,
  CardBody,
  CardProps,
  ResponsiveValue,
  Box,
} from '@chakra-ui/react';
import React, { FC } from 'react';

interface ICardProps extends CardProps {
  width?: ResponsiveValue<number | string>;
  height?: number | string;
  bgColor?: string;
  borderRadius?: number | string;
  size?: string | 'lg' | 'md' | 'sm' | 'xs' | 'xl' | 'xxl';
  children?: React.ReactNode;
}

const CustomCard: FC<ICardProps> = ({
  width,
  height,
  bgColor,
  borderRadius = '7px',
  size = 'md',
  children,
  ...rest
}) => {
  return (
    <Box {...rest} width={width} bgColor={bgColor} borderRadius={borderRadius}>
      {children}
    </Box>
  );
};

export default CustomCard;
