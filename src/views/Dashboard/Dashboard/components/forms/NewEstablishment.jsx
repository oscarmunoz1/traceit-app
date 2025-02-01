/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { Form, FormProvider, useForm } from 'react-hook-form';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { clearForm, setForm } from 'store/features/formSlice';
import { object, string } from 'zod';
import { useDispatch, useSelector } from 'react-redux';

import { BsCircleFill } from 'react-icons/bs';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardWithMap from '../CardWithMap';
// Custom components
import Editor from 'components/Editor/Editor';
import FormInput from 'components/Forms/FormInput';
import FormLayout from 'components/Forms/FormLayout';
import Header from 'views/Pages/Profile/Overview/components/Header';
import ProfileBgImage from 'assets/img/ProfileBackground.png';
import { addCompanyEstablishment } from 'store/features/companySlice';
import avatar4 from 'assets/img/avatars/avatar4.png';
import imageMap from 'assets/img/imageMap.png';
import { useCreateEstablishmentMutation } from 'store/api/companyApi';
import { useDropzone } from 'react-dropzone';
import { useGoogleMap } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIntl } from 'react-intl';
const formSchemaInfo = object({
  name: string().min(1, 'Name is required'),
  country: string().min(1, 'Country is required'),
  state: string().min(1, 'State is required'),
  city: string().min(1, 'City is required'),
  address: string().min(1, 'Address is required'),
  zone: string()
});

const formSchemaDescription = object({
  description: string().min(1, 'Description is required')
});

const formSchemaSocials = object({
  facebook: string(),
  instagram: string()
});

const formSchema = object({
  name: string().min(1, 'Name is required'),
  country: string().min(1, 'Country is required'),
  state: string().min(1, 'State is required'),
  city: string().min(1, 'City is required'),
  zone: string(),
  description: string().min(1, 'Description is required'),
  facebook: string(),
  instagram: string()
});

const reducer = (state, action) => {
  if (action.type === 'SWITCH_ACTIVE') {
    if (action.payload === 'overview') {
      const newState = {
        overview: true,
        teams: false,
        projects: false
      };
      return newState;
    } else if (action.payload === 'teams') {
      const newState = {
        overview: false,
        teams: true,
        projects: false
      };
      return newState;
    } else if (action.payload === 'projects') {
      const newState = {
        overview: false,
        teams: false,
        projects: true
      };
      return newState;
    }
  }
  return state;
};

