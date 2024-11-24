import { Box } from '@chakra-ui/react';
import { cardStyle } from '_theme/cardStyle';
import CustomCard from '_components/card/CustomCard';
import CommonDataTable from '_components/data-table/components/CommonDataTable';
import { useTranslation } from 'react-i18next';

const StudentByCycle = () => {
  const { t } = useTranslation();
  const tableColumns: any[] = [
    {
      header: 'Cycle',
      accessor: 'cycle',
      cell: (value: string) => value,
    },
    {
      header: 'Girls',
      accessor: 'girls',
      cell: (value: any) => value,
    },
    {
      header: 'Boys',
      accessor: 'boys',
      cell: (value: any) => value,
    },
    {
      header: 'Total',
      accessor: 'average',
      cell: (value: any) => value,
    },
  ];
  const fakeSchoolData = [
    {
      cycle: 'Cycle 1',
      girls: 10,
      boys: 20,
      average: 30,
    },
    {
      cycle: 'Cycle 2',
      girls: 20,
      boys: 30,
      average: 25,
    },
    {
      cycle: 'Cycle 3',
      girls: 30,
      boys: 40,
      average: 30,
    },
  ];
  return (
    <Box {...cardStyle}>
      <CustomCard
        bgColor={'white'}
        borderRadius={'7px'}
        padding={'3'}
        height={'100%'}>
        <CommonDataTable
          title={t('BAR_CHART.STUDENT_BY_CYCLE')}
          data={fakeSchoolData}
          columns={tableColumns}
          isLoading={false}
          hidePagination
        />
      </CustomCard>
    </Box>
  );
};

export default StudentByCycle;
