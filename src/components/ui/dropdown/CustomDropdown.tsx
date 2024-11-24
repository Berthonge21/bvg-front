import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Text,
} from '@chakra-ui/react';
import {
  FieldHookConfig,
  FormikValues,
  useField,
  useFormikContext,
} from 'formik';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { hexToRGB } from '_theme/colors';
import Dropdown from './Dropdown';
import MenuButton from '_components/menu-button';
import MenuList from '_components/menu-list';
import MenuItem from '_components/menu-item';

interface ICustomDropdown {
  list: any;
  selectedImage?: string;
  handleChange?: (...args: any[]) => void;
  arrowIcon: boolean;
  labelStyle?: any;
  setFieldValue?: any;
  label?: string;
  bindValue: any;
  bindLabel: string;
  imageValue?: any;
  disabledCondition?: boolean;
  selectPlaceholder: string;
  labelPrefix?: string;
  required?: boolean;
  isDisabled?: boolean;
  name: string;
  defaultValue?: any;
}

export const CustomDropdown = memo<ICustomDropdown>(
  ({
    name = 'name',
    setFieldValue,
    isDisabled,
    bindLabel,
    required,
    selectedImage,
    imageValue,
    selectPlaceholder,
    labelPrefix,
    disabledCondition,
    bindValue,
    label,
    labelStyle,
    arrowIcon,
    list,
    handleChange,
    defaultValue,
  }) => {
    const fieldHookConfig: FieldHookConfig<any> = {
      name,
    };
    const { t } = useTranslation();
    const [selectedLabel, setSelectedLabel] = useState('');
    const [{ onChange, ...field }, { touched, error }] = useField(name);
    const hasError = !!(touched && error);
    const formik = useFormikContext<FormikValues>();
    const _defaultValue = useMemo(
      () =>
        defaultValue
          ? list.find(
              (option: any) =>
                option[bindValue].toString().toLowerCase() ===
                defaultValue?.toString().toLowerCase(),
            )?.label
          : selectPlaceholder,
      [],
    );

    const change = (event: any) => {
      if (handleChange) {
        handleChange(event.target.value);
        setFieldValue && name && setFieldValue(name, event.target.value);
      }
      onChange(event);
    };

    const changeValue = (value: string) => {
      if (handleChange) {
        handleChange(value);
      }
      setFieldValue && name && setFieldValue(name, value[bindValue]);
      setSelectedLabel(value[bindLabel]);
    };

    useEffect(() => {
      if (defaultValue) {
        setSelectedLabel(
          list.find(
            (option: any) =>
              option[bindValue].toString().toLowerCase() ===
              defaultValue?.toString().toLowerCase(),
          )?.label,
        );
      } else {
        setSelectedLabel('');
      }
    }, [list]);

    useEffect(() => {
      if (!formik.dirty && !formik.isSubmitting) {
        setSelectedLabel('');
      }
    }, [formik.dirty, formik.isSubmitting]);
    return (
      <FormControl id={name} isInvalid={hasError} isDisabled={isDisabled}>
        <Dropdown
          arrowIcon={arrowIcon}
          labelStyle={labelStyle}
          label={label ? t(label) : ''}
          hasError={hasError}>
          <MenuButton
            borderRadius={'7px'}
            border={`1px solid ${hexToRGB('gray', 0.6, 500)}`}
            bg={'white'}
            w={'100%'}
            minH={'47px'}
            as={Button}
            isDisabled={disabledCondition}
            _disabled={{
              border: '0px',
              opacity: 0.5,
            }}
            padding={'0px'}
            onChange={change}
            {...field}
            style={{ overflow: 'hidden' }}>
            <Flex mx="10px" alignItems={'center'}>
              {!selectedLabel ? (
                <Text
                  lineHeight={'15px'}
                  fontSize={'14px'}
                  color={'gray.500'}
                  fontWeight={500}>
                  {_defaultValue ? t(_defaultValue) : selectPlaceholder}
                </Text>
              ) : (
                <Flex gap={4} alignItems={'center'} alignContent={'center'}>
                  {selectedImage && (
                    <Image w={'26px'} src={selectedImage} alt="image" />
                  )}
                  <Text
                    lineHeight={'15px'}
                    fontSize={'14px'}
                    color={`${hexToRGB('overlay', 1, 500)}`}
                    fontWeight={500}>
                    {t(
                      labelPrefix ? labelPrefix + selectedLabel : selectedLabel,
                    )}
                  </Text>
                </Flex>
              )}
            </Flex>
          </MenuButton>
          <MenuList overrideStyles={{ minW: '100%', w: '100%', maxH: '9rem' }}>
            {list &&
              list.map((item: any, index: any) => (
                <MenuItem
                  onClick={() => {
                    changeValue(item);
                  }}
                  borderColor={hexToRGB('secondary', 0.1)}
                  key={`biller${index}_${item[bindValue]}`}
                  value={item[bindValue]}
                  _hover={{ bgColor: `${hexToRGB('lightGray', 0.3, 600)}` }}
                  height={'40px'}
                  borderRadius={'7px'}
                  minW="100%"
                  color={'black'}
                  fontSize={'fs-14'}
                  fontWeight={500}>
                  {imageValue && (
                    <Image w={'26px'} src={item[imageValue]} alt="image" />
                  )}
                  {t(
                    labelPrefix
                      ? labelPrefix + item[bindLabel]
                      : item[bindLabel],
                  )}
                </MenuItem>
              ))}
          </MenuList>
        </Dropdown>
        {hasError && <FormErrorMessage>{t(`${error}`)}</FormErrorMessage>}
      </FormControl>
    );
  },
);
