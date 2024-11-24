import { Avatar, Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { FormikValues } from 'formik';
import FormInput from '_components/formInput/FormInput';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { CameraIcon } from '_assets/svg';
import { cardStyle } from '_theme/cardStyle';
import { Colors } from '_theme/variables';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import FullDatePicker from '_components/date-picker/FullDatePicker';
import { TYPES } from '_store/src';
import { useSelector } from 'react-redux';
import { ClassModule } from '_store/src/modules';
import { useCallback, useEffect, useState } from 'react';

const StudentPersonalInfo = ({
  setFieldValue,
  values,
  disabledForm,
  bgColor,
}: {
  setFieldValue: any;
  values: FormikValues;
  disabledForm?: boolean;
  bgColor?: string;
}) => {
  const { t } = useTranslation();
  const { entityClass } = useSelector(
    ClassModule.selectors.classManagementSelector,
  );
  const [filteredClasses, setFilteredClasses] = useState([]);
  const findClassId = values?.class?.find((item: any) => item.id);

  useEffect(() => {
    if (values?.class) {
      const classesForGrade = entityClass.content.filter(
        (classItem: { grade: never }) => classItem.grade === findClassId?.grade,
      );
      setFilteredClasses(classesForGrade);
    }
  }, [findClassId?.grade, entityClass]);

  useEffect(() => {
    if (findClassId?.grade && findClassId?.id) {
      const matchedClass: any = filteredClasses.find(
        (classItem: { id: any }) => classItem.id === findClassId?.id,
      );
      if (matchedClass) {
        setFieldValue('classId', matchedClass.id);
        setFieldValue('grade', matchedClass.grade);
      } else {
        setFieldValue('classId', '');
      }
    }
  }, [filteredClasses, findClassId?.grade, findClassId?.id, setFieldValue]);

  const onSelectGrade = useCallback(
    (selectedGrade: { value: any }) => {
      if (selectedGrade?.value) {
        const classesForGrade = entityClass.content?.filter(
          (classItem: { grade: any }) =>
            classItem.grade === selectedGrade.value,
        );
        setFilteredClasses(classesForGrade);
        setFieldValue('grade', selectedGrade.value);
        setFieldValue('classId', '');
      } else {
        setFilteredClasses([]);
      }
    },
    [setFieldValue, entityClass],
  );

  return (
    <Box {...cardStyle} bgColor={bgColor}>
      <Text color={'primary.500'} fontWeight={'bold'} fontSize={'18px'}>
        {t('STUDENT.PERSONAL_INFORMATION')}
      </Text>
      <Text>{JSON.stringify(values?.birthDate)}</Text>
      <Flex
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        gap={8}
        justifyContent={'space-between'}
        flexDirection={{ base: 'column', md: 'row' }}
        mt={5}>
        <Box
          bgColor={'lighter.500'}
          p={3}
          position={'relative'}
          borderRadius={'7px'}>
          <Flex
            width={'100%'}
            height={'100%'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Avatar height={'120px'} width={'120px'} />
          </Flex>
          <Flex
            position={'absolute'}
            right={-3}
            bottom={-3}
            padding={2}
            bgColor={'white'}
            borderRadius={'50px'}>
            <CameraIcon width={'22px'} height={'22px'} fill={Colors.primary} />
          </Flex>
        </Box>
        <Box width={'100%'} height={'100%'}>
          <Grid templateColumns="repeat(3, 1fr)" gap={4} alignItems="center">
            <GridItem colSpan={{ base: 3, sm: 1 }} h="100%">
              <FormInput
                required
                name={'lastName'}
                label={t('STUDENT.LAST_NAME')}
                placeholder={t('STUDENT.LAST_NAME')}
                isDisabled={disabledForm}
              />
              <FullDatePicker
                name={'birthDate'}
                label={t('STUDENT.BIRTHDATE')}
                placeholder={t('STUDENT.BIRTHDATE')}
                selectedDate={values.birthDate}
                setFieldValue={setFieldValue}
                maxDate={dayjs().toDate()}
                required
                disabled={disabledForm}
              />
              <FullDropdown
                required
                name={'grade'}
                placeholder={t('STUDENT.GRADE')}
                label={t('STUDENT.GRADE')}
                listItems={TYPES.CONSTANTS.COMMON.cycleOptions}
                setFieldValue={setFieldValue}
                bindItemValue={'value'}
                bindItemLabel={'label'}
                selectedValue={values?.grade}
                onChangeFunc={onSelectGrade}
                isDisabled={disabledForm}
              />
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 1 }} h="100%">
              <FormInput
                required
                name={'firstName'}
                label={t('STUDENT.FIRST_NAME')}
                placeholder={t('STUDENT.FIRST_NAME')}
                isDisabled={disabledForm}
              />
              <FormInput
                required
                name={'birthPlace'}
                label={t('STUDENT.BIRTHDATE_PLACE')}
                placeholder={t('STUDENT.BIRTHDATE_PLACE')}
                value={values.birthPlace}
                isDisabled={disabledForm}
              />
              <FullDropdown
                required
                name={'classId'}
                label={t('STUDENT.CLASS')}
                placeholder={t('STUDENT.CLASS')}
                listItems={filteredClasses}
                bindItemValue={'id'}
                bindItemLabel={'name'}
                setFieldValue={setFieldValue}
                selectedValue={values?.classId}
                isDisabled={!values.grade || disabledForm}
              />
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 1 }} h="100%">
              <FullDropdown
                required
                name={'sex'}
                placeholder={t('STUDENT.SEX')}
                label={t('STUDENT.SEX')}
                listItems={TYPES.CONSTANTS.SEX_TYPE.SEX_TYPE}
                bindItemValue={'value'}
                bindItemLabel={'label'}
                setFieldValue={setFieldValue}
                selectedValue={values?.sex}
                isDisabled={disabledForm}
              />
              <FormInput
                required
                name={'studentAddress'}
                label={t('STUDENT.ADDRESS')}
                placeholder={t('STUDENT.ADDRESS')}
                isDisabled={disabledForm}
              />
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default StudentPersonalInfo;
