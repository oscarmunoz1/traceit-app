// Chakra imports
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import BgSignUp from 'assets/img/basic-auth.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type BoxBackgroundProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

function BoxBackground(props: BoxBackgroundProps) {
  const { title, subtitle, children } = props;

  return (
    <Flex direction="column" alignSelf="center" justifySelf="center" alignItems="center">
      <Box
        position="absolute"
        minH={{ base: '70vh', md: '50vh' }}
        borderRadius="15px"
        left="0"
        right="0"
        bgRepeat="no-repeat"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mt={{ base: '130px', md: '100px' }}
        marginInlineStart={'25px'}
        marginInlineEnd={'25px'}></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        width={'100%'}
        pt={'55px'}>
        <Text
          fontSize="4xl"
          color="white"
          marginInlineStart="25px"
          marginInlineEnd="25px"
          fontWeight="bold">
          {title}
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: '90%', sm: '60%', lg: '40%', xl: '25%' }}>
          {subtitle}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px" w="100%">
        {children}
      </Flex>
    </Flex>
  );
}

export default BoxBackground;
