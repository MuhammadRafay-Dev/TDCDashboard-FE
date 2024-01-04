import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteClients, getClients } from "store/thunk/client.thunk";
import ClientModal from "./ClientModal";

const ClientTable = ({filteredData}) => {
  const dispatch = useDispatch();
  // const { clients } = useSelector((state) => state.client.data);
  //   console.log(clients, "Clients Data");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientProp, setClientProp] = useState({});
  const [clientId, setClientId] = useState("");

  const handleBack = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(getClients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickDelete = async (id) => {
    try {
      // Dispatch the deleteDepartments action
      await dispatch(deleteClients(id));

      // After the delete operation is completed, dispatch getDepartments to update the state
      await dispatch(getClients());

      // Display success toast
      toast.success("Lead Deleted Successfully");
    } catch (error) {
      console.error("Error Deleting Lead", error);

      // Display error toast
      toast.error("Error Deleting Lead");
    }
  };

  const handleClickUpdate = (id, value) => {
    setClientId(id);
    setClientProp(value);
    setIsModalOpen(true);
  };
  return (
    <div>
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        clientProp={clientProp}
        clientId={clientId}
      />
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>EmailSecondary</Th>
              <Th>ContactNumber</Th>
              <Th>Platform</Th>
              <Th>RegionLocated</Th>
              <Th>ContactPlatformLink1</Th>
              <Th>ContactPlatformLink2</Th>
              <Th>CreatedBy</Th>
              <Th>IsActive</Th>
              <Th>isOnBoarded</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData &&
              filteredData?.map((row, index) => {
                console.log(row, "for Clients");

                return (
                  <Tr key={row._id}>
                    <Td>{row?.name}</Td>
                    <Td>{row?.email}</Td>
                    <Td>{row?.emailSecondary}</Td>
                    <Td>{row?.contactNumber}</Td>
                    <Td>{row?.platform}</Td>
                    <Td>{row?.dateContacted}</Td>
                    <Td>{row?.regionLocated}</Td>
                    <Td>{row?.contactPlatformLink1}</Td>
                    <Td>{row?.contactPlatformLink2}</Td>
                    <Td>{row?.createdBy.name}</Td>
                    <Td>{row?.isActive ? "True" : "False"}</Td>
                    <Td>{row?.isOnBoarded ? "True" : "False"}</Td>
                    <Td>
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
                            email: row.email,
                            emailSecondary: row.emailSecondary,
                            contactNumber: row.contactNumber,
                            platform: row.platform,
                            dateContacted: row.dateContacted,
                            regionLocated: row.regionLocated,
                            contactPlatformLink1: row.contactPlatformLink1,
                            contactPlatformLink2: row.contactPlatformLink2,
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
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ClientTable;
