'use client';

import { Box, Button, Center, VStack } from '@chakra-ui/react';

import StudentPersonalInfo from './StudentPersonalInfo';
import { Formik, FormikValues } from 'formik';
import { useTranslation } from 'react-i18next';
import { studentInitialValues } from '../interface/students';
import StudentParentInfo from '../components/StudentParentInfo';
import StudentRegistrationFees from '../components/StudentRegistrationFees';
import { useDispatch, useSelector } from 'react-redux';
import { SchoolModule, StudentModule, AuthModule } from '_store/src/modules';
import { TYPES, UTILS } from '_store/src';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BoxContainer from '_components/container/BoxContainer';
import { hexToRGB } from '_theme/colors';
const StudentInscriptionForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const requestId = useSearchParams().get('requestId');
  const getDynamicSchoolId = useSelector(SchoolModule.selectors.getSchoolId);
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const [initialValues, setInitialValues] = useState(studentInitialValues);
  const { entityStudent, isLoading, addStudent, updateStudent } = useSelector(
    StudentModule.selectors.studentSelector,
  );

  const handleSubmit = (values: FormikValues) => {
    const requestData: TYPES.MODELS.STUDENTS.ICreateStudent = {
      userId: currentUser?.id,
      firstName: values?.firstName,
      lastName: values?.lastName,
      birthDate: UTILS.convertDateFormat(values?.birthDate),
      birthPlace: values?.birthPlace,
      sex: values?.sex,
      studentAddress: values?.studentAddress,
      parentFirstName: values?.parentFirstName,
      parentLastName: values?.parentLastName,
      parentPhone1: values?.parentPhone1,
      parentPhone2: values?.parentPhone2,
      parentEmail: values?.parentEmail,
      schoolId: getDynamicSchoolId,
      classId: values?.classId,
      tuitionPayments: [
        {
          expectAmount: parseFloat(values?.amount),
          restAmount: 0,
          receivedAmount: parseFloat(values?.amount),
          paymentDate: UTILS.convertDateFormat(values?.paymentDate),
          paymentStatus: TYPES.ENUMS.PAYMENT_STATUS.PaymentStatus.PAID,
          paymentType: TYPES.ENUMS.PAYMENT_STATUS.PaymentType.INSCRIPTION_FEES,
          userId: currentUser?.id,
        },
      ],
    };
    if (requestId) {
      dispatch(
        StudentModule.actions.updateStudentRequestAction({
          id: requestId,
          ...requestData,
        }),
      );
    } else {
      dispatch(StudentModule.actions.createStudentRequestAction(requestData));
    }
  };

  const existingStudent = entityStudent?.content?.find(
    (student: { id: string | null }) => student.id === requestId,
  );

  useEffect(() => {
    if (requestId) {
      if (existingStudent) {
        setInitialValues({
          ...existingStudent,
        });
      } else {
        setInitialValues(studentInitialValues);
      }
    }
  }, [requestId, entityStudent]);

  useEffect(() => {
    if (requestId && entityStudent) {
      if (existingStudent) {
        setInitialValues({
          ...existingStudent,
        });
      }
    }
  }, [entityStudent, requestId]);

  useEffect(() => {
    if (addStudent || updateStudent) {
      dispatch(StudentModule.actions.clearAllStudentRequestAction());
      dispatch(StudentModule.actions.clearAllStudentRequestAction());
      dispatch(StudentModule.actions.clearUpdateStudentRequestAction());
      dispatch(StudentModule.actions.clearAddStudentRequestAction());
      router?.back();
    }
  }, [addStudent, updateStudent]);

  return (
    <BoxContainer title={'STUDENT.ADD_TITLE'}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}>
        {({ setFieldValue, values, resetForm, handleSubmit }) => (
          <Box>
            <VStack spacing={5} alignItems={'flex-start'}>
              <StudentPersonalInfo
                setFieldValue={setFieldValue}
                bgColor={hexToRGB('lightGray', 0.3)}
                values={values}
              />
              <StudentParentInfo
                setFieldValue={setFieldValue}
                values={values}
              />
              {!requestId && (
                <StudentRegistrationFees
                  setFieldValue={setFieldValue}
                  values={values}
                />
              )}
            </VStack>
            <Center gap={5}>
              <Button
                color={'white'}
                bgColor={'secondary.500'}
                _hover={{ bgColor: 'secondary.500' }}
                onClick={() => {
                  if (requestId) {
                    router.back();
                  } else {
                    resetForm();
                    router.back();
                  }
                }}>
                {t('COMMON.CANCEL')}
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
    </BoxContainer>
  );
};

export default StudentInscriptionForm;
