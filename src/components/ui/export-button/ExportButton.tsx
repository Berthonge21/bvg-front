import { Flex, GridItem } from '@chakra-ui/react';
import MenuList from '../menu-list';
// import {
//   addbuttonStyles,
//   iconAdd,
// } from '../header-list-page/headerListPageStyle';
import { Box, Grid, Image } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import MenuButton from '../menu-button';
import { Button } from '@chakra-ui/react';
import Dropdown from '../dropdown/Dropdown';
import { UserIcon } from '_assets/svg';

interface IExportButtonProps {
  exportCallback?: (type: string) => void;
  filesList?: string[];
}
const ExportButton = memo<IExportButtonProps>(({ exportCallback }) => {
  const { t } = useTranslation();
  return (
    <Flex justifyContent={'flex-end'}>
      <Box bg={'primary.500'} maxWidth="140px">
        <Dropdown>
          <MenuButton
            as={Button}
            leftIcon={<UserIcon width={'18px'} height={'18px'} />}
            colorScheme="primary.500">
            {t('COMMON.EXPORT')}
          </MenuButton>
          <MenuList>
            <Box>
              <Grid templateColumns="repeat(3,1fr)" gap={6} p="14px" mb="16px">
                <GridItem
                  onClick={() => {
                    exportCallback?.('pdf');
                  }}
                  cursor="pointer"
                  colSpan={1}
                  h="100%">
                  <Image src={'/assets/images/flag/FR.png'} alt="pdf-image" />
                </GridItem>
                <GridItem
                  onClick={() => {
                    exportCallback?.('xls');
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
      </Box>
    </Flex>
  );
});
export default ExportButton;
