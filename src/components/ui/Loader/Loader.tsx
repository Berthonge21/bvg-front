import { Box, BoxProps, Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import { keyframes } from '@emotion/react';
import { useSelector } from 'react-redux';
import { BVGCommonModule } from '_store/src/modules';

const loaderRight = keyframes`
  0% {
    transform: translateX(-300%);
    opacity: 0;
  }
  25% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  75% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-300%);
    opacity: 0;
  }
 `;
const loaderLeft = keyframes`
  0% {
    transform: translateX(300%);
    opacity: 0;
  }
  25% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  75% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(300%);
    opacity: 0;
  }
 `;
const loaderRotation = keyframes`
  0% {
    transform: rotateZ(0);
    opacity: 0;
  }
  25% {
    transform: rotateZ(0deg);
    opacity: 1;
  }
  50% {
    transform: rotateZ(270deg);
    opacity: 1;
  }
  75% {
    transform: rotateZ(0deg);
    opacity: 1;
  }
  100% {
    transform: rotateZ(0);
    opacity: 0;
  }
`;

const loaderAnimation = keyframes`
  0% {
    transform: translateX(-300%) scale(1);
    opacity: 0;
  }
  25% {
    transform: translateX(0%) scale(1.5);
    opacity: 1;
  }
  50% {
    transform: translateX(0%) scale(2);
    opacity: 1;
  }
  75% {
    transform: translateX(0%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(300%) scale(1);
    opacity: 0;
  }
`;

interface LoaderProps extends BoxProps {
  backDrop?: boolean;
  fullScreen?: boolean;
  show?: boolean;
}
const Loader: FC<LoaderProps> = ({
  backDrop = true,
  fullScreen = false,
  show = false,
  ...props
}) => {
  // const animationRight = `${loaderRight} 2s infinite`;
  //const animationLeft = `${loaderLeft} 2s infinite`;
  //const rotation = `${loaderRotation} 2s infinite`;
  const animation = `${loaderAnimation} 3s infinite ease-in-out`;
  const showLoader = useSelector(BVGCommonModule.selectors.getLoaderSelector);
  return (
    (showLoader || show) && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w={fullScreen ? '100vw' : 'full'}
        h={fullScreen ? '100vh' : 'full'}
        position={'fixed'}
        top={0}
        left={0}
        zIndex={13}
        {...props}>
        {backDrop && (
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            background="rgba(10,16,16,0.85)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="9"
          />
        )}
        <Box zIndex={13}>
          <Image
            src={'/assets/images/BVG_Black.png'}
            animation={animation}
            alt="loader-animation"
          />
        </Box>
      </Box>
    )
  );
};

export default Loader;
