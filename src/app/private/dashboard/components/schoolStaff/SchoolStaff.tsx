import CustomCard from '_components/card/CustomCard';
import { Box } from '@chakra-ui/react';
import { cardStyle } from '_theme/cardStyle';
import CommonDataTable from '_components/data-table/components/CommonDataTable';

const SchoolStaff = () => {
  const tableColumns: any[] = [
    {
      header: 'Title',
      accessor: 'type',
      cell: (value: string) => value,
    },
    {
      header: 'Total',
      accessor: 'total',
      cell: (value: any) => value,
    },
  ];
  const fakeSchoolData = [
    {
      type: 'Administration',
      total: 30,
    },

    {
      type: 'Professeurs',
      total: 30,
    },
  ];
  return (
    <Box {...cardStyle}>
      <CustomCard bgColor={'white'} borderRadius={'7px'} padding={'3'}>
        <CommonDataTable
          data={fakeSchoolData}
          columns={tableColumns}
          isLoading={false}
          hidePagination
        />
      </CustomCard>
    </Box>
  );
};
export default SchoolStaff;
