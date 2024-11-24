import range from 'lodash/range';
import { getYear } from 'date-fns';
import { useTranslation } from 'react-i18next';

export const useCustomDatePicker = () => {
  const { t } = useTranslation();
  const months = [
    t('BAR_CHART.MONTHS.January'),
    t('BAR_CHART.MONTHS.February'),
    t('BAR_CHART.MONTHS.March'),
    t('BAR_CHART.MONTHS.April'),
    t('BAR_CHART.MONTHS.May'),
    t('BAR_CHART.MONTHS.June'),
    t('BAR_CHART.MONTHS.July'),
    t('BAR_CHART.MONTHS.August'),
    t('BAR_CHART.MONTHS.September'),
    t('BAR_CHART.MONTHS.October'),
    t('BAR_CHART.MONTHS.November'),
    t('BAR_CHART.MONTHS.December'),
  ];

  const getYears = (minDate?: Date, maxDate?: Date): number[] => {
    const minYear = minDate ? getYear(minDate) : 1950;
    const maxYear = maxDate ? getYear(maxDate) + 1 : getYear(new Date()) + 1;
    return range(minYear, maxYear);
  };

  return {
    months,
    getYears,
  };
};
