import React from 'react';
import { Box, chakra, Flex, useCheckbox } from '@chakra-ui/react';
import { hexToRGB } from '_theme/colors';
import { CheckIcon } from '_assets/svg';
import { MinusIcon } from '@chakra-ui/icons';

export const OtherCheckbox = (props: any) => {
  const { state, getCheckboxProps, getInputProps, htmlProps } =
    useCheckbox(props);
  return (
    <chakra.label
      cursor="pointer"
      {...htmlProps}
      display={'flex'}
      w={'fit-content'}
      className={'custom-checkBox'}>
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        borderRadius={'4px'}
        border="1px solid rgba(57, 56, 58, 0.3)"
        w={'22px'}
        h={'22px'}
        {...getCheckboxProps()}
        bg={
          state?.isDisabled
            ? hexToRGB('gray', 0.5, 500)
            : state?.isChecked || state?.isIndeterminate
              ? 'primary.500'
              : 'white'
        }
        _disabled={props?.isDisabled}>
        {state?.isChecked && <CheckIcon fill="white" />}
        {state?.isIndeterminate && <Box w="12px" h="2px" bg="white" />}
        {state?.isDisabled && !state?.isIndeterminate && <MinusIcon />}
      </Flex>
    </chakra.label>
  );
};
