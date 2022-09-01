import { EmptyState } from "@components/.";
import { Box, List } from "@mui/material";
import {
  useAppSelector,
  selectAddressList,
  useAppDispatch,
  removeAddress,
} from "@redux/.";
import AddressListItem from "./components/AddressListItem";

const AddressList = () => {
  const addressList = useAppSelector(selectAddressList);
  const dispatch = useAppDispatch();
  const deleteAdressFromList = () => dispatch(removeAddress);

  return (
    <Box
      marginTop={3}
      width="100%"
      style={{
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {addressList?.length > 0 ? (
        <List>
          {addressList?.map((address) => (
            <AddressListItem
              key={address.lineOne.split(" ").join("-")}
              address={address}
              onDelete={deleteAdressFromList}
              onClick={() => {
                // setOpenModal("detail-form");
                // setAddressDetail(address);
              }}
            />
          ))}
        </List>
      ) : (
        <EmptyState message="It's kinda lonely here 😢" />
      )}
    </Box>
  );
};

export default AddressList;
