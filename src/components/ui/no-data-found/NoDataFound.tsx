import { Box, Text, BoxProps, Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface NoDataFoundProps {
  title?: string;
  containerStyle?: BoxProps;
}

const NoDataFound: FC<NoDataFoundProps> = ({
  title = 'COMMON.NO_DATA_FOUND',
  containerStyle,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="1rem"
      width="100%"
      {...containerStyle}>
      <Image
        width={'35%'}
        src={'/assets/svg/no-data-found-V2.svg'}
        alt="no-data-found"
        transition={'filter 0.5s ease, opacity 0.5s ease'}
        draggable={false}
      />
      <Text fontSize="xl" fontWeight="semibold">
        {t(title)}
      </Text>
    </Box>
  );
};

export default NoDataFound;
