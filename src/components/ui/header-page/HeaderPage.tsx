import { Box, Flex, Text } from '@chakra-ui/react';
import React, { FunctionComponent, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  addbuttonStyles,
  iconAdd,
} from '_components/header-page/headerPage.styles';
import { AddIcon } from '@chakra-ui/icons';
import { ReloadIcon } from '_assets/svg';
import CustomTooltip from '_components/CustomTooltip/CustomTooltip';
import { hexToRGB } from '_theme/colors';
import Button from '_components/button/Button';

type HeaderPagerProps = {
  redirectToCreate?: () => void;
  pageTitle?: string;
  legendList?: { title: string; color: string }[];
  addTitle?: string;
  hasPermissionToCreate?: boolean;
  children?: ReactNode;
  showRefreshIcon?: boolean;
  refreshCallback?: () => void;
  withFilterIcon?: boolean;
};

export const HeaderPage: FunctionComponent<HeaderPagerProps> = memo(
  ({
    redirectToCreate,
    hasPermissionToCreate = true,
    children,
    withFilterIcon,
    showRefreshIcon,
    refreshCallback,
    pageTitle,
  }) => {
    const { t } = useTranslation();
    return (
      <Box position={'relative'} zIndex={1}>
        <Flex
          alignItems={'flex-end'}
          justifyContent={'space-between'}
          width={'100%'}>
          <Text fontSize={'18px'} fontWeight={'bold'}>
            {t(pageTitle ?? '')}
          </Text>
          <Box display={'flex'} flexDirection={'row'} gap={'10px'}>
            <Flex
              gap={'3'}
              flexDirection={'row-reverse'}
              alignItems={'center'}
              justifyContent={'center'}
              mr={withFilterIcon ? '55px' : '0'}>
              {hasPermissionToCreate && (
                <CustomTooltip label={t('COMMON.ADD')} aria-label="Add tooltip">
                  <Button
                    variant={'primary'}
                    boxSize={'45px'}
                    withGradient
                    alignItems={'center'}
                    justifyContent={'center'}
                    onClick={redirectToCreate}>
                    <AddIcon />
                  </Button>
                </CustomTooltip>
              )}
              {showRefreshIcon && (
                <CustomTooltip
                  label={t('COMMON.REFRESH')}
                  aria-label="Refresh tooltip">
                  <Button
                    variant={'success'}
                    boxSize={'45px'}
                    withGradient
                    alignItems={'center'}
                    justifyContent={'center'}
                    onClick={refreshCallback}>
                    <ReloadIcon width={'45px'} height={20} />
                  </Button>
                </CustomTooltip>
              )}
            </Flex>
          </Box>
        </Flex>
        {children}
      </Box>
    );
  },
);
