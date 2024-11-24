import { memo, useEffect, useState } from 'react';
import { hexToRGB } from '_theme/colors';
import {
  Button,
  Flex,
  Image,
  FormControl,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import Dropdown from '../Dropdown';
import { FieldHookConfig, getIn, useField } from 'formik';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { FullDropdownProps } from '../types/full-dropdown.type';
import MenuButton from '_components/menu-button';
import MenuList from '_components/menu-list';
import MenuItem from '_components/menu-item';

export const FullDropdown = memo<FullDropdownProps<any>>(
  ({
    width,
    required,
    name,
    iconMarginLeft,
    listItems,
    selectedValue,
    label,
    bindItemValue,
    bindItemLabel,
    placeholder = 'Enter your input',
    referenceValue,
    setFieldValue,
    arrowIcon = true,
    labelStyle,
    isDisabled = false,
    onChangeFunc,
    separationMultiItem = ' - ',
    imageHeader,
    imageLabel,
    menuButtonStyle = {},
  }) => {
    const { t } = useTranslation();
    const [currentSelected, setCurrentSelected] = useState(selectedValue);
    const [hasError, setHasError] = useState(false);

    const fieldHookConfig: FieldHookConfig<any> = {
      name,
    };
    const [{ onChange, ...field }, { touched, error }] =
      useField(fieldHookConfig);
    useEffect(() => {
      setHasError(!!(touched && error));
    }, [error, touched]);
    useEffect(() => {
      if (selectedValue) {
        setHasError(false);
        const itemSelected = listItems.find(
          (item: any) =>
            getIn(item, referenceValue! ?? bindItemValue!) === selectedValue,
        );
        if (itemSelected) {
          if (typeof bindItemLabel === 'string') {
            setCurrentSelected(itemSelected);
          } else {
            setCurrentSelected(getLabelFromList(itemSelected));
          }
        }
      }
    }, [selectedValue]);

    const getBindLabel = (item: any) => {
      if (typeof bindItemLabel === 'string') {
        return getIn(item, bindItemLabel!);
      } else if (bindItemLabel?.length) {
        return getLabelFromList(item);
      }
    };

    const getLabelFromList = (item: any): string => {
      if (typeof item === 'string') {
        return item;
      }

      let result = '';
      for (let i = 0; i < bindItemLabel!.length; i++) {
        result += `${getIn(item, bindItemLabel![i])}${separationMultiItem}`;
      }
      return result.replace(/ -\s*$/, '');
    };

    return (
      <FormControl id={name} isInvalid={hasError} isDisabled={isDisabled}>
        <Dropdown
          iconMarginLeft={iconMarginLeft}
          width={width}
          required={required}
          arrowIcon={arrowIcon}
          label={t(label || '')}
          labelStyle={labelStyle}
          hasError={hasError}>
          <MenuButton
            borderRadius={'12px'}
            border={`1px solid ${hexToRGB('lightGray', 0.5)}`}
            bg={isDisabled ? '#e7eaEa' : 'white'}
            w={width ? width : '100%'}
            minH={'50px'}
            fontSize={'14px'}
            fontWeight={500}
            as={Button}
            padding={'0px'}
            isDisabled={isDisabled}
            {...menuButtonStyle}>
            <Flex mx="10px" alignItems={'center'}>
              <Flex
                gap={4}
                alignItems={'center'}
                alignContent={'center'}
                maxW={'100%'}>
                {imageHeader && (
                  <Image w={'26px'} src={imageHeader} alt="image" />
                )}
                <Text
                  fontSize={'14px'}
                  fontWeight={500}
                  color={isDisabled ? 'black' : 'overlay.500'}
                  width={'100%'}
                  overflow={'hidden'}
                  pe={'20px'}
                  textOverflow={'ellipsis'}>
                  {t(
                    selectedValue
                      ? typeof currentSelected === 'string'
                        ? currentSelected
                        : getBindLabel(currentSelected)
                      : placeholder,
                  )}
                </Text>
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList
            overrideStyles={{
              minW: width ? width : '100%',
              w: width ? width : '100%',
              maxH: '9rem',
            }}>
            {listItems?.length > 0 ? (
              listItems.map((item: any, index: number) => (
                <MenuItem
                  onClick={() => {
                    setFieldValue(
                      name,
                      typeof item === 'string'
                        ? item
                        : getIn(item, referenceValue! ?? bindItemValue!),
                    );
                    onChangeFunc?.(item);
                  }}
                  borderColor={hexToRGB('secondary', 0.1)}
                  key={`index-${index}`}
                  value={''}
                  _hover={{ bgColor: `${hexToRGB('lightGray', 0.3, 600)}` }}
                  height={'40px'}
                  borderRadius={'7px'}
                  minW="100%"
                  color={'black'}
                  fontSize={'14px'}
                  fontWeight={500}>
                  {item.imageValue && (
                    <Image w={'26px'} src={item.imageValue} alt="image" />
                  )}
                  {typeof item === 'string' ? t(item) : t(getBindLabel(item))}
                </MenuItem>
              ))
            ) : (
              <MenuItem
                isDisabled
                height={'40px'}
                color={'gray.500'}
                fontSize={'14px'}
                fontWeight={500}>
                {t("Pas d'options")}
              </MenuItem>
            )}
          </MenuList>
        </Dropdown>
        {hasError && <FormErrorMessage>{t(`${error}`)}</FormErrorMessage>}
      </FormControl>
    );
  },
);
