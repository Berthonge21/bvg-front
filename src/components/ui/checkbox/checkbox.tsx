import { ChangeEvent, FC } from 'react';
import { CheckboxProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import { FieldHookConfig, useField } from 'formik';

export interface CheckboxBaseProps extends CheckboxProps {
  label?: string;
  helpMessage?: string;
  onChangeFunc?: any;
  isDisabled?: boolean;
  validate?: any;
  name?: string;
  withUnderline?: boolean;
}
export const CustomCheckbox: FC<CheckboxBaseProps> = ({
  name = '',
  label,
  isDisabled,
  onChangeFunc,
  validate,
  isChecked = false,
  withUnderline = false,
  ...rest
}) => {
  const fieldHookConfig: FieldHookConfig<any> = {
    name,
    validate,
  };
  const [{ onChange, ...field }, { touched, error }] =
    useField(fieldHookConfig);
  const hasError = !!(touched && error);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChangeFunc) {
      onChangeFunc(event);
    }
    onChange(event);
  };
  return (
    <FormControl id={name} isInvalid={hasError} isDisabled={isDisabled}>
      <Checkbox
        {...field}
        {...rest}
        size={'lg'}
        onChange={handleChange}
        isChecked={isChecked}
        isDisabled={isDisabled}
        colorScheme={'primary'}
        width={'30px'}
        height={'30px'}>
        {label && (
          <Text
            textDecoration={withUnderline ? 'underline' : 'none'}
            fontSize={'13px'}
            fontWeight={'bold'}
            color={'black.500'}>
            {label}
          </Text>
        )}
      </Checkbox>
      {hasError && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
