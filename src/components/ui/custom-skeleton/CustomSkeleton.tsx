import { Flex, Tbody, Thead, Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  StyledTr,
  StyledTd,
  StyledTh,
  StyledTable,
} from '_theme/dataTableStyles';

export const LoaderType = {
  PACK_LIST: 'packList',
  BAR_CHART: 'barChart',
  LINE_CHART: 'lineChart', // Ajout du type LineChart
  TABLE: 'table',
  CARD: 'card',
  ACCOUNT_CARD: 'accountCard',
  DONUT_CHART: 'donutChart',
} as const;

type LoaderType = (typeof LoaderType)[keyof typeof LoaderType];

interface CustomSkeletonProps {
  props?: SkeletonProps;
  type?: LoaderType;
  tableColumns?: number;
  tableRows?: number;
  width?: string | number;
  height?: string | number;
  statisticBars?: number;
  count?: number;
}

const CustomSkeleton: FunctionComponent<CustomSkeletonProps> = ({
  tableColumns,
  tableRows = 5,
  type,
  width,
  height = '',
  count,
  statisticBars = 12,
}) => {
  const DefaultBlockLoader = <Skeleton count={count ?? 2.5} />;

  const BoxLoader = <Skeleton height={height} width={width} />;

  const TableLoader = (
    <StyledTable>
      <Thead>
        <StyledTr>
          {Array.from({ length: tableColumns || 1 }, (_, i) => (
            <StyledTh key={`Thead-${i}`}>
              <Box w={'100%'}>
                <Skeleton />
              </Box>
            </StyledTh>
          ))}
        </StyledTr>
      </Thead>
      <Tbody minH={'190px'}>
        {Array.from({ length: tableRows || 1 }, (_, j) => (
          <StyledTr key={`StyledTr-${j}`}>
            {Array.from({ length: tableColumns || 1 }, ($, k) => (
              <StyledTd key={`StyledTd-${j}-${k}`}>
                <Box w={'100%'}>
                  <Skeleton />
                </Box>
              </StyledTd>
            ))}
          </StyledTr>
        ))}
      </Tbody>
    </StyledTable>
  );

  const PackListLoader = (
    <Flex gap={4}>
      {Array.from({ length: 3 }, (_, index) => (
        <Box key={`Pack-${index}`} w={width} p={4}>
          <Skeleton height={height} />
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <Skeleton count={2} />
        </Box>
      ))}
    </Flex>
  );

  const CardLoader = (
    <Box w={width || '293px'} lineHeight={10} p={3}>
      <Skeleton width={100} height={30} />
      <Skeleton width={200} />
      <Flex gap={5} lineHeight={5} mt={20}>
        <Box w={'100%'}>
          <Skeleton count={2} />
        </Box>
        <Box w={'100%'}>
          <Skeleton count={2} />
        </Box>
        <Box w={'50px'}>
          <Skeleton width={30} height={30} />
        </Box>
      </Flex>
    </Box>
  );

  const AccountCardLoader = (
    <Box w={width || '233px'} border={'1px solid'} borderRadius={'7px'} p={5}>
      <Flex alignItems={'center'} gap={5} mb={2}>
        <Box>
          <Skeleton circle={true} width={50} height={50} />
        </Box>
        <Box w={'100%'}>
          <Skeleton count={2} />
        </Box>
      </Flex>
      <Skeleton width={'50%'} />
      <Skeleton count={2} />
    </Box>
  );

  const BarChartLoader = (
    <Flex
      transform={'scaleY(-1)'}
      h={height || '200px'}
      p={5}
      justifyContent={'space-between'}
      position={'relative'}>
      {Array.from({ length: statisticBars }, (_, index) => (
        <Flex gap={2} key={`index-${index}`}>
          <Skeleton width={20} height={'100%'} />
          <Skeleton width={20} height={'calc(100% - 50px)'} />
          <Skeleton width={20} height={'calc(100% - 100px)'} />
        </Flex>
      ))}
    </Flex>
  );

  const LineChartLoader = (
    <Box
      w={width || '100%'}
      h={height || '200px'}
      position="relative"
      borderRadius="7px">
      <Skeleton width={'100%'} height={'100%'} borderRadius="7px" />
    </Box>
  );

  const DonutChartLoader = (
    <Box
      height={height || '250px'}
      width={width || '250px'}
      position="relative"
      p={3}>
      <Skeleton circle={true} width="100%" height="90%" />
      <Box
        position="absolute"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="50%"
        height="50%"
        bg="white"
        zIndex={1}
        borderRadius="50%"
      />
    </Box>
  );

  function renderSkeletonSwitch(param: LoaderType) {
    switch (param) {
      case LoaderType.TABLE:
        return TableLoader;
      case LoaderType.CARD:
        return CardLoader;
      case LoaderType.ACCOUNT_CARD:
        return AccountCardLoader;
      case LoaderType.PACK_LIST:
        return PackListLoader;
      case LoaderType.BAR_CHART:
        return BarChartLoader;
      case LoaderType.LINE_CHART:
        return LineChartLoader;
      case LoaderType.DONUT_CHART:
        return DonutChartLoader;
      default:
        return DefaultBlockLoader;
    }
  }

  return renderSkeletonSwitch(type ?? LoaderType.TABLE);
};

export default CustomSkeleton;
