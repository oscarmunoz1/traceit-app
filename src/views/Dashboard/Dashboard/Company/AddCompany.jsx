// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BgSignUp from 'assets/img/backgroundImage.png';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import EditParcel from '../components/forms/EditParcel';
import FormInput from 'components/Forms/FormInput';
import NewCompany from '../components/forms/NewCompany';
import NewParcel from '../components/forms/NewParcel';
import { useSignUpMutation } from 'store/api/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIntl } from 'react-intl';

function AddCompany({ isEdit = false }) {
  const intl = useIntl();
  const titleColor = useColorModeValue('green.500', 'green.400');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const bgIcons = useColorModeValue('green.200', 'rgba(255, 255, 255, 0.5)');
  const navigate = useNavigate();

  return (
    <Flex direction="column" alignSelf="center" justifySelf="center" overflow="hidden">
      <Box
        position="absolute"
        minH={{ base: '70vh', md: '50vh' }}
        borderRadius={{ md: '15px' }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        marginInlineEnd={'25px'}
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'linear-gradient(180deg, rgba(0,128,0,0.85) 0%, rgba(0,128,0,0.6) 100%)',
          borderRadius: '15px',
          zIndex: 0
        }}
        bgSize="cover"
        mt={{ md: '100px' }}
        marginInlineStart={'25px'}
        marginInlineEnd={'25px'}></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        pt={'55px'}>
        <Text fontSize="4xl" color="white" fontWeight="bold">
          {isEdit
            ? intl.formatMessage({ id: 'app.editCompany' })
            : intl.formatMessage({ id: 'app.createCompany' })}
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: '90%', sm: '60%', lg: '40%', xl: '25%' }}>
          {isEdit
            ? intl.formatMessage({ id: 'app.modifyForm' })
            : intl.formatMessage({ id: 'app.completeForm' })}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <NewCompany />
      </Flex>
    </Flex>
  );
}

export default AddCompany;
