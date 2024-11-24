import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { footerStyles } from '../layout.styles';

const Footer = () => {
  return (
    <Flex {...footerStyles} bgColor={'#F8FAFC'}>
      <Text color={'black'} fontWeight={'800'}>
        BVG-SCHOOL {new Date().getFullYear()} © -- V {}
      </Text>
    </Flex>
  );
};

export default Footer;
