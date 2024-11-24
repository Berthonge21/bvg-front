import React, { FunctionComponent } from 'react'
import { MenuItem as ChakraMenuItem, MenuItemProps } from '@chakra-ui/react'

const MenuItem: FunctionComponent<MenuItemProps> = ({ children, ...props }) => {
  return <ChakraMenuItem {...props}>{children}</ChakraMenuItem>
}

export default MenuItem
