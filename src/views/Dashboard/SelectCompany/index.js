// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import { dashboardTableData, timelineData } from "variables/general";
import { object, string } from "zod";
import {
  setCompany,
  setCompanyEstablishment,
} from "store/features/companySlice";
import {
  useCreateCompanyMutation,
  useCreateEstablishmentMutation,
} from "store/features/companyApi";
import { useDispatch, useSelector } from "react-redux";

// assets
import { AiFillSetting } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardWithImage from "components/Card/CardWithImage";
import { FaCube } from "react-icons/fa";
import IconBox from "components/Icons/IconBox";
import { MdModeEdit } from "react-icons/md";
import { RocketIcon } from "components/Icons/Icons";
import Step0 from "./components/Step0";
import Step1a from "./components/Step1a";
import Step2a from "./components/Step2a";
import avatar4 from "assets/img/avatars/avatar4.png";
import { clearForm } from "store/features/formSlice";
import { createCompany } from "store/features/companyApi";
import imageMap from "assets/img/imageMap.png";
import imageParcel1 from "assets/img/ImageParcel1.png";
import { setUserCompany } from "store/features/user.slice";
import { useGetParcelQuery } from "store/features/productApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = object({
  companyName: string().min(1, "Name is required"),
  companyCountry: string().min(1, "Country is required"),
  companyAddress: string().min(1, "Address is required"),
  companyCity: string().min(1, "City is required"),
  companyState: string().min(1, "State is required"),
  companyDescription: string(),
  establishmentName: string().min(1, "Name is required"),
  establishmentCountry: string().min(1, "Country is required"),
  establishmentAddress: string().min(1, "Address is required"),
  establishmentCity: string().min(1, "City is required"),
  establishmentState: string().min(1, "State is required"),
  establishmentDescription: string(),
});

export default function SelectCompany() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");
  const iconColor = useColorModeValue("gray.300", "gray.700");
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const [option, setOption] = useState("");

  const dispatch = useDispatch();

  const currentCompany = useSelector(
    (state) => state.form.currentForm?.company
  );

  const currentEstablishment = useSelector(
    (state) => state.form.currentForm?.establishment
  );

  const [
    createCompany,
    {
      data: dataCompany,
      error: errorCompany,
      isSuccess: isSuccessCompany,
      isLoading: isLoadingCompany,
    },
  ] = useCreateCompanyMutation();

  const [
    createEstablishment,
    {
      data: dataEstablishment,
      error: errorEstablishment,
      isSuccess: isSuccessEstablishment,
      isLoading: isLoadingEstablishment,
    },
  ] = useCreateEstablishmentMutation();

  const handleNext = () => {
    setStep(step + 1);
  };

  const onSubmitHandler = () => {
    createCompany(currentCompany);
  };

  useEffect(() => {
    if (isSuccessCompany) {
      dispatch(setCompany(dataCompany));
      const { id, name } = dataCompany;
      dispatch(setUserCompany({ id, name }));
      createEstablishment({ ...currentEstablishment, company: dataCompany.id });
    }
  }, [isSuccessCompany]);

  useEffect(() => {
    if (isSuccessEstablishment) {
      dispatch(setCompanyEstablishment(dataEstablishment));
      dispatch(clearForm());
      navigate(`/admin/dashboard/establishment/${dataEstablishment.id}`);
    }
  }, [isSuccessEstablishment]);

  return (
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      pt={{ sm: "125px", lg: "75px" }}
      w={{ sm: "100%", md: "100%", lg: "100%" }}
      mx="auto"
    >
      <Flex
        direction="column"
        textAlign="center"
        mb={{ sm: "25px", md: "45px" }}
      >
        <Text
          color={textColor}
          fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
          mb="8px"
        >
          Create or join a Company
        </Text>
        <Text
          color="gray.400"
          fontWeight="normal"
          fontSize={{ sm: "sm", md: "lg" }}
        >
          Create a new company or join an existing one
        </Text>
      </Flex>

      <FormControl>
        {step === 1 && (
          <Step0
            option={option}
            handleChange={setOption}
            handleNext={handleNext}
          />
        )}
        {step === 2 && option === "create" && (
          <Step1a
            onSubmitStep1={handleNext}
            image={image}
            setImage={setImage}
          />
        )}
        {step === 3 && option === "create" && (
          <Step2a onSubmitHandler={onSubmitHandler} />
        )}
      </FormControl>
    </Flex>
  );
}