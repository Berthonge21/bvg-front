import React, { FunctionComponent, ReactNode } from 'react';
import { MenuList as ChakraMenuList } from '@chakra-ui/react';

interface DropdownProps {
  horizontalDirection?: any;
  VerticalDirection?: any;
  children?: ReactNode;
  overrideStyles?: any;
  width?: any;
}

const MenuList: FunctionComponent<DropdownProps> = ({
  overrideStyles,
  children,
  width,
}) => {
  return (
    <ChakraMenuList
      width={width}
      p={'5px'}
      {...overrideStyles}
      overflow="auto"
      zIndex={9}>
      {children}
    </ChakraMenuList>
  );
};

export default MenuList;
