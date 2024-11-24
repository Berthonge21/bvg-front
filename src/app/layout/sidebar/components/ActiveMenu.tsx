import { Box, Link, Text, useBreakpointValue } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import useSideBarStyle from '../hooks/useSideBarStyle';
import { SimpleSubItem } from '../types';
import { Dot } from '_assets/svg';
import { useRouter } from 'next/navigation';
interface ActiveMenuProps {
  subLink: SimpleSubItem;
  sideToggled: boolean;
  onShowSidebar: any;
}
const ActiveMenu: FC<ActiveMenuProps> = ({
  subLink,
  sideToggled,
  onShowSidebar,
}) => {
  const { t } = useTranslation();
  const navigate = useRouter();
  const {
    toggledTextStyles,
    linkStyle,
    setMenuItemTextStyle,
    setMenuItemPointStyle,
  } = useSideBarStyle({ sideToggled });
  const sidebarConditionInverse = useBreakpointValue({ base: false, lg: true });

  return (
    <Link
      key={subLink.path}
      {...linkStyle}
      ps={'15px'}
      p={'0'}
      onClick={() => {
        navigate.push(subLink.path);
        if (!sidebarConditionInverse) {
          onShowSidebar();
        }
      }}
      h={'auto'}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        borderRadius="10px"
        width="100%"
        p="5px 10px">
        <Text mt={'-2px'} ms={'4px'} mr={'10px'}>
          <Dot fill={setMenuItemPointStyle(subLink.path)} width={'9px'} />
        </Text>
        <Text {...toggledTextStyles} {...setMenuItemTextStyle(subLink.path)}>
          {t(subLink.label)}
        </Text>
      </Box>
    </Link>
  );
};
export default memo(ActiveMenu);
