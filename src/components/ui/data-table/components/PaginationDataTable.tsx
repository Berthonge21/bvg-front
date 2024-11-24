import React, { FC, useCallback, useState } from 'react';
import { PaginationProps } from '../types/data-table.type';
import { usePagination } from '../hooks/usePagination';
import { Flex, Text, Box, Input, Select } from '@chakra-ui/react';
import {
  ArrowDoubleLeftIcon,
  ArrowDoubleRightIcon,
  ArrowDropLeftIcon,
  ArrowDropRightIcon,
} from '_assets/svg';
import { Colors } from '_theme/variables';
import { useTranslation } from 'react-i18next';

const PaginationDataTable: FC<PaginationProps> = ({
  table,
  totalPage,
  pageSize,
  currentPage,
  lazy,
  onLazyLoad,
}) => {
  if (lazy && (totalPage === undefined || currentPage === undefined)) {
    throw new Error(
      'With lazy loading, totalPage and current Page are required',
    );
  }

  const [currentIndexPage, setCurrentIndexPage] = useState<number>(
    !lazy ? 1 : currentPage!,
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(pageSize || 5); // Initial number of items per page

  const paginationRange = usePagination({
    totalCount: !lazy ? table.getPageCount() : totalPage,
    pageSize: itemsPerPage,
    siblingCount: 1,
    currentPage: currentIndexPage,
  });

  const { t } = useTranslation();

  const handleClick = useCallback(
    (index: number | string) => {
      if (index !== '...') {
        if (index === 'previous') {
          table.previousPage();
          setCurrentIndexPage(value => value - 1);
          onLazyLoad?.(currentIndexPage - 1);
        } else if (index === 'next') {
          table.nextPage();
          setCurrentIndexPage(value => value + 1);
          onLazyLoad?.(currentIndexPage + 1);
        } else {
          setCurrentIndexPage(+index);
          table.setPageIndex(+index - 1);
          onLazyLoad?.(+index);
        }
      }
    },
    [currentIndexPage, table, onLazyLoad],
  );

  const [inputPageValue, setInputPageValue] = useState<string>(
    currentIndexPage.toString(),
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPageValue(event.target?.value);
  };

  const handleGoToPage = () => {
    const page = Number(inputPageValue);
    if (!isNaN(page) && page > 0 && page <= totalPage!) {
      setCurrentIndexPage(page);
      table.setPageIndex(page - 1);
      onLazyLoad?.(page);
    } else {
      setInputPageValue(currentIndexPage.toString());
    }
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newPageSize = Number(event.target.value);
    setItemsPerPage(newPageSize);
    table.setPageSize(newPageSize);
    onLazyLoad?.(currentIndexPage);
  };

  const getCanPreviousPage = () => {
    return !lazy ? !table.getCanPreviousPage() : currentIndexPage <= 1;
  };
  const getCanNextPage = () => {
    return !lazy ? !table.getCanNextPage() : currentIndexPage >= totalPage!;
  };

  return (
    <Flex alignItems="center" justifyContent="space-between" w="full">
      <Flex>
        <Box
          as={'button'}
          onClick={() => handleClick(paginationRange[0])}
          px="0.9rem"
          py="1.2rem"
          cursor={'pointer'}
          disabled={getCanPreviousPage()}>
          <ArrowDoubleLeftIcon
            width="24px"
            height="24px"
            fill={currentIndexPage === 1 ? Colors.grayScale : Colors.primary}
          />
        </Box>
        <Box
          as={'button'}
          onClick={() => handleClick('previous')}
          px="0.9rem"
          py="1.2rem"
          disabled={getCanPreviousPage()}>
          <ArrowDropLeftIcon
            width="24px"
            height="24px"
            fill={currentIndexPage === 1 ? Colors.grayScale : Colors.primary}
          />
        </Box>
        <Box
          as={'button'}
          onClick={() => handleClick('next')}
          px="0.9rem"
          py="1.2rem"
          cursor={'pointer'}
          disabled={getCanNextPage()}>
          <ArrowDropRightIcon
            width="24px"
            height="24px"
            fill={
              currentIndexPage >= 1
                ? currentIndexPage === totalPage
                  ? Colors.grayScale
                  : Colors.primary
                : ''
            }
          />
        </Box>
        <Box
          as={'button'}
          onClick={() => handleClick(totalPage!)}
          px="0.9rem"
          py="1.2rem"
          cursor={'pointer'}
          disabled={getCanNextPage()}>
          <ArrowDoubleRightIcon
            width="24px"
            height="24px"
            fill={
              currentIndexPage >= 1
                ? currentIndexPage === totalPage
                  ? Colors.grayScale
                  : Colors.primary
                : ''
            }
          />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          px="0.9rem"
          py="1.2rem"
          gap={3}
          rounded="0">
          <Text color="primary.500">
            {t('COMMON.PAGE')} {currentIndexPage} {t('COMMON.TO')} {totalPage}
          </Text>
        </Box>
      </Flex>
      <Flex alignItems={'center'} gap={5}>
        <Flex alignItems={'center'} gap={2}>
          <Text>{t('COMMON.GO_TO_PAGE')}</Text>
          <Input
            type="number"
            min={1}
            max={totalPage}
            value={inputPageValue}
            onChange={handleInputChange}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleGoToPage();
              }
            }}
            width={'50px'}
          />
        </Flex>
        <Flex alignItems={'center'}>
          <Text>{t('ACTION_BUTTON.VIEW')}</Text>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            border={'none'}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Select>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PaginationDataTable;
