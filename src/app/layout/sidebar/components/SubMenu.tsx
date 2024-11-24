import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { ILink } from '../types';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useSideBarStyle from '../hooks/useSideBarStyle';
import { Colors } from '_theme/variables';
import { hexToRGB } from '_theme/colors';

interface SubMenuProps {
  isActiveLink: (path: string) => boolean;
  redirectToPath: (link: ILink) => void;
  sideToggled: boolean;
  link: ILink;
}

const SubMenu: FC<SubMenuProps> = ({
  sideToggled,
  redirectToPath,
  isActiveLink,
  link,
}) => {
  const { t } = useTranslation();
  const { toggledTextStyles, textStyle, linkStyle } = useSideBarStyle({
    sideToggled,
  });

  const setTextStyle = useCallback(
    (linkPath: string) =>
      isActiveLink(linkPath)
        ? {
            ...textStyle,
            fontWeight: '500',
            fontSize: '15px',
            color: 'primary.500',
          }
        : textStyle,
    [isActiveLink, textStyle],
  );

  return (
    <Link
      key={link.path}
      onClick={e => {
        e.preventDefault();
        redirectToPath(link);
      }}
      {...linkStyle}
      py="0"
      _hover={{
        bg: hexToRGB('primary', 0.1, 500),
        borderRadius: '5px',
        ps: '0',
        pe: { base: '1rem', md: '0' },
        ms: '0',
      }}
      me={sideToggled ? '0' : '10px'}
      ps="0"
      transition="all ease-in-out 350ms"
      pe={{ base: '1rem', md: '0' }}>
      <Box
        height="100%"
        width="8px"
        bg={isActiveLink(link.path) ? 'primary.500' : 'transparent'}
        borderRadius="12px"
        transition="all 300ms ease"
      />
      <Flex
        align="center"
        justifyContent="center"
        w="100%"
        h="100%"
        borderRadius="5px"
        px="10px"
        borderBottom={isActiveLink(link.path) ? '2px solid' : '0'}
        borderColor={isActiveLink(link.path) ? 'primary.500' : 'transparent'}
        bg={isActiveLink(link.path) ? hexToRGB('primary', 0.1) : 'transparent'}>
        <Box as="span">
          {link.icon && (
            <link.icon
              width="18px"
              height="18px"
              fill={isActiveLink(link.path) ? Colors.primary : Colors.grayScale}
            />
          )}
        </Box>
        <Text
          display={
            !sideToggled ? { lg: 'none' } : { base: 'none', lg: 'block' }
          }
          ms="1rem"
          {...toggledTextStyles}
          {...setTextStyle(link.path)}>
          {t(link.label)}
        </Text>
      </Flex>
    </Link>
  );
};

export default memo(SubMenu);
