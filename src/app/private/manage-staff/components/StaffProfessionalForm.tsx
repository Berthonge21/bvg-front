import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import FormInput from '_components/formInput/FormInput';
import { cardStyle, formBoxStyle } from '_theme/cardStyle';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormikValues } from 'formik';
import { UTILS, TYPES } from '_store/src';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import dayjs from 'dayjs';
import FullDatePicker from '_components/date-picker/FullDatePicker';

const StaffProfessionalForm = ({
  type,
  setFieldValue,
  values,
}: {
  type: string;
  setFieldValue: any;
  values: FormikValues;
}) => {
  const { t } = useTranslation();

  const calculateContractDate = useCallback(
    (period: string, nbePeriod: string, startDate: string) => {
      if (!nbePeriod || !period || !startDate) return;
      const nbePeriodNumber = parseInt(nbePeriod, 10);
      const monthsToAdd = UTILS.getPeriodInMonths(nbePeriodNumber, period);
      const start = dayjs(startDate);
      const endDate = start.add(monthsToAdd, 'month');
      setFieldValue('endDate', endDate.toDate());
    },
    [setFieldValue],
  );

  useEffect(() => {
    if (
      values.startDate &&
      values.contractPeriodicity &&
      values.contractDuration
    ) {
      calculateContractDate(
        values.contractPeriodicity,
        values.contractDuration,
        values.startDate,
      );
    }
  }, [
    values.contractPeriodicity,
    values.contractDuration,
    values.startDate,
    calculateContractDate,
  ]);

  return (
    <Box {...cardStyle}>
      <Box {...formBoxStyle}>
        <Text variant={'panel-title'}>
          {t('STUDENT.PROFESSIONAL_INFORMATION')}
        </Text>
        <Box mt={'30px'}>
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={4}
            width={'100%'}
            alignItems="center">
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <VStack spacing={4} align="stretch" width={'100%'}>
                {type === 'ADMIN' && (
                  <FormInput
                    name={'staffPost'}
                    label={'STAFF.FUNCTION'}
                    placeholder={'STAFF.FUNCTION'}
                  />
                )}
                <FullDatePicker
                  name={'startDate'}
                  label={'STAFF.DATE_START'}
                  placeholder={'STAFF.DATE_START'}
                  selectedDate={values?.startDate}
                  setFieldValue={setFieldValue}
                  minDate={dayjs().toDate()}
                  onChangeFunc={(input: any) => {
                    if (input) {
                      setFieldValue(
                        `${UTILS.convertDateFormat(input)}`,
                        'startDate',
                      );
                    }
                  }}
                />
              </VStack>
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <VStack spacing={4} align="stretch" width={'100%'}>
                <FullDropdown
                  name={'contractType'}
                  label={'STAFF.CONTRACT_TYPE.TITLE'}
                  placeholder={'STAFF.CONTRACT_TYPE.TITLE'}
                  listItems={TYPES.CONSTANTS.COMMON.contractType}
                  bindItemLabel={'label'}
                  bindItemValue={'value'}
                  setFieldValue={setFieldValue}
                  selectedValue={values?.contractType}
                />
                <FormInput
                  type={'number'}
                  name={'contractDuration'}
                  label={'STAFF.CONTRACT_DURATION'}
                  placeholder={'STAFF.CONTRACT_DURATION'}
                  value={values?.contractDuration}
                  min={1}
                  onChange={(e: any) =>
                    setFieldValue('contractDuration', e.target.value)
                  }
                />
              </VStack>
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <VStack spacing={4} align="stretch" width={'100%'}>
                <FullDropdown
                  name={'contractPeriodicity'}
                  label={'STAFF.PERIODICITY.TITLE'}
                  listItems={TYPES.CONSTANTS.COMMON.contractPeriodicity}
                  bindItemLabel={'label'}
                  bindItemValue={'value'}
                  placeholder={'STAFF.PERIODICITY.TITLE'}
                  setFieldValue={setFieldValue}
                  selectedValue={values?.contractPeriodicity}
                />
                <FullDatePicker
                  name={'endDate'}
                  label={'STAFF.DATE_END'}
                  placeholder={'STAFF.DATE_END'}
                  selectedDate={values?.endDate}
                  setFieldValue={setFieldValue}
                  disabled
                />
              </VStack>
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <FormInput
                type={'amount'}
                name={'salary'}
                label={'STAFF.SALARY'}
                placeholder={'STAFF.SALARY'}
                value={values?.salary}
                useFullAmountMask
                onChangeFunction={(evt: any) =>
                  setFieldValue('salary', evt?.target?.value)
                }
              />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default StaffProfessionalForm;
