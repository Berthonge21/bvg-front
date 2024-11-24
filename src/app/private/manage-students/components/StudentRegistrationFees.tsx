import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { cardStyle } from '_theme/cardStyle';
import FormInput from '_components/formInput/FormInput';
import FullDatePicker from '_components/date-picker/FullDatePicker';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { FormikValues } from 'formik';
import { UTILS } from '_store/src';

const StudentRegistrationFees = ({ setFieldValue, values }: FormikValues) => {
  const { t } = useTranslation();
  return (
    <Box {...cardStyle}>
      <Text color={'primary.500'} fontWeight={'bold'} fontSize={'18px'}>
        {t('STUDENT.REGISTRATION_FEES')}
      </Text>
      <Flex
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        mt={5}>
        <Box width={'100%'} height={'100%'}>
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={4}
            alignItems="center"
            mb="16px">
            <GridItem colSpan={{ base: 3, sm: 1 }} h="100%">
              <FormInput
                required
                type={'amount'}
                name={'amount'}
                label={t('STUDENT.REGISTRATION_FEES_AMOUNT')}
                placeholder={t('STUDENT.REGISTRATION_FEES_AMOUNT')}
                onChangeFunction={(evt: any) => {
                  setFieldValue('amount', `${evt?.target?.value}`);
                }}
                value={values?.amount}
              />
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 1 }} h="100%">
              <FullDatePicker
                name={'paymentDate'}
                label={t('STUDENT.REGISTRATION_DATE')}
                placeholder={t('STUDENT.REGISTRATION_DATE')}
                selectedDate={values?.paymentDate}
                setFieldValue={setFieldValue}
                minDate={dayjs().toDate()}
                required
              />
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default StudentRegistrationFees;
