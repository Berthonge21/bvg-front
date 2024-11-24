import React, { FunctionComponent } from 'react'
import { MenuButton as ChakraMenuButton } from '@chakra-ui/react'

const MenuButton: FunctionComponent<any> = ({ children, ...props }) => {
  return <ChakraMenuButton {...props}>{children}</ChakraMenuButton>
}

export default MenuButton
