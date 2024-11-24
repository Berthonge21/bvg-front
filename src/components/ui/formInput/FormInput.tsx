import React, { useState } from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HTMLChakraProps,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { Colors } from '_theme/variables';
import { Eye, EyeOff } from '_assets/svg';
import { UTILS } from '_store/src';

export interface TextInputProps extends HTMLChakraProps<'input'> {
  name: string;
  label?: string;
  required?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  localErrorMsg?: string;
  useFullAmountMask?: boolean;
  rightAccessory?: JSX.Element;
  leftAccessory?: JSX.Element;
  type?: string;
  accept?: string;
  validate?: any;
  customRadius?: number;
  height?: string | number;
  onChangeFunction?: any;
}

const FormTextInput = ({
  name,
  label,
  type = 'text',
  placeholder,
  localErrorMsg = '',
  required,
  isReadOnly = false,
  isDisabled = false,
  rightAccessory,
  leftAccessory,
  customRadius,
  accept,
  height,
  validate,
  value,
  onChangeFunction,
  useFullAmountMask,
  onBlur,
  ...rest
}: TextInputProps) => {
  const { t } = useTranslation();

  const fieldHookConfig = {
    name,
    validate,
  };
  const [field, { touched, error }] = useField(fieldHookConfig);
  const isError = isReadOnly ? !!error : !!(touched && error);
  const isPassword = type === 'password';
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const [mask, setMask] = useState(
    useFullAmountMask ? '' : UTILS.FORMAT_INPUT_MASK,
  );

  const getNewMask = (valueFixed: string) => {
    let firstPart = `${'*'.repeat(valueFixed?.length - 4 || 1)}`;
    firstPart = firstPart
      .replace(/(.{3})/g, '$1 ') // this code part is to add tha space after every 3 characters
      .split('') // this line of code and the next 2 lines are for reversing the string because we want the mask to be * *** not *** *
      .reverse()
      .join('');
    return `${firstPart}.***`; // this line is to add the fractions after the .
  };
  return (
    <FormControl id={name} isInvalid={isError}>
      {label && (
        <FormLabel color={'black'} display={'flex'} gap={'4px'}>
          {t(label)}
          {required && <Text color={'red'}> * </Text>}
        </FormLabel>
      )}

      {onChangeFunction && type === 'amount' ? (
        <InputGroup>
          <Input
            {...rest}
            {...field}
            type={type === 'amount' ? 'number' : type}
            onBlur={e => {
              if (useFullAmountMask && type === 'amount') {
                const amountValue = e.target.value
                  ? +e.target.value.replace(/ /g, '')
                  : 0;
                const valueFixed = amountValue.toFixed(3);
                const newMask = getNewMask(valueFixed);
                if (newMask !== mask) {
                  setMask(newMask);
                }
                field.onBlur(e);
                onBlur?.(e);
              } else {
                field.onBlur(e);
                onBlur?.(e);
              }
            }}
            value={value ?? field?.value}
            placeholder={t(placeholder ?? '')}
            borderRadius={customRadius ?? '12px'}
            onChange={(e: never) => {
              onChangeFunction?.(e);
            }}
            size={'lg'}
            backgroundColor={'transparent'}
            color={'black'}
            variant={'outline'}
            bg={isDisabled ? '#e7eaEa' : 'white'}
            isReadOnly={isReadOnly}
            isDisabled={isDisabled}
            height={height ?? '50px'}
            autoCapitalize="none"
            accept={accept}
          />
          <InputRightElement
            mt={'5px'}
            pr={'30px'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Text> {UTILS.AMOUNT_DEFAULT_CURRENCY} </Text>
          </InputRightElement>
        </InputGroup>
      ) : (
        <InputGroup>
          {leftAccessory && (
            <InputLeftElement mt={'5px'} pl={'10px'}>
              {leftAccessory}
            </InputLeftElement>
          )}
          <Input
            {...rest}
            {...field}
            type={isPassword && secureTextEntry ? 'password' : 'text'}
            onBlur={e => {
              field.onBlur(e);
              onBlur?.(e);
            }}
            value={value ?? field?.value}
            placeholder={t(placeholder ?? '')}
            borderRadius={customRadius ?? '12px'}
            size={'lg'}
            backgroundColor={'transparent'}
            color={'black'}
            variant={'outline'}
            bg={isDisabled ? '#e7eaEa' : 'white'}
            isReadOnly={isReadOnly}
            isDisabled={isDisabled}
            height={height ?? '50px'}
            autoCapitalize="none"
            accept={accept}
          />
          {isPassword ? (
            <InputRightElement
              mt={'5px'}
              pr={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              onClick={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? (
                <EyeOff width={18} height={18} fill={Colors.grayScale} />
              ) : (
                <Eye width={18} height={18} fill={Colors.grayScale} />
              )}
            </InputRightElement>
          ) : (
            rightAccessory && (
              <InputRightElement
                mt={'5px'}
                pr={'15px'}
                alignItems={'center'}
                justifyContent={'center'}>
                {rightAccessory}
              </InputRightElement>
            )
          )}
        </InputGroup>
      )}

      {isError && <FormErrorMessage>{error}</FormErrorMessage>}
      {localErrorMsg && (
        <FormHelperText p={1}>{t(localErrorMsg)}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormTextInput;
