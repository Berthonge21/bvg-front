// import React, { memo } from 'react';
// import { DatePickerProps } from './types/DatePickerProps';
// import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker, { registerLocale } from 'react-datepicker';
// import { FieldHookConfig, useField } from 'formik';
// import {
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Box,
//   Text,
// } from '@chakra-ui/react';
// import { useTranslation } from 'react-i18next';
// import './date-picker-styles.scss';
// import en from 'date-fns/locale/fr';
// import { useCustomDatePicker } from './constants/date-picker.constant';
//
// registerLocale('en', en);
// import { getMonth, getYear } from 'date-fns';
// import { getDay } from 'date-fns';
// import {
//   ArrowDropLeftIcon,
//   ArrowDropRightIcon,
//   CalendarIcon,
// } from '_assets/svg';
// import { Colors } from '_theme/variables';
//
// const FullDatePicker = memo<DatePickerProps>(
//   ({
//     name,
//     minDate,
//     maxDate,
//     label,
//     selectedDate,
//     onChangeFunc,
//     setFieldValue,
//     placeholder = 'dd/MM/yyyy',
//     dateFormat = 'dd/MM/yyyy',
//     disabled = false,
//     isClearable = true,
//     disabledWeekday = false,
//     required,
//     ...rest
//   }) => {
//     const { t } = useTranslation();
//     const fieldHookConfig: FieldHookConfig<any> = {
//       name,
//     };
//     const [{ onChange, ...field }, { touched, error }] =
//       useField(fieldHookConfig);
//     const hasError = !!(touched && error);
//     const onChangeDate = (input: Date | null) => {
//       setFieldValue?.(name, input);
//       onChangeFunc?.(input);
//     };
//
//     const { months, getYears } = useCustomDatePicker();
//
//     const isWeekday = (date: any) => {
//       if (!disabledWeekday) {
//         return true;
//       }
//       const day = getDay(date);
//       return day !== 0 && day !== 6;
//     };
//
//     return (
//       <Box className={rest.showTimeSelect ? 'time-option-date-picker' : ''}>
//         <FormControl id={name} isInvalid={hasError} isDisabled={disabled}>
//           {label && (
//             <FormLabel display={'flex'}>
//               {t(label)}
//               {required && <Text color={'red'}>*</Text>}
//             </FormLabel>
//           )}
//           <DatePicker
//             timeCaption={t('DATEPICKER.TIME')}
//             renderCustomHeader={({
//               date,
//               changeYear,
//               changeMonth,
//               decreaseMonth,
//               increaseMonth,
//               prevMonthButtonDisabled,
//               nextMonthButtonDisabled,
//             }) => (
//               <div
//                 style={{
//                   margin: 10,
//                   display: 'flex',
//                   justifyContent: 'center',
//                 }}>
//                 <Box
//                   as={'button'}
//                   onClick={decreaseMonth}
//                   mr={'auto'}
//                   px="0.9rem"
//                   py="1.2rem"
//                   disabled={prevMonthButtonDisabled}
//                   type={'button'}>
//                   <ArrowDropLeftIcon width={'18px'} height={'18px'} />
//                 </Box>
//
//                 <select
//                   value={months[getMonth(date)]}
//                   onChange={({ target: { value } }) =>
//                     changeMonth(months.indexOf(value))
//                   }>
//                   {months.map(option => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={getYear(date)}
//                   onChange={({ target: { value } }: { target: any }) =>
//                     changeYear(Number(value))
//                   }>
//                   {getYears(minDate, maxDate).map(option => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//                 <Box
//                   as={'button'}
//                   onClick={increaseMonth}
//                   ml={'auto'}
//                   disabled={nextMonthButtonDisabled}
//                   type={'button'}>
//                   <ArrowDropRightIcon width={'18px'} height={'18px'} />
//                 </Box>
//               </div>
//             )}
//             isClearable={isClearable && !disabled}
//             showIcon={true}
//             icon={<CalendarIcon fill={Colors.grayScale} />}
//             selected={selectedDate}
//             onChange={onChangeDate}
//             placeholderText={t(placeholder)}
//             dateFormat={dateFormat}
//             minDate={minDate}
//             maxDate={maxDate}
//             locale="en"
//             dayClassName={rest.customDayClassName}
//             disabled={disabled}
//             filterDate={isWeekday}
//             {...rest}
//           />
//           {hasError && <FormErrorMessage>{t(`${error}`)}</FormErrorMessage>}
//         </FormControl>
//       </Box>
//     );
//   },
// );
//
// export default FullDatePicker;

