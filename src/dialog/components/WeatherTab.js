// Chakra imports
import {
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Select,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
// Custom components
import React, { useState } from "react";
import { number, object, string } from "zod";

import { FaPlus } from "react-icons/fa";
import FormInput from "components/Forms/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = object({
  type: string().min(1, "Type is required"),
  temperature: string()
    .optional()
    .transform((val) => Number(val)),
  humidity: string()
    .optional()
    .transform((val) => Number(val)),
  startDate: string().optional(),
  endDate: string().optional(),
  observations: string().optional(),
});

const WeatherTab = ({ onSubmitHandler, isLoading }) => {
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("gray.300", "gray.700");

  const methods = useForm({
    resolver: zodResolver(formSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const onSubmit = (data) => {
    onSubmitHandler(data);
  };

  return (
    <FormControl>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <FormLabel ms="4px" fontSize="xs" fontWeight="bold">
            Type
          </FormLabel>
          <Select
            placeholder="Select option"
            placeholderTextColor="red"
            css={{ "&::placeholder": { color: "red" } }}
            mb={errors.type ? "12px" : "24px"}
            borderColor={errors.type && "red.500"}
            boxShadow={errors.type && "0 0 0 1px red.500"}
            borderWidth={errors.type && "2px"}
            ml="4px"
            height={"3rem"}
            borderRadius={"15px"}
            fontSize={"0.875rem"}
            {...register("type")}
          >
            <option value="FR">Frost</option>
            <option value="DR">Drought</option>
            <option value="HW">Heat Wave</option>
            <option value="TS">Tropical Storm</option>
            <option value="HW">High Winds</option>
            <option value="HH">High Humidity</option>
            <option value="LH">Low Humidity</option>
          </Select>
          {errors.type && (
            <Text fontSize="sm" color="red.500" mt={"0.5rem"}>
              {errors.type.message}
            </Text>
          )}
          <Flex gap={"20px"}>
            <Flex flexDir={"column"} flexGrow={1}>
              <FormLabel ms="4px" fontSize="xs" fontWeight="bold">
                Temperature
              </FormLabel>
              <FormInput
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="Volume of the product"
                mb="24px"
                size="lg"
                name="temperature"
              />
            </Flex>
            <Flex flexDir={"column"} flexGrow={1}>
              <FormLabel ms="4px" fontSize="xs" fontWeight="bold">
                Humidity
              </FormLabel>
              <FormInput
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="Area"
                mb="24px"
                size="lg"
                name="humidity"
              />
            </Flex>
          </Flex>
          <Flex flexDir={"column"}>
            <FormLabel ms="4px" fontSize="xs" fontWeight="bold">
              Time Period
            </FormLabel>
            <Flex flexDir={"row"} width={"100%"} gap={"20px"}>
              <Flex flexDir={"column"} flexGrow={1}>
                <FormLabel
                  ms="4px"
                  fontSize="xs"
                  fontWeight="bold"
                  mb={"0"}
                  textAlign={"end"}
                >
                  From
                </FormLabel>
                <FormInput
                  fontSize="xs"
                  ms="4px"
                  borderRadius="15px"
                  type="datetime-local"
                  name="startDate"
                  placeholder="Select date and time"
                  mb="24px"
                />
              </Flex>
              <Flex flexDir={"column"} flexGrow={1}>
                <FormLabel
                  ms="4px"
                  fontSize="xs"
                  fontWeight="bold"
                  mb={"0"}
                  textAlign={"end"}
                >
                  To
                </FormLabel>
                <FormInput
                  fontSize="xs"
                  ms="4px"
                  borderRadius="15px"
                  type="datetime-local"
                  name="endDate"
                  placeholder="Select date and time"
                  mb="24px"
                />
              </Flex>
            </Flex>
          </Flex>
          <FormLabel ms="4px" fontSize="xs" fontWeight="bold">
            Observations
          </FormLabel>
          <Textarea
            fontSize="sm"
            ms="4px"
            borderRadius="15px"
            type="text"
            placeholder="Description of the event"
            mb="24px"
            size="lg"
            name="observations"
            {...register("observations")}
          />
          <Flex justify="space-between">
            <Button
              variant="no-hover"
              bg={bgPrevButton}
              alignSelf="flex-end"
              mt="24px"
              w={{ sm: "75px", lg: "100px" }}
              h="35px"
            >
              <Text fontSize="xs" color="gray.700" fontWeight="bold">
                PREV
              </Text>
            </Button>
            <Button
              variant="no-hover"
              bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
              alignSelf="flex-end"
              mt="24px"
              w={{ sm: "75px", lg: "100px" }}
              h="35px"
              type="submit"
            >
              {isLoading ? (
                <CircularProgress
                  isIndeterminate
                  value={1}
                  color="#313860"
                  size="25px"
                />
              ) : (
                <Text fontSize="xs" color="#fff" fontWeight="bold">
                  SEND
                </Text>
              )}
            </Button>
          </Flex>
        </form>
      </FormProvider>
    </FormControl>
  );
};

export default WeatherTab;
