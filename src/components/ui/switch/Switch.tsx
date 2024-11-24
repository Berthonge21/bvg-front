import React from 'react';
import { FieldHookConfig, useField } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch,
  Text,
  SwitchProps,
} from '@chakra-ui/react';

export interface SwitchInputProps
  extends Omit<SwitchProps, 'form' | 'slot' | 'style' | 'title' | 'pattern'> {
  name: string;
  labelLeft?: string;
  labelRight?: string;
  isDisabled?: boolean;
  localErrorMsg?: string;
  validate?: any;
}

const FormSwitch = ({
  name,
  labelLeft,
  labelRight,
  isDisabled = false,
  localErrorMsg = '',
  validate,
  ...rest
}: SwitchInputProps) => {
  const { t } = useTranslation();

  const fieldHookConfig: FieldHookConfig<any> = {
    name,
    validate,
    type: 'switch',
  };
  const [field, { touched, error }] = useField(fieldHookConfig);
  const isError = touched && error;

  return (
    <FormControl id={name} isInvalid={!!isError}>
      <Box display="flex" alignItems="center" gap={'10px'}>
        {labelLeft && (
          <FormLabel display="flex" alignItems="center" mb="0" color={'black'}>
            {t(labelLeft)}
          </FormLabel>
        )}
        <Switch
          {...field}
          aria-label={'switch'}
          onChange={e => {
            field?.onChange(e);
          }}
          colorScheme={'primary'}
          isChecked={field.value}
          size={'lg'}
          isDisabled={isDisabled}
          {...rest}
        />
        {labelRight && (
          <FormLabel display="flex" alignItems="center" mb="0" color={'black'}>
            {t(labelRight)}
          </FormLabel>
        )}
      </Box>

      {isError && <FormErrorMessage>{error}</FormErrorMessage>}
      {localErrorMsg && (
        <Text color="gray.500" fontSize="sm">
          {t(localErrorMsg)}
        </Text>
      )}
    </FormControl>
  );
};

export default FormSwitch;
