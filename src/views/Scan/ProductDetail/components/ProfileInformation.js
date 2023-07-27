import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
// Chakra imports
import { Flex, Icon, Link, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";

const ProfileInformation = ({
  title,
  country,
  description,
  establishment,
  parcel,
  email,
  location,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p="0" mb="24px">
      <CardHeader mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Flex direction="column">
          <Text fontSize="md" color="gray.500" fontWeight="400" mb="30px">
            {description}
          </Text>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Location:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {country}
            </Text>
          </Flex>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Establishment:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              <Link textDecoration={"underline"} href="https://chakra-ui.com">
                {establishment}
              </Link>
            </Text>
          </Flex>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Parcel:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              <Link textDecoration={"underline"} href="https://chakra-ui.com">
                {parcel}
              </Link>
            </Text>
          </Flex>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Location:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {location}
            </Text>
          </Flex>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Social Media:{" "}
            </Text>
            <Flex>
              <Link
                href="#"
                color="green.400"
                fontSize="lg"
                me="10px"
                _hover={{ color: "green.400" }}
              >
                <Icon as={FaFacebook} />
              </Link>
              <Link
                href="#"
                color="green.400"
                fontSize="lg"
                me="10px"
                _hover={{ color: "green.400" }}
              >
                <Icon as={FaInstagram} />
              </Link>
              <Link
                href="#"
                color="green.400"
                fontSize="lg"
                me="10px"
                _hover={{ color: "green.400" }}
              >
                <Icon as={FaTwitter} />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileInformation;