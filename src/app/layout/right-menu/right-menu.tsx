import React from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import RightPrivateUserMenu from './right-private-user-menu';
import { rightSideBarStyles } from './rightMenu.styles';
import { RightMenuProps } from '../sidebar/types';
import { useSelector } from 'react-redux';
import { AuthModule } from '_store/src/modules';
import RightPrivateAdminMenu from '../right-menu/right-private-admin-menu';

const RightMenu = ({ sideToggled = true }: RightMenuProps) => {
  const variant = useBreakpointValue({ xl: '300px' });
  const { currentUser, isLoggedIn } = useSelector(
    AuthModule.selectors.authSelector,
  );
  return (
    <Box
      w={sideToggled ? variant : '0'}
      overflow={'hidden'}
      transition={'all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)'}
      px={{ base: sideToggled ? '5' : 0, sm: '0' }}>
      <Box {...rightSideBarStyles}>
        {isLoggedIn && currentUser?.roleType !== 'ADMIN' ? (
          <RightPrivateUserMenu />
        ) : (
          <RightPrivateAdminMenu />
        )}
      </Box>
    </Box>
  );
};

export default RightMenu;
