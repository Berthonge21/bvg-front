import React, { FunctionComponent } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Button, Divider, Text } from '@chakra-ui/react';
import { blockContainer, iconContainer } from './socialMedia.styles';
import { Facebook, Instagram, Linkedin } from '_assets/svg';
import { useTranslation } from 'react-i18next';

const goToLink = (url: string) => {
  window?.open(url, '_blank');
};

const links = [
  { icon: Facebook, url: 'http://localhost:8080' },
  { icon: Instagram, url: 'https://localhost:8080' },
  { icon: Linkedin, url: 'http://localhost:8080' },
  { icon: Linkedin, url: 'https://localhost:8080' },
];

const SocialMedia: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}>
      <Text
        fontSize={'17px'}
        fontWeight={800}
        lineHeight={'20.4px'}
        color={'overlay.500'}
        alignContent={'center'}>
        {t('COMMON.FOLLOW_US')}
      </Text>
      <Flex {...blockContainer}>
        {links.map((item, index) => (
          <React.Fragment key={item.url}>
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Button onClick={() => goToLink(item.url)}>
                <item.icon
                  {...iconContainer}
                  width={'14px'}
                  height={'14px'}
                  fill={'white'}
                />
              </Button>
            </Box>
            {index !== links.length - 1 && (
              <Divider
                borderColor={'secondary.500'}
                orientation="vertical"
                width={'0.62px'}
                height={'25px'}
              />
            )}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  );
};

export default SocialMedia;
