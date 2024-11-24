import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { cardStyle } from '_theme/cardStyle';
import FormInput from '_components/formInput/FormInput';
import { useTranslation } from 'react-i18next';
import { FormikValues } from 'formik';

const StudentParentInfo = ({ setFieldValue, values }: FormikValues) => {
  const { t } = useTranslation();
  return (
    <Box {...cardStyle}>
      <Text color={'primary.500'} fontWeight={'bold'} fontSize={'18px'}>
        {t('STUDENT.PARENT_INFORMATION')}
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
                name={'parentLastName'}
                placeholder={t('STUDENT.LAST_NAME')}
                label={t('STUDENT.LAST_NAME')}
                value={values?.parentLastName}
              />
              <FormInput
                name={'parentPhone2'}
                placeholder={t('STUDENT.PHONE2')}
                label={t('STUDENT.PHONE2')}
                value={values?.parentPhone2}
              />
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 1 }} h="100%">
              <FormInput
                required
                name={'parentFirstName'}
                placeholder={t('STUDENT.FIRST_NAME')}
                label={t('STUDENT.FIRST_NAME')}
                value={values?.parentFirstName}
              />
              <FormInput
                required
                name={'parentEmail'}
                type={'email'}
                placeholder={t('STUDENT.EMAIL')}
                label={t('STUDENT.EMAIL')}
                value={values?.parentEmail}
              />
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 1 }} h="100%">
              <FormInput
                required
                name={'parentPhone1'}
                placeholder={t('STUDENT.PHONE')}
                label={t('STUDENT.PHONE')}
                value={values?.parentPhone1}
              />
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default StudentParentInfo;
