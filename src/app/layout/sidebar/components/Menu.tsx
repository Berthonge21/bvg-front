import { Flex, Text, Box } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import useIsActive from '../hooks/useIsActive';
import useSideBarStyle from '../hooks/useSideBarStyle';
import { ILink } from '../types';
import { ArrowDown } from '_assets/svg';
import { Colors } from '_theme/variables';
import { hexToRGB } from '_theme/colors';
interface MenuProps {
  redirectToPath: (link: ILink) => void;
  sideToggled: boolean;
  openedMenu: string;
  link: ILink;
  conditionsSubMenu: (link: any) => void;
}
const Menu: FC<MenuProps> = ({
  openedMenu,
  sideToggled,
  link,
  conditionsSubMenu,
}) => {
  const { isActiveLink, itHasActiveChildLink } = useIsActive();
  const { toggledTextStyles, setMenuTextStyle } = useSideBarStyle({
    sideToggled,
  });

  const { t } = useTranslation();

  return (
    <Box
      key={link.menuKey}
      h={'40px'}
      display="flex"
      alignItems="center"
      pe={{ base: '1rem', md: '0' }}
      cursor="pointer"
      transition="all ease-in-out 350ms"
      onClick={() => conditionsSubMenu(link)}
      _hover={{
        bg: hexToRGB('primary', 0.1, 500),
        borderRadius: '5px',
        ps: '0',
        pe: { base: '1rem', md: '0' },
        ms: '0',
      }}
      mt={8}>
      <Box
        height="100%"
        width="8px"
        bg={
          itHasActiveChildLink(link.subItems) || isActiveLink(link.path)
            ? 'primary.500'
            : 'transparent'
        }
        borderRadius="12px"
        transition="all 300ms ease"
      />
      <Flex
        align="center"
        justifyContent={'center'}
        w="100%"
        h="100%"
        borderRadius={'5px'}
        py="0"
        ps="0"
        ms="10px"
        me={sideToggled ? '0' : '10px'}
        pe={{ base: '1rem', md: '0.5rem' }}
        bg={
          itHasActiveChildLink(link.subItems) || isActiveLink(link.path)
            ? hexToRGB('primary', 0.1)
            : 'transparent'
        }
        px={'10px'}>
        <Box as="span">
          <link.icon
            width="18px"
            height="18px"
            fill={
              itHasActiveChildLink(link.subItems) || isActiveLink(link.path)
                ? Colors.primary
                : Colors.grayScale
            }
          />
        </Box>
        <Text
          display={
            !sideToggled ? { lg: 'none' } : { base: 'none', lg: 'block' }
          }
          ms="1rem"
          {...toggledTextStyles}
          {...setMenuTextStyle(link.subItems)}>
          {t(link.label)}
        </Text>
        {sideToggled ? (
          <Box
            transition="all ease-in-out 200ms"
            transform={
              link?.subItems &&
              (itHasActiveChildLink(link?.subItems) ||
                openedMenu === link?.menuKey)
                ? 'rotate(180deg)'
                : ''
            }>
            <ArrowDown width="18px" height="18px" fill={Colors.grayScale} />
          </Box>
        ) : (
          <></>
        )}
      </Flex>
    </Box>
  );
};

export default memo(Menu);
