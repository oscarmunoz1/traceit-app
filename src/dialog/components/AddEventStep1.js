// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React, { useEffect, useRef, useState } from "react";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Editor from "components/Editor/Editor";
import { FaPlus } from "react-icons/fa";
import IconBox from "components/Icons/IconBox";
import { MdModeEdit } from "react-icons/md";
import Select from "react-select";
import parcel1 from "assets/img/ImageParcel1.png";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed
      ? { ...base, backgroundColor: "gray", borderRadius: "10px" }
      : { ...base, borderRadius: "10px" };
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #E2E8F0",
    borderRadius: "15px",
    boxShadow: "none",
    outline: "2px solid transparent",
    minHeight: "43px",
  }),
};

const orderOptions = (values) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

const AddRecordStep1 = ({ onClose, isOpen, nextTab, onSubmit }) => {
  const { parcelId } = useParams();

  const { register, formState, handleSubmit } = useFormContext();

  // const onSubmit = (data) => {
  //   console.log("dataaaa::", data); // Do something with the form data
  //   nextTab.current.click();
  // };

  const parcels = useSelector((state) =>
    state.company.currentCompany?.establishments.reduce(
      (res_parcels, establishment) => {
        const establishmentParcels = establishment.parcels.map((parcel) => {
          if (parcel.id === Number(parcelId)) {
            return {
              value: parcel.id,
              label: parcel.name,
              isFixed: true,
            };
          }
          return {
            value: parcel.id,
            label: parcel.name,
          };
        });
        return res_parcels.concat(establishmentParcels);
      },
      []
    )
  );

  const options = parcels;

  const [value, setValue] = useState(
    orderOptions(options.filter((v) => v.isFixed))
  );

  const onChange = (newValue, actionMeta) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        newValue = options.filter((v) => v.isFixed);
        break;
    }
    setValue(orderOptions(newValue));
  };

  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const iconColor = useColorModeValue("gray.300", "gray.700");
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");
  const handleAddEvent = () => {
    console.log("Add event");
    onClose();
  };

  return (
    <Card>
      <CardHeader mb="40px">
        <Flex
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          w="80%"
          mx="auto"
        >
          <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
            Let's start with the basic information
          </Text>
          <Text color="gray.400" fontWeight="normal" fontSize="sm">
            Let us know your name and email address. Use an address you don't
            mind other users contacting you at
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w="100%">
          <Flex direction={{ sm: "column", md: "row" }} w="100%">
            <Box
              position="relative"
              minW={{ sm: "200px", xl: "240px" }}
              h={{ sm: "110px", xl: "150px" }}
              mx={{ sm: "5px", md: "10px", xl: "20px" }}
              mb={{ sm: "25px" }}
            >
              <Avatar src={parcel1} w="100%" h="100%" borderRadius="12px" />
              <IconBox
                bg="#fff"
                h="35px"
                w="35px"
                boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.06)"
                position="absolute"
                right="-10px"
                bottom="-10px"
                cursor="pointer"
              >
                <Icon as={MdModeEdit} w="15px" h="15px" color="#333" />
              </IconBox>
            </Box>
            <Stack direction="column" spacing="20px" w="100%">
              <FormControl>
                <Flex direction={"column"} grow={"1"} pr={"32px"}>
                  <FormLabel color={textColor} fontSize="xs" fontWeight="bold">
                    Name
                  </FormLabel>
                  <Input
                    fontSize="xs"
                    ms="4px"
                    borderRadius="15px"
                    type="text"
                    placeholder="Name of the event"
                    {...register("name")}
                    isInvalid={formState.errors.name}
                  />
                  <FormLabel
                    color={textColor}
                    pt={"16px"}
                    ms="4px"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    Date
                  </FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    borderRadius="15px"
                    ms="4px"
                    type="datetime-local"
                    mb="24px"
                    fontSize={"0.758rem;"}
                    {...register("date")}
                    isInvalid={formState.errors.date}
                  />
                </Flex>
              </FormControl>
            </Stack>
          </Flex>
          <FormControl mb="25px">
            <FormLabel ms="4px" fontSize="xs" fontWeight="bold">
              Description
            </FormLabel>
            <Editor />
          </FormControl>
          <FormControl>
            <FormLabel ms="4px" fontSize="xs" fontWeight="bold">
              Select the others Parcels to which the event was applied
            </FormLabel>
            <Select
              value={value}
              isMulti
              styles={styles}
              isClearable={value.some((v) => !v.isFixed)}
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={onChange}
              options={options}
            />
          </FormControl>

          <Button
            variant="no-hover"
            bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
            alignSelf="flex-end"
            mt="24px"
            w={{ sm: "75px", lg: "100px" }}
            h="35px"
            // onClick={() => nextTab.current.click()}
            type="submit"
            onClick={onSubmit}
          >
            <Text fontSize="xs" color="#fff" fontWeight="bold">
              NEXT
            </Text>
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default AddRecordStep1;
