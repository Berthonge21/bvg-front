import {
  Box,
  Checkbox,
  CheckboxGroup,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { hexToRGB } from '_theme/colors';
import { ICheckboxGroup } from './checkBoxGroup.interface';
import { Icon } from '_components/Icon/Icon';
import { borderRadius } from './style';
import { OtherCheckbox } from '_components/checkbox/OtherCheckbox';

const CollapseCheckBox: React.FC<ICheckboxGroup> = memo(props => {
  const { checkBoxGroup, onSelectGroupElement, icon, defaultValue } = props;
  const [selectedElement, setSelectedElement] = React.useState<any>({});
  const { t } = useTranslation();

  const selectedElementsLength = Object.values(selectedElement)?.length;
  const isAllSelected =
    selectedElementsLength === checkBoxGroup.groupElements.length;
  const isNoneSelected = selectedElementsLength === 0;
  const isIndeterminate = !isAllSelected && !isNoneSelected;

  useEffect(() => {
    if (defaultValue) {
      setSelectedElement(defaultValue?.groupElements);
    }
  }, [defaultValue]);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const checked = e.target.checked;
    const newSelectedElement: any = {};
    if (checked) {
      checkBoxGroup.groupElements.forEach((elt: string) => {
        newSelectedElement[elt] = elt;
      });
    }
    setSelectedElement(newSelectedElement);
    onSelectGroupElement({
      groupName: checkBoxGroup.groupName,
      groupElements: newSelectedElement,
    });
  };

  return (
    <Menu matchWidth placement="bottom">
      {({ isOpen }) => (
        <>
          <Box pos="relative" zIndex={0}>
            <OtherCheckbox
              zIndex={500}
              size="lg"
              pos="absolute"
              top={'13px'}
              left="35px"
              variant="red"
              isChecked={isAllSelected}
              isIndeterminate={isIndeterminate}
              onChange={handleCheckboxChange}
            />
            <MenuButton
              w="100%"
              type="button"
              borderRadius={'7px'}
              border={`1px solid ${hexToRGB('gray', 0.2)}`}
              bgColor={'rgba(6, 82, 76, 0.1)'}
              p={'0 4px 0 10px'}
              minH={'49px'}
              color={'black'}
              fontSize={'14px'}
              fontWeight={500}
              {...borderRadius}>
              <HStack gap={'45px'} w="100%">
                {isOpen ? (
                  <ChevronDownIcon fontSize="2xl" cursor="pointer" />
                ) : (
                  <ChevronRightIcon fontSize="2xl" cursor="pointer" />
                )}
                <HStack gap={2} w="100%">
                  {icon && (
                    <Icon
                      displayName={icon}
                      fontSize="lg"
                      color="secondary.500"
                    />
                  )}
                  <Text fontWeight="800">
                    {t(
                      'ROLE_MANAGEMENT.CATEGORY_LIST.' +
                        checkBoxGroup.groupName.toUpperCase(),
                    )}
                  </Text>
                </HStack>
                {selectedElementsLength > 0 && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgColor="primary.500"
                    borderRadius="7px"
                    w="65px"
                    height="38px"
                    color="white">
                    <Text>
                      {selectedElementsLength ===
                      checkBoxGroup.groupElements.length
                        ? t('COMMON.ALL')
                        : selectedElementsLength}
                    </Text>
                  </Box>
                )}
              </HStack>
            </MenuButton>
          </Box>
          <CheckboxGroup value={Object.values(selectedElement)}>
            <MenuList
              minW="200px"
              px={2}
              zIndex={50}
              overflow="auto"
              maxH={'200px'}
              borderRadius="7px"
              shadow="md">
              {checkBoxGroup.groupElements.map((elt, index: number) => (
                <MenuItem
                  key={index}
                  closeOnSelect={false}
                  _hover={{ borderRadius: '5px' }}>
                  <Checkbox
                    variant="white"
                    size="lg"
                    value={elt}
                    ml={'18px'}
                    colorScheme={'primary'}
                    isChecked={!!selectedElement[elt]}
                    onChange={() => {
                      const newSelectedElement: any = { ...selectedElement };
                      if (newSelectedElement[elt]) {
                        delete newSelectedElement[elt];
                      } else {
                        newSelectedElement[elt] = elt;
                      }
                      setSelectedElement(newSelectedElement);
                      onSelectGroupElement({
                        groupName: checkBoxGroup.groupName,
                        groupElements: newSelectedElement,
                      });
                    }}>
                    {t('ROLE_MANAGEMENT.FEATURE_LIST.' + elt?.toUpperCase())}
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuList>
          </CheckboxGroup>
        </>
      )}
    </Menu>
  );
});

export default CollapseCheckBox;
