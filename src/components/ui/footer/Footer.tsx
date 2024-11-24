import { Box, VStack, Text, Flex, Divider, Link } from '@chakra-ui/react';
import React from 'react';
import { SocialLinks } from './socialLinks';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { LogoIcon } from '_assets/svg';

const Footer = () => {
  return (
    <Box p={10} bgColor={'primary.500'}>
      <Flex
        direction={{ base: 'column', sm: 'row', md: 'row' }}
        align={{ base: 'center', md: 'flex-start' }}
        gap={{ base: 10, md: 20 }}>
        <Box
          p={5}
          bgColor={'white'}
          borderRadius={'20px'}
          width={{ base: '100%', sm: '400px', md: '350px' }}>
          <VStack align={'start'} justify={'start'} spacing={3} p={2}>
            <Flex align={'center'} justifyContent={'center'} gap={2}>
              <Box borderRadius="9px" bgColor="#F5F5F5" boxShadow={'lg'}>
                <LogoIcon />
              </Box>
              <Text
                color="black"
                fontSize={{ base: 'xl', sm: '2xl' }}
                fontWeight="extrabold"
                cursor="pointer"
                onClick={() => window.location.reload()}>
                BVG - INNOVATION
              </Text>
            </Flex>

            <Flex gap={4} direction={'column'}>
              <Text color="black">
                Avenue Ibn Khaldoun, Suisse, 4000 Tunisie
              </Text>
              <Text color="black">TN: +216 51 719 140</Text>
              <Text color="black">email: contact@bvg-innovation.tech</Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>

      <Box mt={'20px'}>
        <Flex align={'flex-start'} justify={{ base: 'center', md: 'flex-end' }}>
          <Divider width={{ base: '100%', md: '100%' }} />
        </Flex>
      </Box>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify={{ base: 'flex-start', md: 'space-between' }}
        width={{ base: '100%', md: '80%', lg: '60%', '2xl': '35%' }}
        mt={'10px'}>
        <Flex
          align={{ base: 'flex-start', md: 'center' }}
          justify={{ base: 'flex-start', md: 'center' }}
          mb={{ base: 5, md: 0 }}>
          <Flex gap={5}>
            <Text color={'white'}>Suivez-nous : </Text>
            {SocialLinks?.map((links, index) => (
              <CustomTooltip
                placement={'bottom-start'}
                label={links.title}
                key={index}>
                <Link
                  key={index}
                  href={links.link}
                  isExternal
                  aria-label={links.title}>
                  {links.icon}
                </Link>
              </CustomTooltip>
            ))}
          </Flex>
        </Flex>
        <Box width={{ base: '100%', md: '50%' }}>
          <Text color={'white'} fontSize={'16px'}>
            Copyright © 2024 BVG-INNOVATION
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
