'use client';

import BoxContainer from '_components/container/BoxContainer';
import { cardStyle } from '_theme/cardStyle';
import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Formik, FormikValues } from 'formik';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StaffPersonalInfo from '../components/StaffPersonalInfo';
import StaffProfessionalForm from '../components/StaffProfessionalForm';
import { CollapseCheckBoxGroup } from './PermissionGroup';
import { t } from 'i18next';
import {
  UserPackModule,
  CollaboratorModule,
  SchoolModule,
  AuthModule,
} from '_store/src/modules';
import { useDispatch, useSelector } from 'react-redux';
import { TYPES, UTILS } from '_store/src';
import { ICheckboxElement } from '_components/checkbox-collapse/checkBoxGroup.interface';
import Button from '_components/button/Button';
import RecapInfo from '_private/manage-staff/components/RecapInfo';

const AddNewStaffForm = () => {
  const getType = useSearchParams().get('type');
  const requestId = useSearchParams().get('requestId');
  const router = useRouter();
  const dispatch = useDispatch();
  const formikRef = useRef<any>();
  const [openRecapModal, setOpenRecapModal] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<any>({});
  const getDynamicSchoolId = useSelector(SchoolModule.selectors.getSchoolId);
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const { entityUserPack } = useSelector(
    UserPackModule.selectors.userPackManagementSelector,
  );
  const { addCollaborator } = useSelector(
    CollaboratorModule.selectors.collaboratorManagementSelector,
  );

  useEffect(() => {
    dispatch(UserPackModule.actions.userFindMyPackRequestAction({}));
  }, []);

  const permissionGroupList = useMemo(() => {
    return entityUserPack?.content?.flatMap((elt: any) => {
      if (elt?.modules) {
        return elt.modules
          .map((module: any) => ({
            groupName: module?.moduleName,
            groupElements: module?.features?.map(
              (feature: any) => feature?.featureName,
            ),
          }))
          .filter((elt: ICheckboxElement) => elt.groupElements?.length);
      }
      return [];
    });
  }, [entityUserPack?.content]);

  const handlePermissionChange = (selectedValues: ICheckboxElement[]) => {
    formikRef?.current?.setFieldValue('features', selectedValues);
  };

  const onSubmit = (values: FormikValues) => {
    const preparedFeatures: any = [];
    values?.features?.forEach((item: ICheckboxElement) => {
      if (item?.groupElements) {
        const groupName = item?.groupName;
        Object.keys(item?.groupElements).forEach((key: any) => {
          preparedFeatures.push({
            featureName: item.groupElements[key],
            moduleName: groupName,
          });
        });
      } else {
        preparedFeatures.push(item);
      }
    });
    const preparedValues: TYPES.MODELS.COLLABORATOR.ICollaboratorDto = {
      userId: currentUser?.id,
      employeeInfo: {
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        phone: values?.phone1,
        phone2: values?.phone2,
        address: values?.address,
        cinNumber: values?.cinNumber,
        salary: parseFloat(values?.salary),
        sex: values?.sex,
        cinType: values?.cinType,
        staffPost: values?.staffPost,
        schoolId: getDynamicSchoolId,
        features: preparedFeatures,
        password: 'password',
      },
      contractInfo: {
        startDate: UTILS.convertDateFormat(values?.startDate),
        endDate: UTILS.convertDateFormat(values?.endDate),
        schoolId: getDynamicSchoolId,
        contractDuration: parseInt(values?.contractDuration, 10),
        contractType: values?.contractType,
        periodicity: values?.contractPeriodicity,
      },
    };
    setSubmittedValues(preparedValues);
    setOpenRecapModal(true);
  };

  useEffect(() => {
    if (addCollaborator) {
      router.back();
      dispatch(CollaboratorModule.actions.clearAddCollaborator());
      setOpenRecapModal(false);
    }
  }, [addCollaborator, openRecapModal]);

  return (
    <BoxContainer title={t('Add New Staff')}>
      <Formik
        enableReinitialize
        initialValues={{
          features: [],
          firstName: '',
          lastName: '',
          email: '',
          cinType: '',
          cinNumber: '',
          staffPost: '',
          salary: '',
          sex: '',
          phone1: '',
          phone2: '',
          address: '',
          startDate: '',
          endDate: '',
          contractDuration: '',
          contractPeriodicity: '',
          contractType: '',
        }}
        validationSchema={
          TYPES.VALIDATION_SCHEMA.STAFF_SCHEMA.staffValidationSchema
        }
        innerRef={formikRef}
        onSubmit={onSubmit}>
        {({
          values,
          setFieldValue,
          errors,
          touched,
          handleSubmit,
          resetForm,
        }) => (
          <VStack spacing={4}>
            <Text>{JSON.stringify(errors)}</Text>
            <StaffPersonalInfo values={values} setFieldValue={setFieldValue} />
            <StaffProfessionalForm
              setFieldValue={setFieldValue}
              values={values}
              type={getType ?? ''}
            />
            <Box {...cardStyle} w="100%" overflow="auto">
              <VStack alignSelf="flex-start" w="100%" gap={2}>
                <Text alignSelf="flex-start" variant="panel-title">
                  {t('PROFILE.PERMISSIONS')}
                </Text>
                <Text alignSelf="flex-start" variant="helper-text">
                  {t('FORMS.HELP_MSG.PERMISSIONS_HELPER')}
                </Text>
                <CollapseCheckBoxGroup
                  groupList={permissionGroupList}
                  onChange={handlePermissionChange}
                  defaultValues={[]}
                />
                <FormControl
                  isInvalid={!!errors['features'] && !!touched['features']}>
                  <FormErrorMessage>
                    {t('ROLE_MANAGEMENT.PERMISSIONS_REQUIRED')}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </Box>
            <Center gap={5}>
              <Button variant={'secondary'} onClick={() => resetForm()}>
                {t('COMMON.CANCEL')}
              </Button>
              <Button color={'white'} onClick={() => handleSubmit()}>
                {t('COMMON.VALIDATE')}
              </Button>
            </Center>
          </VStack>
        )}
      </Formik>
      <RecapInfo
        isOpen={openRecapModal}
        onClose={() => setOpenRecapModal(false)}
        data={submittedValues}
        callBackAction={() => {
          if (requestId) {
            dispatch(
              CollaboratorModule.actions.createCollaborator({
                contractInfo: {
                  ...submittedValues,
                },

                employeeInfo: {
                  ...submittedValues,
                  id: requestId,
                },
              }),
            );
          } else {
            dispatch(
              CollaboratorModule.actions.createCollaborator(submittedValues),
            );
          }
          setOpenRecapModal(false);
        }}
      />
    </BoxContainer>
  );
};

export default AddNewStaffForm;
