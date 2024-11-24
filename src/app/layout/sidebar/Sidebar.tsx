import { Box, Flex, LinkBox, Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import RenderLinks from './components/RenderLinks';
import useSideBarStyle from './hooks/useSideBarStyle';
import { adminMenu, clientMenu } from './sideBarRoutes';
import { ILink, SideBarProps } from './types';
import { BVGV2Logo, LogoIcon, LogOut } from '_assets/svg';
import { useRouter } from 'next/navigation';
import { AuthModule } from '_store/src/modules';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '_theme/variables';
import { useTranslation } from 'react-i18next';
import { clearPersistedStorage } from '_utils/clear.store.utils';
import { APP_ROUTES } from '_app/config/routes';
import usePermission from '_app/hooks/usePermission';

const SideBar = ({ sideToggled, onShowSidebar }: SideBarProps) => {
  const { toggledSideBarStyle, toggledTextStyles } = useSideBarStyle({
    sideToggled,
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const { hasModuleAccess, hasFeatureAccess } = usePermission();

  const menu = currentUser?.roleType === 'ADMIN' ? adminMenu : clientMenu;

  const handleLogout = () => {
    dispatch(AuthModule.actions.authLogoutRequestAction());
    clearPersistedStorage();
    navigate.push(APP_ROUTES.PUBLIC.HOME);
  };

  return (
    <Box {...toggledSideBarStyle} className="sidebar">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={onShowSidebar}
        mt={sideToggled ? 0 : 30}
        cursor="pointer">
        {sideToggled ? <BVGV2Logo width={150} height={150} /> : <LogoIcon />}
      </Box>
      <VStack
        spacing={0}
        align="stretch"
        height="65%"
        overflow="auto"
        sx={{ '::-webkit-scrollbar': { width: '0' } }}>
        <RenderLinks
          links={
            menu?.filter((menu: ILink) => {
              if (currentUser?.roleType !== 'ADMIN') {
                menu.subItems = menu.subItems?.filter(subItem => {
                  return (
                    !subItem?.permissionSubLink ||
                    hasFeatureAccess(menu.menuKey!, subItem.permissionSubLink)
                  );
                });
                return hasModuleAccess(menu.menuKey ?? '') || !menu.menuKey;
              }
              return true;
            }) || []
          }
          sideToggled={sideToggled}
          onShowSidebar={onShowSidebar}
        />
      </VStack>
      <LinkBox
        style={{
          position: 'relative',
          height: '40px',
          marginTop: '10px',
          gap: '10px',
          padding: '14px',
        }}
        cursor="pointer"
        onClick={handleLogout}>
        <Flex
          align="center"
          justifyContent="center"
          width="100%"
          height="100%"
          px="10px">
          <Box as="span">
            <LogOut width="18px" height="18px" fill={Colors.grayScale} />
          </Box>
          <Text
            display={
              sideToggled ? { base: 'none', lg: 'block' } : { lg: 'none' }
            }
            {...toggledTextStyles}
            ms="1rem">
            {t('SIDE_BAR.LOG_OUT')}
          </Text>
        </Flex>
      </LinkBox>
    </Box>
  );
};

export default memo(SideBar);
