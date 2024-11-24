'use client';

import BoxContainer from '_components/container/BoxContainer';
import {
  Box,
  VStack,
  Grid,
  GridItem,
  Center,
  Textarea,
} from '@chakra-ui/react';
import { cardStyle } from '_theme/cardStyle';
import { Formik, FormikValues } from 'formik';
import FormInput from '_components/formInput/FormInput';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import { generateMonthlyData } from '_utils/generate.months.utils';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TYPES, UTILS } from '_store/src';
import FullDatePicker from '_components/date-picker/FullDatePicker';
import dayjs from 'dayjs';
import { StudentModule, AuthModule } from '_store/src/modules';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '_components/button/Button';

const TransactionForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const formikRef: any = useRef();
  const transactionId = useSearchParams().get('transactionId');
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const studentId = useSearchParams().get('studentId');
  const [initialValues, setInitialValues] = useState(
    TYPES.VALIDATION_SCHEMA.STUDENT_SCHEMA.transactionInitialValues,
  );
  const { isLoading, transactionHistory, entityStudent } = useSelector(
    StudentModule.selectors.studentSelector,
  );
  const months = generateMonthlyData()?.map(month => ({
    label: month,
    value: month,
  }));

  const findTransaction = transactionHistory?.content?.find(
    (transaction: any) => transaction.id === transactionId,
  );
  const getClassAmount = UTILS.findDynamicIdInList(
    studentId || findTransaction?.studentId,
    entityStudent,
  );

  useEffect(() => {
    if (transactionId && findTransaction) {
      setInitialValues({
        ...findTransaction,
        paymentDate: UTILS.parseDateString(findTransaction?.paymentDate),
      });
    } else if (getClassAmount?.class?.[0]?.classAmount) {
      setInitialValues({
        ...initialValues,
        expectAmount: getClassAmount?.class[0]?.classAmount,
        restAmount: getClassAmount?.class[0]?.classAmount,
      });
    }
  }, [findTransaction, transactionId, getClassAmount]);

  const onSubmit = (values: FormikValues) => {
    const requestData: TYPES.MODELS.STUDENTS.ITransactionDto = {
      months: values?.months,
      paymentType: values?.paymentType,
      expectAmount: parseFloat(
        values?.expectAmount ?? getClassAmount?.class[0]?.classAmount,
      ),
      restAmount: parseFloat(values?.restAmount),
      receivedAmount: parseFloat(values?.receivedAmount),
      paymentDate: UTILS.convertDateFormat(values?.paymentDate),
      paymentStatus: values?.paymentStatus,
      description: values?.description,
      studentId: studentId ?? findTransaction?.studentId,
      userId: currentUser?.id,
    };
    if (transactionId) {
      dispatch(
        StudentModule.actions.updateTransactionRequestAction({
          id: transactionId,
          ...requestData,
        }),
      );
    } else {
      dispatch(
        StudentModule.actions.createTransactionRequestAction(requestData),
      );
    }
  };
  useEffect(() => {
    if (
      transactionHistory?.createTransaction ||
      transactionHistory?.updateTransaction
    ) {
      dispatch(StudentModule.actions.clearTransactionRequestAction());
      router.back();
    }
  }, [
    transactionHistory?.createTransaction,
    transactionHistory?.updateTransaction,
  ]);

  const handleReceivedAmountChange = (value: any) => {
    const formik = formikRef.current;
    const expected = parseFloat(formik?.values?.expectAmount) || 0;
    const backendReceivedAmount =
      parseFloat(findTransaction?.receivedAmount) || 0;
    const currentRestAmount = parseFloat(findTransaction?.restAmount) || 0;
    if (value === '') {
      formik.setFieldValue('receivedAmount', '');
      formik.setFieldValue('restAmount', currentRestAmount);
      return;
    }
    const received = parseFloat(value) || 0;
    const newRestAmount = Math.max(
      expected - (received + backendReceivedAmount),
      0,
    );
    const totalReceived = received + backendReceivedAmount;
    if (totalReceived > expected) {
      alert('Le montant reçu dépasse le montant attendu !');
      formik.setFieldValue('restAmount', currentRestAmount);
      formik.setFieldValue('receivedAmount', backendReceivedAmount);
      return;
    }
    formik.setFieldValue('restAmount', newRestAmount);
    formik.setFieldValue('receivedAmount', received);
  };

  return (
    <BoxContainer
      description={'STUDENT.TRANSACTION.DETAIL'}
      title={
        transactionId ? 'STUDENT.TRANSACTION.EDIT' : 'STUDENT.TRANSACTION.ADD'
      }>
      <Box {...cardStyle}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
          innerRef={formikRef}>
          {({ setFieldValue, values, resetForm, handleSubmit }) => {
            return (
              <Box>
                <Grid
                  templateColumns="repeat(3, 1fr)"
                  gap={4}
                  width={'100%'}
                  alignItems="center">
                  <GridItem colSpan={{ base: 2, sm: 1 }}>
                    <VStack spacing={4} align="stretch">
                      <FullDropdown
                        name={'months'}
                        label={'STUDENT.TRANSACTION.MONTHS'}
                        listItems={months}
                        bindItemLabel={'label'}
                        bindItemValue={'value'}
                        placeholder={'STUDENT.TRANSACTION.MONTHS'}
                        setFieldValue={setFieldValue}
                        selectedValue={values?.months}
                      />
                      <FullDatePicker
                        name={'paymentDate'}
                        label={'STUDENT.TRANSACTION.PAYMENT_DATE'}
                        selectedDate={values?.paymentDate}
                        setFieldValue={setFieldValue}
                        width={'100%'}
                        minDate={dayjs().toDate()}
                        value={values?.paymentDate}
                      />
                    </VStack>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, sm: 1 }}>
                    <VStack spacing={4} align="stretch">
                      <FullDropdown
                        name={'paymentType'}
                        label={'STUDENT.TRANSACTION.PAYMENT_TYPE'}
                        listItems={TYPES.CONSTANTS.COMMON.paymentType}
                        bindItemLabel={'label'}
                        bindItemValue={'value'}
                        placeholder={'STUDENT.TRANSACTION.PAYMENT_TYPE'}
                        setFieldValue={setFieldValue}
                        selectedValue={values?.paymentType}
                      />
                      <FormInput
                        type={'amount'}
                        name={'receivedAmount'}
                        label={'STUDENT.TRANSACTION.RECEIVED_AMOUNT'}
                        placeholder={'STUDENT.TRANSACTION.RECEIVED_AMOUNT'}
                        value={values?.receivedAmount}
                        isDisabled={
                          values?.receivedAmount === values?.expectAmount
                        }
                        useFullAmountMask
                        onChangeFunction={(evt: any) => {
                          handleReceivedAmountChange(evt?.target?.value);
                        }}
                      />
                    </VStack>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, sm: 1 }}>
                    <VStack spacing={4} align="stretch">
                      {!transactionId ? (
                        <FormInput
                          type={'amount'}
                          name={'expectAmount'}
                          label={'STUDENT.TRANSACTION.AMOUNT_TO_PAY'}
                          placeholder={'STUDENT.TRANSACTION.AMOUNT_TO_PAY'}
                          value={values?.expectAmount}
                          disabled
                        />
                      ) : (
                        <FormInput
                          type={'amount'}
                          name={'restAmount'}
                          label={'STUDENT.TRANSACTION.REMAINING_AMOUNT'}
                          placeholder={'STUDENT.TRANSACTION.REMAINING_AMOUNT'}
                          value={values?.restAmount}
                          disabled
                        />
                      )}
                      <FullDropdown
                        name={'paymentStatus'}
                        label={'COMMON.PAYMENT_STATUS.TITLE'}
                        listItems={TYPES.CONSTANTS.COMMON.paymentStatus}
                        bindItemLabel={'label'}
                        bindItemValue={'value'}
                        placeholder={'COMMON.PAYMENT_STATUS.TITLE'}
                        setFieldValue={setFieldValue}
                        selectedValue={values?.paymentStatus}
                        isDisabled={
                          values?.receivedAmount === values?.expectAmount
                        }
                      />
                    </VStack>
                  </GridItem>
                </Grid>
                <Grid
                  mt={'30px'}
                  templateColumns="repeat(1, 1fr)"
                  gap={4}
                  width={'100%'}
                  alignItems="center">
                  {values?.receivedAmount === values?.expectAmount ||
                    (transactionId && (
                      <GridItem>
                        <Textarea
                          name={'description'}
                          placeholder={'STUDENT.TRANSACTION.DESCRIPTION'}
                          onChange={(evt: any) => {
                            setFieldValue('description', evt?.target?.value);
                          }}
                          value={values?.description}
                          bgColor={'white'}
                          borderRadius={'7px'}
                          height={'100px'}
                          width={'100%'}
                        />
                      </GridItem>
                    ))}
                </Grid>
                <Center mt={'30px'} gap={'10px'}>
                  <Button
                    variant={'secondary'}
                    onClick={() => {
                      if (transactionId) {
                        router.back();
                      } else {
                        resetForm();
                      }
                    }}>
                    {t('COMMON.CANCEL')}
                  </Button>
                  <Button
                    variant={'primary'}
                    isLoading={isLoading}
                    onClick={() => handleSubmit()}>
                    {t('COMMON.VALIDATE')}
                  </Button>
                </Center>
              </Box>
            );
          }}
        </Formik>
      </Box>
    </BoxContainer>
  );
};

