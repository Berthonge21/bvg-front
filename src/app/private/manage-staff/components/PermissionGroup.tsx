import { Box, SimpleGrid } from '@chakra-ui/react';
import { memo, useCallback, FC } from 'react';
import CollapseCheckBox from '_components/checkbox-collapse';
import { ICheckboxElement } from '_components/checkbox-collapse/checkBoxGroup.interface';
import { hexToRGB } from '_theme/colors';
import { isEmpty } from 'lodash';

interface ICollapseCheckBoxGroup {
  groupList: ICheckboxElement[];
  onChange: (data: ICheckboxElement[]) => void;
  defaultValues?: ICheckboxElement[];
}

export const CollapseCheckBoxGroup: FC<ICollapseCheckBoxGroup> = memo(
  ({ groupList, onChange, defaultValues = [] }) => {
    let selectedGroups: ICheckboxElement[] = defaultValues;
    const handleGroupElementSelection = useCallback(
      (element: ICheckboxElement) => {
        const elementIndex = selectedGroups?.findIndex(
          elt => elt.groupName === element.groupName,
        );
        if (elementIndex != -1) {
          const newData = [...selectedGroups];
          if (isEmpty(element.groupElements)) {
            newData.splice(elementIndex, 1);
          } else {
            newData[elementIndex] = element;
          }
          selectedGroups = newData;
          onChange(selectedGroups);
        } else {
          selectedGroups = [...selectedGroups, element];
          onChange(selectedGroups);
        }
      },
      [selectedGroups.length],
    );
    return (
      <Box
        w="100%"
        bg={'white'}
        height={'250px'}
        border={'1px solid'}
        borderRadius={'7px'}
        borderColor={hexToRGB('lightGray', 0.5, 500)}
        padding={5}
        overflow="auto"
        display="flex"
        flexDir={{ base: 'column', sm: 'row' }}
        gap={2}>
        <SimpleGrid
          spacing="20px"
          columns={{ base: 1, sm: 2 }}
          p={'10px 0px'}
          w="100%">
          {groupList?.map((elt: any) => (
            <CollapseCheckBox
              key={elt.groupName}
              checkBoxGroup={{
                groupElements: elt.groupElements,
                groupName: elt.groupName,
              }}
              onSelectGroupElement={handleGroupElementSelection}
              defaultValue={
                defaultValues?.filter(dv => dv.groupName === elt.groupName)[0]
              }
            />
          ))}
        </SimpleGrid>
      </Box>
    );
  },
);
