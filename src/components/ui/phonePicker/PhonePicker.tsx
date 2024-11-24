import React from 'react';
import { useField } from 'formik';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import './phone.styles.css';
import { TextInputProps } from '_components/formInput/FormInput';

export interface PhoneInputFieldProps extends TextInputProps {}

const PhoneInputField = ({
  name,
  label,
  required = false,
  placeholder,
}: PhoneInputFieldProps) => {
  const [field, meta, helpers] = useField(name ?? '');
  const { value } = field;
  const { setValue } = helpers;
  const isError = meta.touched && meta.error;
  const { t } = useTranslation();

  return (
    <FormControl isInvalid={!!isError}>
      {label && (
        <FormLabel>
          {t(label ?? '')}
          {required && (
            <Box as="span" color="red">
              *
            </Box>
          )}
        </FormLabel>
      )}

      <PhoneInput
        country={'us'}
        value={value}
        onChange={phone => setValue(phone)}
        countryCodeEditable={false}
        autocompleteSearch
        searchPlaceholder={'Search'}
        placeholder={t(placeholder ?? '')}
        inputStyle={{
          backgroundColor: 'white',
          color: 'black',
          border: `1px solid ${isError ? '#ff3b3b' : '#D9D9D9CC'}`,
          borderRadius: '12px',
          height: '50px',
          width: '100%',
        }}
        buttonStyle={{
          backgroundColor: 'transparent',
          border: 'none',
          padding: '5px',
        }}
        inputProps={{
          name: name,
          required: required,
          autoFocus: false,
        }}
        containerClass={'phone-input-container'}
        buttonClass={'phone-input-button'}
        dropdownClass={'phone-input-dropdown'}
      />

      {isError ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default PhoneInputField;
