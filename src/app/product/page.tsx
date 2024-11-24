'use client';

import { Box } from '@chakra-ui/react';
import ProductHeader from './components/ProductHeader';
import Footer from '_components/footer/Footer';
import Product from '_app/product/components/Product';

const ProductHome = () => {
  return (
    <Box>
      <ProductHeader />
      {/*<Box>*/}
      {/*  <Header*/}
      {/*    title={'Simplifiez la Gestion'}*/}
      {/*    subTitle={'de votre école avec MySchool'}*/}
      {/*    description={*/}
      {/*      'Tous les outils dont vous avez besoin pour gérer vos actifs en un seul endroit.'*/}
      {/*    }*/}
      {/*    buttonContact={'commencer'}*/}
      {/*    lightImage={'/assets/images/sass.png'}*/}
      {/*    darkImage={'/assets/images/sass.png'}*/}
      {/*  />*/}
      {/*</Box>*/}
      {/*<Box>*/}
      {/*  <ServicesSection />*/}
      {/*</Box>*/}
      <Box mt={50}>
        <Product />
      </Box>
      {/*</Box>*/}
      {/*<Box mt={50}>*/}
      {/*  <BVGHistory />*/}
      {/*</Box>*/}
      <Box mt={50}>
        <Footer />
      </Box>
    </Box>
  );
};

export default ProductHome;
