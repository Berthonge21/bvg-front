import React, { FunctionComponent, useState } from 'react';
import Menu from '../menu';
import { errorDropDown, StyledMenuContainer } from './dropdown.styles';
import { Box, Text } from '@chakra-ui/react';
import { Icon } from '_components/Icon/Icon';

interface CustomProps {
  isOpen?: boolean;
  children?: any;
  label?: string;
  labelStyle?: any;
  arrowIcon?: boolean;
  hasError?: boolean;
  required?: boolean;
  iconMarginLeft?: string;
  width?: string;
}
const Dropdown: FunctionComponent<CustomProps> = ({
  required,
  hasError,
  arrowIcon,
  children,
  isOpen = false,
  label,
}) => {
  const [menuOpened, setMenuOpened] = useState(isOpen);
  return (
    <Box>
      {label !== '' && label !== null && label !== undefined && (
        <Text display={'flex'} mb={'5px'} color={'black'} gap={'4px'}>
          {label}
          {required && (
            <Text color={'red'} as={'span'}>
              *
            </Text>
          )}
        </Text>
      )}

      <StyledMenuContainer
        position="relative"
        display={'flex'}
        alignItems={'center'}
        height={'100%'}
        {...(hasError && errorDropDown)}>
        <Menu
          isOpen={menuOpened}
          onClose={() => {
            setMenuOpened(false);
          }}
          onOpen={() => {
            setMenuOpened(true);
          }}>
          {children}
        </Menu>
        {arrowIcon && (
          <Icon
            right={'15px'}
            mt={'10px'}
            display={'inline-flex'}
            position={'absolute'}
            displayName={menuOpened ? 'chevron-up' : 'chevron-down'}
            viewBox={'0 0 2600 2600'}
            fontSize="0.8em"
          />
        )}
      </StyledMenuContainer>
    </Box>
  );
};

export default Dropdown;
