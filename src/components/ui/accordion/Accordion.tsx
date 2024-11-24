import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
} from '@chakra-ui/react';
import { ArrowDownCircle, ArrowUpCircle } from '_assets/svg';
import { Colors } from '_theme/variables';
import { accordionStyle, ButtonStyle } from './accordion.styles';
import { CustomCheckbox } from '_components/checkbox/checkbox';
import React from 'react';

const CustomAccordion = ({
  title,
  children,
  displayCheckbox,
  name,
  checked,
  handleChange,
}: {
  title: string;
  children: React.ReactNode;
  displayCheckbox?: boolean;
  name?: string;
  checked?: boolean;
  handleChange?: any;
}) => {
  return (
    <Accordion height={'100%'} borderRadius="7px" allowToggle shadow={'lg'}>
      <AccordionItem {...accordionStyle} border={'none'}>
        {({ isExpanded }) => (
          <>
            <AccordionButton {...ButtonStyle}>
              <>
                {displayCheckbox ? (
                  <Flex
                    gap={'10px'}
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <CustomCheckbox
                      name={name}
                      isChecked={checked}
                      onChangeFunc={handleChange}
                    />
                    <Text fontSize={'16px'} fontWeight={'700'}>
                      {title}
                    </Text>
                  </Flex>
                ) : (
                  <Text fontSize={'16px'} fontWeight={'bold'}>
                    {title}
                  </Text>
                )}
              </>
              {isExpanded ? (
                <ArrowDownCircle
                  width="24px"
                  height="24px"
                  fill={Colors.grayScale}
                />
              ) : (
                <ArrowUpCircle
                  width="24px"
                  height="24px"
                  fill={Colors.grayScale}
                />
              )}
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Flex
                style={{
                  display: 'flex',
                  justifyContent: 'normal',
                  alignItems: 'flex-start',
                }}
                gap={'20px'}
                mb={'5px'}>
                {children}
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CustomAccordion;
