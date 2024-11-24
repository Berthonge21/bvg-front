import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import FormInput from '_components/formInput/FormInput';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import { TYPES } from '_store/src';
import React, { useState } from 'react';
import { cardStyle, formBoxStyle } from '_theme/cardStyle';
import { useTranslation } from 'react-i18next';
import { FormikValues } from 'formik';

const StaffPersonalInfo = ({
  setFieldValue,
  values,
}: {
  setFieldValue: any;
  values: FormikValues;
}) => {
  const { t } = useTranslation();
  const [selectedCinType, setSelectedCinType] = useState<string>('CIN');
  return (
    <Box {...cardStyle}>
      <Box {...formBoxStyle}>
        <Text variant={'panel-title'}>{t('STUDENT.PERSONAL_INFORMATION')}</Text>
        <Text>{JSON.stringify(values)}</Text>
        <Box mt={'30px'}>
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={4}
            width={'100%'}
            alignItems="center">
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <VStack spacing={4} align="stretch" width={'100%'}>
                <FormInput
                  required
                  name={'lastName'}
                  label={'STUDENT.LAST_NAME'}
                  placeholder={'STUDENT.LAST_NAME'}
                  value={values?.lastName}
                />
                <FullDropdown
                  required
                  name={'sex'}
                  label={'STUDENT.SEX'}
                  listItems={TYPES.CONSTANTS.SEX_TYPE.SEX_TYPE}
                  bindItemLabel={'label'}
                  bindItemValue={'value'}
                  placeholder={'STUDENT.SEX'}
                  setFieldValue={setFieldValue}
                  selectedValue={values?.sex}
                />
                <FormInput
                  type={'number'}
                  name={'phone2'}
                  label={'STUDENT.PHONE2'}
                  placeholder={'STUDENT.PHONE2'}
                />
              </VStack>
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <VStack spacing={4} align="stretch" width={'100%'}>
                <FormInput
                  required
                  name={'firstName'}
                  label={'STUDENT.FIRST_NAME'}
                  placeholder={'STUDENT.FIRST_NAME'}
                  value={values?.firstName}
                />
                <FormInput
                  required
                  name={'address'}
                  label={'STUDENT.ADDRESS'}
                  placeholder={'STUDENT.ADDRESS'}
                  value={values?.address}
                />

                <FullDropdown
                  required
                  name={'cinType'}
                  label={'STAFF.CIN_TYPE.TITLE'}
                  listItems={TYPES.CONSTANTS.COMMON.cinType}
                  bindItemLabel={'label'}
                  bindItemValue={'value'}
                  placeholder={'STAFF.CIN_TYPE.TITLE'}
                  setFieldValue={setFieldValue}
                  selectedValue={values?.cinType}
                  onChangeFunc={elt => {
                    setSelectedCinType(elt?.value);
                  }}
                />
              </VStack>
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <VStack spacing={4} align="stretch" width={'100%'}>
                <FormInput
                  required
                  name={'email'}
                  label={'STUDENT.EMAIL'}
                  placeholder={'STUDENT.EMAIL'}
                  value={values?.email}
                />
                <FormInput
                  required
                  name={'phone1'}
                  type={'number'}
                  label={'STUDENT.PHONE'}
                  placeholder={'STUDENT.PHONE'}
                  value={values?.phone1}
                />
                <FormInput
                  required
                  name={'cinNumber'}
                  type={selectedCinType === 'CIN' ? 'number' : 'text'}
                  label={
                    selectedCinType === 'CIN'
                      ? 'STAFF.CIN_NUMBER'
                      : 'STAFF.PASSPORT_NUMBER'
                  }
                  placeholder={
                    selectedCinType === 'CIN'
                      ? 'STAFF.CIN_NUMBER'
                      : 'STAFF.PASSPORT_NUMBER'
                  }
                />
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default StaffPersonalInfo;
