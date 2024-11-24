import { BadgeProps, Badge, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { hexToRGB } from '_theme/colors';
import { TYPES } from '_store/src';
import { useTranslation } from 'react-i18next';

interface Props extends BadgeProps {
  status?: string;
  withText?: boolean;
  children?: React.ReactNode;
}
const CustomBadge: FC<Props> = ({ children, status, withText, ...props }) => {
  const { t } = useTranslation();
  return (
    <Badge
      variant={'solid'}
      width={'100%'}
      size={'lg'}
      borderRadius={'7px'}
      p={2}
      color={
        status === TYPES.ENUMS.PAYMENT_STATUS.PaymentStatus.PAID
          ? 'green'
          : status === TYPES.ENUMS.PAYMENT_STATUS.PaymentStatus.NO_PAID
            ? 'red.500'
            : 'secondary.500'
      }
      bgColor={
        status === TYPES.ENUMS.PAYMENT_STATUS.PaymentStatus.PAID
          ? 'badgeGreen.500'
          : status === TYPES.ENUMS.PAYMENT_STATUS.PaymentStatus.NO_PAID
            ? hexToRGB('red', 0.2)
            : 'badgeYellow.500'
      }>
      {withText && (
        <Text
          textAlign={'center'}
          fontSize={'14px'}
          fontWeight={'bold'}
          textTransform={'capitalize'}>
          {status === TYPES.ENUMS.PAYMENT_STATUS.PaymentStatus.PAID
            ? t('COMMON.PAYMENT_STATUS.PAID')
            : status === TYPES.ENUMS.PAYMENT_STATUS.PaymentStatus.NO_PAID
              ? t('COMMON.PAYMENT_STATUS.NO_PAID')
              : t('COMMON.PAYMENT_STATUS.INSTALLMENT_PAID')}
        </Text>
      )}
      {children}
    </Badge>
  );
};

export default CustomBadge;