function NewEstablishment() {
  const bgColor = useColorModeValue('white', 'gray.700');
  const dispatch = useDispatch();
  const currentEstablishment = useSelector((state) => state.form.currentForm?.establishment);
  const navigate = useNavigate();
  const currentCompany = useSelector((state) => state.company.currentCompany);
  const intl = useIntl();
  const [skills, setSkills] = useState([
    {
      name: 'chakra-ui',
      id: 1
    },
    {
      name: 'react',
      id: 2
    },
    {
      name: 'javascript',
      id: 3
    }
  ]);

  const [activeBullets, setActiveBullets] = useState({
    mainInfo: true,
    description: false,
    media: false,
    socials: false
  });

  const mainInfoTab = useRef();
  const descriptionTab = useRef();
  const mediaTab = useRef();
  const socialsTab = useRef();

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      setSkills([
        ...skills,
        {
          name: e.target.value,
          id: skills.length === 0 ? 1 : skills[skills.length - 1].id + 1
        }
      ]);
      e.target.value = '';
    }
  };

  // Chakra color mode
  const textColor = useColorModeValue('gray.700', 'white');
  const bgPrevButton = useColorModeValue('gray.100', 'gray.100');
  const bgProfile = useColorModeValue(
    'hsla(0,0%,100%,.8)',
    'linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)'
  );

  const infoMethods = useForm({
    resolver: zodResolver(formSchemaInfo)
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = infoMethods;

  const descriptionMethods = useForm({
    resolver: zodResolver(formSchemaDescription)
  });

  const { reset: descriptionReset, handleSubmit: descriptionSubmit } = descriptionMethods;

  const socialsMethods = useForm({
    resolver: zodResolver(formSchemaSocials)
  });

  const { reset: socialsReset, handleSubmit: socialsSubmit } = socialsMethods;

  const onSubmitInfo = (data) => {
    dispatch(setForm({ establishment: data }));
    descriptionTab.current.click();
  };

  const onSubmitDescription = (data) => {
    dispatch(
      setForm({
        establishment: {
          ...currentEstablishment,
          description: data.description
        }
      })
    );
    mediaTab.current.click();
  };

  const [
    createEstablishment,
    {
      data: dataEstablishment,
      error: errorEstablishment,
      isSuccess: isSuccessEstablishment,
      isLoading: isLoadingEstablishment
    }
  ] = useCreateEstablishmentMutation();

  const onSubmitSocials = (data) => {
    dispatch(
      setForm({
        establishment: {
          ...currentEstablishment,
          ...(data?.facebook && { facebook: data.facebook }),
          ...(data?.instagram && { instagram: data.instagram })
        }
      })
    );
    createEstablishment({
      companyId: currentCompany.id,
      establishment: {
        ...currentEstablishment,
        album: { images: acceptedFiles },
        ...(data?.facebook && { facebook: data.facebook }),
        ...(data?.instagram && { instagram: data.instagram }),
        company: currentCompany.id
      }
    });
  };

  useEffect(() => {
    if (isSuccessEstablishment) {
      dispatch(addCompanyEstablishment(dataEstablishment));
      dispatch(clearForm());
      navigate(`/admin/dashboard/establishment/${dataEstablishment.id}`);
    }
  }, [isSuccessEstablishment]);

  const tabsList = [
    {
      ref: mainInfoTab,
      name: 'mainInfo',
      label: intl.formatMessage({ id: 'app.mainInfo' }),
      nextTab: 'description',
      onClick: () =>
        setActiveBullets({
          mainInfo: true,
          description: false,
          media: false,
          socials: false
        })
    },
    {
      ref: descriptionTab,
      name: 'description',
      label: intl.formatMessage({ id: 'app.description' }),
      nextTab: 'media',
      onClick: () =>
        setActiveBullets({
          mainInfo: true,
          description: true,
          media: false,
          socials: false
        })
    },
    {
      ref: mediaTab,
      name: 'media',
      label: intl.formatMessage({ id: 'app.media' }),
      nextTab: 'socials',
      onClick: () =>
        setActiveBullets({
          mainInfo: true,
          description: true,
          media: true,
          socials: false
        })
    },
    {
      ref: socialsTab,
      name: 'socials',
      label: intl.formatMessage({ id: 'app.socials' }),
      onClick: () =>
        setActiveBullets({
          mainInfo: true,
          description: true,
          media: true,
          socials: true
        })
    }
  ];

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    // onDrop,
    // accept: "image/*", // Accepted file types
    maxFiles: 5 // Maximum number of files
    // maxSize: 1024 * 1024 * 5, // Maximum file size (5 MB)
  });

  return (
    <FormLayout tabsList={tabsList} activeBullets={activeBullets}>
      <TabPanel>
        <Card>
          <CardHeader mb="22px">
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              {intl.formatMessage({ id: 'app.establishmentInfo' })}
            </Text>
          </CardHeader>
          <CardBody>
            <FormProvider {...infoMethods}>
              <form onSubmit={handleSubmit(onSubmitInfo)} style={{ width: '100%' }}>
                <Stack direction="column" spacing="20px" w="100%">
                  <Stack direction={{ sm: 'column', md: 'row' }} spacing="30px">
                    <FormControl>
                      <FormInput
                        name="name"
                        label={intl.formatMessage({ id: 'app.name' })}
                        placeholder={intl.formatMessage({ id: 'app.establishmentName' })}
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormInput
                        name="country"
                        label={intl.formatMessage({ id: 'app.country' })}
                        placeholder={intl.formatMessage({ id: 'app.establishmentCountry' })}
                        fontSize="xs"
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction={{ sm: 'column', md: 'row' }} spacing="30px">
                    <FormControl>
                      <FormInput
                        name="state"
                        label={intl.formatMessage({ id: 'app.state' })}
                        placeholder={intl.formatMessage({ id: 'app.establishmentState' })}
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormInput
                        name="city"
                        label="City"
                        placeholder="Establishment city"
                        fontSize="xs"
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction={{ sm: 'column', md: 'row' }} spacing="30px">
                    <FormControl>
                      <FormInput
                        name="address"
                        label={intl.formatMessage({ id: 'app.address' })}
                        placeholder={intl.formatMessage({ id: 'app.establishmentAddress' })}
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormInput
                        name="zone"
                        label={intl.formatMessage({ id: 'app.zone' })}
                        placeholder={intl.formatMessage({ id: 'app.establishmentZone' })}
                        fontSize="xs"
                      />
                    </FormControl>
                  </Stack>

                  <Button
                    variant="no-hover"
                    bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                    alignSelf="flex-end"
                    mt="24px"
                    w="100px"
                    h="35px"
                    type="submit">
                    <Text fontSize="xs" color="#fff" fontWeight="bold">
                      {intl.formatMessage({ id: 'app.next' })}
                    </Text>
                  </Button>
                </Stack>
              </form>
            </FormProvider>
          </CardBody>
        </Card>
      </TabPanel>

      <TabPanel>
        <Card>
          <CardHeader mb="32px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              {intl.formatMessage({ id: 'app.description' })}
            </Text>
          </CardHeader>
          <CardBody>
            <FormProvider {...descriptionMethods}>
              <form onSubmit={descriptionSubmit(onSubmitDescription)} style={{ width: '100%' }}>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="20px" w="100%">
                    <Editor />
                  </Stack>
                  <Flex justify="space-between">
                    <Button
                      variant="no-hover"
                      bg={bgPrevButton}
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      onClick={() => mainInfoTab.current.click()}>
                      <Text fontSize="xs" color="gray.700" fontWeight="bold">
                        {intl.formatMessage({ id: 'app.prev' })}
                      </Text>
                    </Button>
                    <Button
                      variant="no-hover"
                      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      type="submit">
                      <Text fontSize="xs" color="#fff" fontWeight="bold">
                        {intl.formatMessage({ id: 'app.next' })}
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </FormProvider>
          </CardBody>
        </Card>
      </TabPanel>
      <TabPanel>
        <Card>
          <CardHeader mb="22px">
            <Text color={textColor} fontSize="xl" fontWeight="bold" mb="3px">
              {intl.formatMessage({ id: 'app.media' })}
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="column" w="100%">
              <Text color={textColor} fontSize="sm" fontWeight="bold" mb="12px">
                {intl.formatMessage({ id: 'app.parcelImages' })}
              </Text>
              <Flex
                align="center"
                justify="center"
                border="1px dashed #E2E8F0"
                borderRadius="15px"
                w="100%"
                maxWidth={'980px'}
                cursor="pointer"
                overflowY={'auto'}
                minH={'175px'}
                {...getRootProps({ className: 'dropzone' })}>
                <Input {...getInputProps()} />
                <Button variant="no-hover">
                  {acceptedFiles.length > 0 ? (
                    <Flex gap="20px" p="20px" flexWrap={'wrap'}>
                      {acceptedFiles.map((file, index) => (
                        <Box key={index}>
                          <img
                            src={URL.createObjectURL(file)} // Create a preview URL for the image
                            alt={file.name}
                            style={{
                              width: '150px',
                              height: '100px',
                              borderRadius: '15px',
                              objectFit: 'contain'
                            }}
                          />
                          <Text
                            color="gray.400"
                            fontWeight="normal"
                            maxWidth="150px"
                            textOverflow={'ellipsis'}
                            overflow={'hidden'}>
                            {file.name}
                          </Text>
                        </Box>
                      ))}
                    </Flex>
                  ) : (
                    <Text color="gray.400" fontWeight="normal">
                      {intl.formatMessage({ id: 'app.dropFilesHereToUpload' })}
                    </Text>
                  )}
                </Button>
              </Flex>
              <Flex justify="space-between">
                <Button
                  variant="no-hover"
                  bg={bgPrevButton}
                  alignSelf="flex-end"
                  mt="24px"
                  w="100px"
                  h="35px"
                  onClick={() => descriptionTab.current.click()}>
                  <Text fontSize="xs" color="gray.700" fontWeight="bold">
                    {intl.formatMessage({ id: 'app.prev' })}
                  </Text>
                </Button>
                <Button
                  variant="no-hover"
                  bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                  alignSelf="flex-end"
                  mt="24px"
                  w="100px"
                  h="35px"
                  onClick={() => socialsTab.current.click()}>
                  <Text fontSize="xs" color="#fff" fontWeight="bold">
                    {intl.formatMessage({ id: 'app.next' })}
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </TabPanel>
      <TabPanel maxW="800px">
        <Card>
          <CardHeader mb="32px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              {intl.formatMessage({ id: 'app.socials' })}
            </Text>
          </CardHeader>
          <CardBody>
            <FormProvider {...socialsMethods}>
              <form onSubmit={socialsSubmit(onSubmitSocials)} style={{ width: '100%' }}>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="20px" w="100%">
                    <FormControl>
                      <FormInput
                        name="facebook"
                        label={intl.formatMessage({ id: 'app.facebookAccount' })}
                        placeholder="https://"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormInput
                        name="instagram"
                        label={intl.formatMessage({ id: 'app.instagramAccount' })}
                        placeholder="https://"
                        fontSize="xs"
                      />
                    </FormControl>
                  </Stack>
                  <Flex justify="space-between">
                    <Button
                      variant="no-hover"
                      bg={bgPrevButton}
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      onClick={() => mediaTab.current.click()}>
                      <Text fontSize="xs" color="gray.700" fontWeight="bold">
                        {intl.formatMessage({ id: 'app.prev' })}
                      </Text>
                    </Button>

                    <Button
                      variant="no-hover"
                      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      type="submit">
                      <Text fontSize="xs" color="#fff" fontWeight="bold">
                        {intl.formatMessage({ id: 'app.send' })}
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </FormProvider>
          </CardBody>
        </Card>
      </TabPanel>
    </FormLayout>
  );
}

export default NewEstablishment;