export default TransactionForm;

// 'use client';
//
// import BoxContainer from '_components/container/BoxContainer';
// import {
//   Box,
//   VStack,
//   Grid,
//   GridItem,
//   Center,
//   Textarea,
// } from '@chakra-ui/react';
// import { cardStyle } from '_theme/cardStyle';
// import { Formik, FormikValues } from 'formik';
// import FormInput from '_components/formInput/FormInput';
// import { FullDropdown } from '_components/dropdown/components/FullDropDown';
// import { generateMonthlyData } from '_utils/generate.months.utils';
// import React, { useEffect, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { TYPES, UTILS } from '_store/src';
// import FullDatePicker from '_components/date-picker/FullDatePicker';
// import dayjs from 'dayjs';
// import { StudentModule, AuthModule } from '_store/src/modules';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Button from '_components/button/Button';
//
// const TransactionForm = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const formikRef = useRef<any>();
//   const transactionId = useSearchParams().get('transactionId');
//   const { currentUser } = useSelector(AuthModule.selectors.authSelector);
//   const studentId = useSearchParams().get('studentId');
//   const [initialValues, setInitialValues] = useState(
//     TYPES.VALIDATION_SCHEMA.STUDENT_SCHEMA.transactionInitialValues,
//   );
//   const { isLoading, transactionHistory, entityStudent } = useSelector(
//     StudentModule.selectors.studentSelector,
//   );
//   const months = generateMonthlyData()?.map(month => ({
//     label: month,
//     value: month,
//   }));
//   const findTransaction = transactionHistory?.content?.find(
//     (transaction: any) => transaction.id === transactionId,
//   );
//   const getClassAmount = UTILS.findDynamicIdInList(
//     studentId || findTransaction?.studentId,
//     entityStudent,
//   );
//
//   useEffect(() => {
//     if (transactionId && findTransaction) {
//       setInitialValues({
//         ...findTransaction,
//         paymentDate: UTILS.parseDateString(findTransaction?.paymentDate),
//       });
//     } else if (getClassAmount?.class?.[0]?.classAmount) {
//       setInitialValues({
//         ...initialValues,
//         expectAmount: getClassAmount?.class[0]?.classAmount,
//         receivedAmount: '',
//         restAmount: getClassAmount?.class[0]?.classAmount,
//       });
//     }
//   }, [findTransaction, transactionId, getClassAmount]);
//
//   const onSubmit = (values: FormikValues) => {
//     const requestData = {
//       months: values.months,
//       paymentType: values.paymentType,
//       expectAmount: parseFloat(values.expectAmount),
//       restAmount: parseFloat(values.restAmount),
//       receivedAmount: parseFloat(values.receivedAmount),
//       paymentDate: UTILS.convertDateFormat(values.paymentDate),
//       paymentStatus: values.paymentStatus,
//       description: values.description,
//       studentId: studentId ?? findTransaction?.studentId,
//       userId: currentUser?.id,
//     };
//     if (transactionId) {
//       dispatch(
//         StudentModule.actions.updateTransactionRequestAction({
//           id: transactionId,
//           ...requestData,
//         }),
//       );
//     } else {
//       dispatch(
//         StudentModule.actions.createTransactionRequestAction(requestData),
//       );
//     }
//   };
//
//   useEffect(() => {
//     if (
//       transactionHistory?.createTransaction ||
//       transactionHistory?.updateTransaction
//     ) {
//       dispatch(StudentModule.actions.clearTransactionRequestAction());
//       router.back();
//     }
//   }, [
//     transactionHistory?.createTransaction,
//     transactionHistory?.updateTransaction,
//   ]);
//
//   const handleReceivedAmountChange = (value: string) => {
//     const receivedAmountInput = parseFloat(value || '0');
//     const currentRestAmount = parseFloat(
//       formikRef.current?.values?.restAmount || '0',
//     );
//     const newRestAmount = Math.max(currentRestAmount - receivedAmountInput, 0);
//     if (receivedAmountInput > formikRef.current?.values.expectAmount) {
//       alert('Le montant reçu dépasse le montant attendu !');
//       return;
//     }
//     formikRef.current.setFieldValue('restAmount', newRestAmount);
//     formikRef.current.setFieldValue('receivedAmount', receivedAmountInput);
//   };
//
//   return (
//     <BoxContainer
//       description={'STUDENT.TRANSACTION.DETAIL'}
//       title={
//         transactionId ? 'STUDENT.TRANSACTION.EDIT' : 'STUDENT.TRANSACTION.ADD'
//       }>
//       <Box {...cardStyle}>
//         <Formik
//           enableReinitialize
//           initialValues={initialValues}
//           onSubmit={onSubmit}
//           innerRef={formikRef}>
//           {({ setFieldValue, values, resetForm, handleSubmit }) => {
//             useEffect(() => {
//               const expected = parseFloat(values?.expectAmount) || 0;
//               const received = parseFloat(values?.receivedAmount) || 0;
//               const rest = Math.max(expected - received, 0);
//               setFieldValue('restAmount', rest);
//             }, [values?.expectAmount, values?.receivedAmount, setFieldValue]);
//             return (
//               <Box>
//                 {JSON.stringify(values)}
//                 <Grid
//                   templateColumns="repeat(3, 1fr)"
//                   gap={4}
//                   width={'100%'}
//                   alignItems="center">
//                   <GridItem colSpan={{ base: 2, sm: 1 }}>
//                     <VStack spacing={4} align="stretch">
//                       <FullDropdown
//                         name={'months'}
//                         label={'STUDENT.TRANSACTION.MONTHS'}
//                         listItems={months}
//                         bindItemLabel={'label'}
//                         bindItemValue={'value'}
//                         placeholder={'STUDENT.TRANSACTION.MONTHS'}
//                         setFieldValue={setFieldValue}
//                         selectedValue={values?.months}
//                       />
//                       <FullDatePicker
//                         name={'paymentDate'}
//                         label={'STUDENT.TRANSACTION.PAYMENT_DATE'}
//                         selectedDate={values?.paymentDate}
//                         setFieldValue={setFieldValue}
//                         width={'100%'}
//                         minDate={dayjs().toDate()}
//                         value={values?.paymentDate}
//                       />
//                     </VStack>
//                   </GridItem>
//                   <GridItem colSpan={{ base: 2, sm: 1 }}>
//                     <VStack spacing={4} align="stretch">
//                       <FullDropdown
//                         name={'paymentType'}
//                         label={'STUDENT.TRANSACTION.PAYMENT_TYPE'}
//                         listItems={TYPES.CONSTANTS.COMMON.paymentType}
//                         bindItemLabel={'label'}
//                         bindItemValue={'value'}
//                         placeholder={'STUDENT.TRANSACTION.PAYMENT_TYPE'}
//                         setFieldValue={setFieldValue}
//                         selectedValue={values?.paymentType}
//                       />
//                       <FormInput
//                         type={'amount'}
//                         name={'receivedAmount'}
//                         label={'STUDENT.TRANSACTION.RECEIVED_AMOUNT'}
//                         placeholder={'STUDENT.TRANSACTION.RECEIVED_AMOUNT'}
//                         value={values?.receivedAmount}
//                         useFullAmountMask
//                         onChangeFunction={(evt: any) =>
//                           handleReceivedAmountChange(evt?.target?.value)
//                         }
//                       />
//                     </VStack>
//                   </GridItem>
//                   <GridItem colSpan={{ base: 2, sm: 1 }}>
//                     <VStack spacing={4} align="stretch">
//                       {!transactionId ? (
//                         <FormInput
//                           type={'amount'}
//                           name={'expectAmount'}
//                           label={'STUDENT.TRANSACTION.AMOUNT_TO_PAY'}
//                           placeholder={'STUDENT.TRANSACTION.AMOUNT_TO_PAY'}
//                           value={values?.expectAmount}
//                           disabled
//                         />
//                       ) : (
//                         <FormInput
//                           type={'amount'}
//                           name={'restAmount'}
//                           label={'STUDENT.TRANSACTION.REMAINING_AMOUNT'}
//                           placeholder={'STUDENT.TRANSACTION.REMAINING_AMOUNT'}
//                           value={values?.restAmount}
//                           disabled
//                         />
//                       )}
//                       <FullDropdown
//                         name={'paymentStatus'}
//                         label={'COMMON.PAYMENT_STATUS.TITLE'}
//                         listItems={TYPES.CONSTANTS.COMMON.paymentStatus}
//                         bindItemLabel={'label'}
//                         bindItemValue={'value'}
//                         placeholder={'COMMON.PAYMENT_STATUS.TITLE'}
//                         setFieldValue={setFieldValue}
//                         selectedValue={values?.paymentStatus}
//                       />
//                     </VStack>
//                   </GridItem>
//                 </Grid>
//                 <Grid
//                   mt={'30px'}
//                   templateColumns="repeat(1, 1fr)"
//                   gap={4}
//                   width={'100%'}
//                   alignItems="center">
//                   {transactionId && (
//                     <GridItem>
//                       <Textarea
//                         name={'description'}
//                         placeholder={'STUDENT.TRANSACTION.DESCRIPTION'}
//                         onChange={(evt: any) => {
//                           setFieldValue('description', evt?.target?.value);
//                         }}
//                         value={values?.description}
//                         bgColor={'white'}
//                         borderRadius={'7px'}
//                         height={'100px'}
//                         width={'100%'}
//                       />
//                     </GridItem>
//                   )}
//                 </Grid>
//                 <Center mt={'30px'} gap={'10px'}>
//                   <Button
//                     variant={'secondary'}
//                     onClick={() => {
//                       if (transactionId) {
//                         router.back();
//                       } else {
//                         resetForm();
//                       }
//                     }}>
//                     {t('COMMON.CANCEL')}
//                   </Button>
//                   <Button
//                     variant={'primary'}
//                     isLoading={isLoading}
//                     onClick={() => handleSubmit()}>
//                     {t('COMMON.VALIDATE')}
//                   </Button>
//                 </Center>
//               </Box>
//             );
//           }}
//         </Formik>
//       </Box>
//     </BoxContainer>
//   );
// };
