import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteLeads, getLeads } from "store/thunk/lead.thunk";
import { getMembers } from "store/thunk/member.thunk";
import { formatDateString} from "../../../utils/index";
import LeadModal from "./LeadModal";

const LeadTable = ({filteredData}) => {
  // console.log(search, "Search test")
  // const { leads } = useSelector((state) => state.lead.data);
  // console.log("leared", filteredData);
  
  // console.log(leads, "LeadTable");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [leadProp, setLeadProp] = useState({});
  const [leadId, setLeadId] = useState("");

  const handleBack = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getLeads());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAccordion = (rowId) => {
    setExpandedRow((prevRow) => (prevRow === rowId ? null : rowId));
  };



  const handleClickDelete = async (id) => {
    try {
      // Dispatch the deleteDepartments action
      await dispatch(deleteLeads(id));

      // After the delete operation is completed, dispatch getDepartments to update the state
      await dispatch(getLeads());

      // Display success toast
      toast.success("Lead Deleted Successfully");
    } catch (error) {
      console.error("Error Deleting Lead", error);

      // Display error toast
      toast.error("Error Deleting Lead");
    }
  };

  const handleClickUpdate = (id, value) => {
    setLeadId(id);
    setLeadProp(value);
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
    dispatch(getLeads()).then((res) => {
      setClients(res.payload);
    });
  };

  return (
    <div>
      <LeadModal
        isOpen={isModalOpen}
        members={members}
        clients={clients}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        leadProp={leadProp}
        leadId={leadId}
      />
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>SalesTeamMember</Th>
              <Th>Client</Th>
              <Th>LinkJobApplied</Th>
              <Th>JobDescription</Th>
              <Th>SentDescription</Th>
              <Th>Appointment</Th>
              <Th>Call</Th>
              <Th>CreatedBy</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData &&
              filteredData?.map((row, index) => (
                <React.Fragment key={row._id}>
                  <Tr>
                    <Td>{row?.name}</Td>
                    <Td>{formatDateString(row?.date)}</Td>
                    <Td>{row?.salesTeamMember?.name ?? "N/A"}</Td>
                    <Td>{row?.client?.name ?? "N/A"}</Td>
                    <Td>
                      {row?.linkJobApplied}
                      {row.error && row.error.linkJobApplied && (
                        <span style={{ color: "red" }}>
                          {row.error.linkJobApplied}
                        </span>
                      )}
                    </Td>
                    <Td>{row?.jobDescription}</Td>
                    <Td>{row?.sentDescription}</Td>
                    <Td>{formatDateString(row?.appointment)}</Td>
                    <Td>{formatDateString(row?.call)}</Td>
                    <Td>{row?.createdBy.name}</Td>
                    <Td>
                      <ViewIcon
                        color={"blue"}
                        boxSize={5}
                        borderRadius={5}
                        border={"2px solid blue"}
                        marginLeft={"5px"}
                        padding={"2px"}
                        cursor={"pointer"}
                        onClick={() => toggleAccordion(row._id)}
                      />
                      <EditIcon
                        color={"blue"}
                        boxSize={5}
                        borderRadius={5}
                        border={"2px solid blue"}
                        marginLeft={"5px"}
                        padding={"2px"}
                        cursor={"pointer"}
                        onClick={() =>
                          handleClickUpdate(row._id, {
                            name: row.name,
                            date: row.date,
                            salesTeamMember: row.salesTeamMember,
                            client: row.client,
                            linkJobApplied: row.linkJobApplied,
                            jobDescription: row.jobDescription,
                            sentDescription: row.sentDescription,
                            appointment: row.appointment,
                            call: row.call,
                          })
                        }
                      />
                      <DeleteIcon
                        color={"blue"}
                        boxSize={5}
                        borderRadius={5}
                        border={"2px solid blue"}
                        marginLeft={"5px"}
                        padding={"2px"}
                        cursor={"pointer"}
                        onClick={() => handleClickDelete(row._id)}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={12}>
                      <Collapse in={expandedRow === row._id}>
                        <Box p={4}>
                          {/* Accordion Content */}
                          <Text>{row.jobDescription}</Text>
                          {/* Add other fields here */}
                        </Box>
                      </Collapse>
                    </Td>
                  </Tr>
                </React.Fragment>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default LeadTable;
