// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdAccessTime,
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdSchedule,
  MdTimer3,
  MdTrendingUp,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getMembers } from "store/thunk/member.thunk";
import CheckTable from "views/admin/member_data/components/CheckTable";
import ComplexTable from "views/admin/member_data/components/ComplexTable";
import DailyTraffic from "views/admin/member_data/components/DailyTraffic";
import PieCard from "views/admin/member_data/components/PieCard";
import Tasks from "views/admin/member_data/components/Tasks";
import TotalSpent from "views/admin/member_data/components/TotalSpent";
import WeeklyRevenue from "views/admin/member_data/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/member_data/variables/columnsData";
import tableDataCheck from "views/admin/member_data/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/member_data/variables/tableDataComplex.json";
import Loader from "components/loader/Loader";
import { toast } from "react-toastify";

export default function UserReports() {
  const dispatch = useDispatch();

  const [member, setMember] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id");

  useEffect(() => {
    setIsLoading(true);
    dispatch(getMembers())
      .then((res) => {
        const filteredMembers = res.payload?.filter(
          (member) => member._id === id
        );
        setMember(filteredMembers[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Error in Getting Member's Data");
      });
  }, [id]);

  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <SimpleGrid>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                {member?.name.toUpperCase()}
                <span style={{ fontSize: "md", color: "grey" }}>
                  {" "}
                  ({member?.role})
                </span>
              </Text>
            </Box>
          </SimpleGrid>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Revenue Generated"
              value="$300.4"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdTrendingUp}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Profit"
              value="$100.4"
            />
            {/* growth="+23%" */}
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdAttachMoney}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Salary"
              value="$200"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdFileCopy}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Projects"
              value="5"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                  icon={
                    <Icon w="28px" h="28px" as={MdAccessTime} color="white" />
                  }
                />
              }
              name="No. of Hours locked"
              value="120Hrs"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                  icon={
                    <Icon w="28px" h="28px" as={MdSchedule} color="white" />
                  }
                />
              }
              name="Overtime"
              value="20Hrs"
            />
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
            {/* <TotalSpent /> */}
            <WeeklyRevenue />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
              <Tasks />
              <MiniCalendar h="100%" minW="100%" selectRange={false} />
            </SimpleGrid>
          </SimpleGrid>

          {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid> */}

          {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid>
      </SimpleGrid> */}
        </>
      )}
    </Box>
  );
}
