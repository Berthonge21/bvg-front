import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Box, Flex, Grid, GridItem, Icon, Image, Text } from '@chakra-ui/react';
import Dropdown from './Dropdown';
import { useTranslation } from 'react-i18next';
import MenuList from '_components/menu-list';
import MenuButton from '_components/menu-button';

interface ExportFileDropdownProps {
  download: Dispatch<SetStateAction<string>> | ((param: string) => void);
}

const ExportFileDropdown: FunctionComponent<ExportFileDropdownProps> = ({
  download,
}) => {
  const { t } = useTranslation();
  return (
    <Dropdown>
      <MenuButton>
        <Flex
          cursor={'pointer'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius="7px"
          p="10px"
          bg="primary.500">
          <Icon fontSize={'25px'} displayName="export" color={'white'} me={5} />
          <Text fontSize={'fs-14'} color={'white'}>
            {t('COMMON.EXPORT')}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <Box>
          <Grid templateColumns="repeat(3,1fr)" gap={6} p="14px" mb="16px">
            <GridItem
              onClick={() => {
                download('pdf');
              }}
              cursor="pointer"
              colSpan={1}
              h="100%">
              <Image src={'/assets/images/flag/FR.png'} alt="pdf-image" />
            </GridItem>
            <GridItem
              onClick={() => {
                download('xls');
              }}
              colSpan={1}
              h="100%"
              cursor="pointer">
              <Image src={'/assets/images/flag/EN.png'} alt="xls-img" />
            </GridItem>
          </Grid>
        </Box>
      </MenuList>
    </Dropdown>
  );
};

export default ExportFileDropdown;
