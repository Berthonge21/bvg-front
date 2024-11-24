import { getI18n } from 'react-i18next';

export const generateMonthlyData = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months.map(month => getI18n().t(`BAR_CHART.MONTHS.${month}`));
};
