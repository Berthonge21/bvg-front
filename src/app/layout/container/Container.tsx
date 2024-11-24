import { Box, Flex } from '@chakra-ui/react';
import { memo, Suspense, useEffect, useRef } from 'react';
import { RightMenuProps } from '../sidebar/types';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import RightMenu from '../../layout/right-menu';
import { APP_ROUTES } from '_app/config/routes';
import Loader from '_components/Loader/Loader';

const Container = ({ sideToggled = true, children }: RightMenuProps) => {
  const containerRef = useRef<any>(null);
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const currentLanguage = i18n.language;
  /**
   * For scroll container div
   */
  useEffect(() => {
    containerRef?.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex
      ref={containerRef}
      background={'transparent '}
      maxHeight={{ base: 'calc(100vh - 165px)', md: 'calc(100vh - 135px)' }}
      position={'relative'}
      overflowX={'hidden'}
      overflowY={'auto'}
      pb={{ base: '20px', md: '0' }}>
      <Box flex={1} maxW="100%">
        <Flex
          direction={{ base: 'column', xl: 'row' }}
          w="100%"
          maxWidth={'100vw'}
          justifyContent={'space-between'}
          h={'100%'}>
          <Box
            className={'mainContent'}
            overflowX={'hidden'}
            overflowY={'auto'}
            sx={{ '::-webkit-scrollbar': { width: '0' } }}
            width="100%"
            ps={{ base: 5, md: '20px' }}
            pe={{ base: 5, md: '33px' }}
            pb={{ base: '1rem', xl: '4rem' }}
            flex={1}
            me={{
              base: 0,
              lg:
                sideToggled &&
                (pathname === APP_ROUTES.PRIVATE.CLIENT.DASHBOARD ||
                  pathname === APP_ROUTES.PRIVATE.BACK_OFFICE.DASHBOARD)
                  ? '280px'
                  : '0',
            }}>
            <Suspense fallback={<Loader show />}>{children}</Suspense>
          </Box>
          {(pathname === APP_ROUTES.PRIVATE.CLIENT.DASHBOARD ||
            pathname === APP_ROUTES.PRIVATE.BACK_OFFICE.DASHBOARD) && (
            <Box
              borderRadius={'7px'}
              display={{ base: 'none', xl: 'block' }}
              className={'rightMenu'}
              position={'fixed'}
              right={currentLanguage !== 'ar' ? 0 : ''}
              left={currentLanguage === 'ar' ? 0 : ''}
              maxH={'calc(100vh - 165px)'}
              overflowX={'hidden'}
              overflowY={'auto'}>
              <RightMenu sideToggled={sideToggled} />
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default memo(Container);