import React, { memo } from 'react';
import { DatePickerProps } from './types/DatePickerProps';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FieldHookConfig, useField } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import './date-picker-styles.scss';
import fr from 'date-fns/locale/fr';
import { useCustomDatePicker } from './constants/date-picker.constant';
import { UTILS } from '_store/src';

registerLocale('fr', fr);
import { getMonth, getYear } from 'date-fns';
import { getDay } from 'date-fns';
import { Icon } from '_components/Icon/Icon';

const FullDatePicker = memo<DatePickerProps>(
  ({
    name,
    minDate,
    maxDate,
    label,
    selectedDate,
    onChangeFunc,
    setFieldValue,
    placeholder = UTILS.COMMON_FORMAT_DATE,
    dateFormat = UTILS.COMMON_FORMAT_DATE,
    disabled = false,
    isClearable = true,
    disabledWeekday = false,
    required,
    ...rest
  }) => {
    const { t } = useTranslation();
    const fieldHookConfig: FieldHookConfig<any> = {
      name,
    };
    const [{ onChange, ...field }, { touched, error }] =
      useField(fieldHookConfig);
    const hasError = !!(touched && error);
    const onChangeDate = (input: Date | null) => {
      setFieldValue?.(name, input);
      onChangeFunc?.(input);
    };

    const { months, getYears } = useCustomDatePicker();

    const isWeekday = (date: any) => {
      if (!disabledWeekday) {
        return true;
      }
      const day = getDay(date);
      return day !== 0 && day !== 6;
    };

    return (
      <Box className={rest.showTimeSelect ? 'time-option-date-picker' : ''}>
        <FormControl id={name} isInvalid={hasError} isDisabled={disabled}>
          {label && (
            <FormLabel display={'flex'}>
              {t(label)}
              {required && <Text color={'red'}>*</Text>}
            </FormLabel>
          )}
          <DatePicker
            timeCaption={t('DATEPICKER.TIME')}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Box
                  as={'button'}
                  onClick={decreaseMonth}
                  mr={'auto'}
                  px="0.9rem"
                  py="1.2rem"
                  disabled={prevMonthButtonDisabled}
                  type={'button'}>
                  <Icon displayName={'chevron-left'} fontSize={'18px'} />
                </Box>

                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }>
                  {months.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }: { target: any }) =>
                    changeYear(value)
                  }>
                  {getYears(minDate, maxDate).map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <Box
                  as={'button'}
                  onClick={increaseMonth}
                  ml={'auto'}
                  disabled={nextMonthButtonDisabled}
                  type={'button'}>
                  <Icon displayName={'chevron-right'} fontSize={'18px'} />
                </Box>
              </div>
            )}
            isClearable={isClearable && !disabled}
            showIcon={true}
            icon={
              <Icon displayName="calendar" color="gray.300" fontSize="1.5rem" />
            }
            selected={selectedDate}
            onChange={onChangeDate}
            placeholderText={t(placeholder)}
            dateFormat={dateFormat}
            minDate={minDate}
            maxDate={maxDate}
            locale="fr"
            excludeDates={rest.listExcludeDates}
            dayClassName={rest.customDayClassName}
            disabled={disabled}
            filterDate={isWeekday}
            {...rest}
          />
          {hasError && <FormErrorMessage>{t(`${error}`)}</FormErrorMessage>}
        </FormControl>
      </Box>
    );
  },
);

export default FullDatePicker;
