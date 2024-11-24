import { memo, useEffect } from 'react';
import {
  Box,
  Divider,
  Flex,
  MenuItem,
  MenuList,
  Text,
  Image,
  MenuButton,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { ListMenu } from '_assets/svg';
import i18n from 'i18next';
import { TYPES } from '_store/src';
import FlagImageComponent from '_components/flag/FlagImageComponent';
import { FlagImagesKeys } from '_assets/images/flag';
import { Icon } from '_components/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { AuthModule, SchoolModule } from '_store/src/modules';
import { Dropdown } from '_components/dropdown';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import { Formik } from 'formik';

interface Props {
  onShowSidebar?: () => void;
  showSidebarButton?: boolean;
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);

  const switchLanguage = (code: string) => {
    i18n
      .changeLanguage(code)
      .then(() => {})
      .catch(error => {
        console.error(error);
      });
  };

  const getSchoolId = () => {
    if (currentUser?.schools && Array.isArray(currentUser.schools)) {
      return currentUser.schools[0]?.id;
    } else if (currentUser?.school) {
      return currentUser.school.id;
    }
    return null;
  };

  useEffect(() => {
    dispatch(SchoolModule.actions.setSchoolId(getSchoolId()));
  }, []);

  const handleSchoolChange = (selectedSchoolId: string) => {
    dispatch(SchoolModule.actions.setSchoolId(selectedSchoolId));
  };

  const schoolList =
    currentUser?.schools || [currentUser?.school].filter(Boolean);

  return (
    <Flex
      as="header"
      bg={'white'}
      p={4}
      justify={'space-between'}
      alignItems="center"
      boxShadow={'0 0 35px black.50'}
      position={'relative'}
      h={{ base: '100px', md: 'auto' }}>
      {showSidebarButton && (
        <Box
          ms={'2px'}
          display="flex"
          alignItems="center"
          onClick={onShowSidebar}
          cursor="pointer">
          <ListMenu width={25} height={25} />
        </Box>
      )}
      <Box ms={5} display="flex" alignItems="center">
        <Flex
          alignItems={'center'}
          justifyContent={'flex-end'}
          gap={5}
          width={'100%'}>
          <Box width={200}>
            <Formik initialValues={{ school: '' }} onSubmit={() => {}}>
              {({ setFieldValue }) => (
                <>
                  {schoolList?.length >= 1 && (
                    <FullDropdown
                      name={'school'}
                      listItems={schoolList}
                      selectedValue={getSchoolId()}
                      bindItemValue={'id'}
                      bindItemLabel={'name'}
                      setFieldValue={setFieldValue}
                      onChangeFunc={selectedItem =>
                        handleSchoolChange(selectedItem.id)
                      }
                    />
                  )}
                </>
              )}
            </Formik>
          </Box>
          {schoolList?.length >= 1 && (
            <Divider
              borderColor={'lightgray.500'}
              orientation="vertical"
              width={'0.62px'}
              height={'25px'}
            />
          )}

          <Dropdown>
            <MenuButton>
              <Flex gap={2} alignItems={'center'}>
                <FlagImageComponent
                  border={50}
                  countryImage={
                    i18n?.language.toUpperCase()?.toString() as FlagImagesKeys
                  }
                />
                <Text color={'black'}>
                  {i18n.language === 'en' ? 'English' : 'Français'}
                </Text>
                <Icon
                  displayName={'chevron-down'}
                  px="6px"
                  w="18px"
                  color={'primary.900'}
                  overflow="visible"
                />
              </Flex>
            </MenuButton>
            <MenuList>
              {TYPES.CONSTANTS.LANGUAGES.LANGUAGES_OPTIONS?.map(language => (
                <MenuItem
                  key={language.code}
                  onClick={() => switchLanguage(language.code)}>
                  {language.label}
                </MenuItem>
              ))}
            </MenuList>
          </Dropdown>

          <Divider
            borderColor={'lightgray.500'}
            orientation="vertical"
            width={'0.62px'}
            height={'25px'}
          />
          <BellIcon width={'18px'} height={'18px'} />
          <Divider
            borderColor={'lightgray.500'}
            orientation="vertical"
            width={'0.62px'}
            height={'25px'}
          />
          <Flex alignItems={'center'} justifyContent={'center'}>
            <Image
              draggable="false"
              src={'https://avatar.iran.liara.run/public'}
              boxSize={'30px'}
              borderRadius={'7px'}
              fit="cover"
              objectPosition="center"
              alt="img-url"
            />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default memo(Header);
