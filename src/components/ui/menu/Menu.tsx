import React, { FunctionComponent } from 'react'
import { Menu as ChakraMenu, MenuProps } from '@chakra-ui/react'

const Menu: FunctionComponent<MenuProps> = ({ children, ...props }) => {
  return <ChakraMenu {...props}>{children}</ChakraMenu>
}

export default Menu
