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
import CheckTable from "views/admin/project_data/components/CheckTable";
import ComplexTable from "views/admin/project_data/components/ComplexTable";
import DailyTraffic from "views/admin/project_data/components/DailyTraffic";
import PieCard from "views/admin/project_data/components/PieCard";
import Tasks from "views/admin/project_data/components/Tasks";
import TotalSpent from "views/admin/project_data/components/TotalSpent";
import WeeklyRevenue from "views/admin/project_data/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/project_data/variables/columnsData";
import tableDataCheck from "views/admin/project_data/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/project_data/variables/tableDataComplex.json";
import Loader from "../project_data/components/loader";
import { toast } from "react-toastify";
import { getProjects } from "store/thunk/project.thunk";

export default function UserReports() {
  const dispatch = useDispatch();

  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id");

  useEffect(() => {
    setIsLoading(true);
    dispatch(getProjects())
      .then((res) => {
        const filteredProjects = res.payload?.filter(
          (project) => project._id === id
        );
        setProject(filteredProjects[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Error in Getting Project's Data");
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
              <Text fontSize="xl" fontWeight="bold" mb="15px">
                {project?.name.toUpperCase()}
                {/* <span style={{ fontSize: "md", color: "grey" }}>
                  {" "}
                  ({project?.role})
                </span> */}
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
              name="Total Cost"
              value={`$${project?.cost}` ?? "N/A"}
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
              name="Hourly Cost"
              value={`$${project?.hourly_cost}` ?? "N/A"}
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
              name="Duration"
              value={`${project?.duration} ${project?.duration_unit}` ?? "N/A"}
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
              name="Contract Type"
              value={`${project?.contract_type}` ?? "N/A"}
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
              name="Platform"
              value={`${project?.platform}` ?? "N/A"}
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
              <Tasks project={project} />
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
