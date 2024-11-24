import { initialClassValues } from '_private/manage-class/interface/class';
import { Box, Button, Center, VStack } from '@chakra-ui/react';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import { Formik } from 'formik';
import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { generateMonthlyData } from '_utils/generate.months.utils';
import { useSelector } from 'react-redux';
import { IFIlter } from '_app/interface/common.filter';
import { StudentModule } from '_/store/src/modules';

const TransactionFilter: FC<IFIlter> = ({ onSubmit, onReset }) => {
  const formikRef: any = useRef();
  const { t } = useTranslation();
  const { isLoading } = useSelector(StudentModule.selectors.studentSelector);

  const months = generateMonthlyData()?.map(month => ({
    label: month,
    value: month,
  }));
  return (
    <Formik
      initialValues={{ months: '' }}
      onSubmit={onSubmit}
      enableReinitialize
      onReset={onReset}
      innerRef={formikRef}>
      {({ values, handleSubmit, resetForm, setFieldValue }) => (
        <Box p={'10px 20px 20px 10px'}>
          <FullDropdown
            name={'months'}
            listItems={months}
            label={t('STUDENT.TRANSACTION.MONTHS')}
            placeholder={t('STUDENT.TRANSACTION.MONTHS')}
            setFieldValue={setFieldValue}
            selectedValue={values?.months}
            bindItemValue={'value'}
            bindItemLabel={'label'}
          />
          <Center gap={'20px'} mt={'30px'}>
            <Button
              color={'white'}
              bgColor={'secondary.500'}
              _hover={{ bgColor: 'secondary.500' }}
              onClick={() => resetForm()}>
              {JSON.stringify(values) !== JSON.stringify(values)
                ? t('COMMON.RESET')
                : t('COMMON.CANCEL')}
            </Button>
            <Button
              bgColor={'primary.500'}
              _hover={{ bgColor: 'primary.500' }}
              color={'white'}
              isLoading={isLoading}
              onClick={() => handleSubmit()}>
              {t('COMMON.VALIDATE')}
            </Button>
          </Center>
        </Box>
      )}
    </Formik>
  );
};

export default TransactionFilter;
