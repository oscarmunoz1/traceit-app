// Chakra imports
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import BgMusicCard from "assets/img/BgMusicCard.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CarouselCard from "./CarouselCard";
import { FaPlus } from "react-icons/fa";
import React from "react";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import imageParcel1 from "assets/img/ImageParcel1.png";
import imageParcel2 from "assets/img/ImageParcel2.png";
import imageParcel3 from "assets/img/ImageParcel3.png";

const CarouselHorizontal = ({ title, description, data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { establishmentId } = useParams();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p="16px">
      <CardHeader p="12px 5px" mb="12px">
        <Flex justify={"space-between"} width={"100%"}>
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              {title}
            </Text>
            <Text fontSize="sm" color="gray.500" fontWeight="400">
              {description}
            </Text>
          </Flex>
          <Button
            p="0px"
            w="75px"
            h="75px"
            bg="transparent"
            color="gray.500"
            borderRadius="15px"
            onClick={() =>
              navigate(
                `/admin/dashboard/establishment/${establishmentId}/parcel/add`
              )
            }
          >
            <Flex
              direction="column"
              justifyContent="center"
              align="center"
              h="120px"
            >
              <Icon as={FaPlus} w="15px" h="15px" mb="10px" />
              <Text fontSize="md" fontWeight="bold">
                New
              </Text>
            </Flex>
          </Button>
        </Flex>
      </CardHeader>
      <CardBody px="5px">
        {data && data.length > 0 ? (
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
            gap="24px"
          >
            {data.map((parcel) => (
              <CarouselCard
                id={parcel.id}
                image={
                  parcel.image
                    ? `https://api-us-east-1.traceit.io${parcel.image}`
                    : BgMusicCard
                }
                name={parcel.name}
                category={parcel.product || "-"}
                avatars={[avatar2, avatar4, avatar6]}
              />
            ))}
          </Grid>
        ) : (
          <Flex width={"100%"} height={"70px"} justifyContent="center">
            <Text
              display={"flex"}
              fontSize={"md"}
              fontWeight={"300"}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
            >
              No parcels yet, start by creating the first parcel.
            </Text>
          </Flex>
        )}
      </CardBody>
    </Card>
  );
};

export default CarouselHorizontal;
