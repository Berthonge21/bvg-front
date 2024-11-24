import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { FC, memo, useEffect, useState } from 'react';
import useIsActive from '../hooks/useIsActive';
import { ILink } from '../types';
import ActiveMenu from './ActiveMenu';
import Menu from './Menu';
import SubMenu from './SubMenu';
import { useRouter } from 'next/navigation';

interface IRenderLinks {
  sideToggled: boolean;
  links: ILink[];
  onShowSidebar: () => void;
}
const RenderLinks: FC<IRenderLinks> = ({
  sideToggled,
  links,
  onShowSidebar,
}) => {
  //const isPrivateLink = (link: string): boolean => link.includes('/private');
  const navigate = useRouter();
  const { isActiveLink, itHasActiveChildLink } = useIsActive();
  const [openedMenu, setOpenedMenu] = useState<any>(false);
  const shouldApplySideToggled = useBreakpointValue({ base: false, md: true });
  const sidebarConditionInverse = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    if (!sideToggled) {
      setOpenedMenu(false);
    }
    if (!sidebarConditionInverse) {
      setOpenedMenu(false);
    }
  }, [sideToggled]);

  const checkModulePermission = (link: ILink): boolean => {
    if (link.key) {
    }
    return true;
  };

  const conditionsSubMenu = (link: any) => {
    if (link.subItems && openedMenu === link.menuKey) {
      setOpenedMenu('');
    } else {
      setOpenedMenu(link.menuKey);
    }
  };

  const redirectToPath = (link: ILink): void => {
    if (checkModulePermission(link)) {
      navigate.push(link.path);
    }
    if (!sidebarConditionInverse) {
      onShowSidebar();
    }
  };
  return (
    <>
      {links.map((link: ILink, index: number) => (
        <Flex
          direction="column"
          key={index + link.path}
          pe={!sideToggled ? { lg: '0px' } : { lg: '0px' }}>
          {!link.subItems && link?.path && (
            <SubMenu
              isActiveLink={isActiveLink}
              redirectToPath={redirectToPath}
              sideToggled={sideToggled}
              link={link}
            />
          )}
          {link.menuKey && link.subItems && (
            <Menu
              redirectToPath={redirectToPath}
              sideToggled={sideToggled}
              openedMenu={openedMenu}
              link={link}
              conditionsSubMenu={conditionsSubMenu}
            />
          )}
          {link.subItems &&
            (itHasActiveChildLink(link.subItems) ||
              openedMenu === link.menuKey) &&
            link.subItems.map(subLink => {
              if (shouldApplySideToggled && !sideToggled) {
                return null;
              }
              return (
                <ActiveMenu
                  subLink={subLink}
                  key={subLink.path}
                  sideToggled={sideToggled}
                  onShowSidebar={onShowSidebar}
                />
              );
            })}
        </Flex>
      ))}
    </>
  );
};
export default memo(RenderLinks);
