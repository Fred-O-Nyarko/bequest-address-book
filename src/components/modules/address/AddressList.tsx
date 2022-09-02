import { EmptyState } from "src/components";
import { Box, List } from "@mui/material";
import {
  useAppSelector,
  selectAddressList,
  useAppDispatch,
  removeAddress,
  setModal,
  address as setAddress,
} from "src/redux";
import AddressListItem from "./components/AddressListItem";
import { IAddress } from "src/shared";

const AddressList = () => {
  const addressList = useAppSelector(selectAddressList) as IAddress[];

  const dispatch = useAppDispatch();
  const deleteAdressFromList = (id: string) => dispatch(removeAddress(id));

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
          {addressList?.map((adress) => (
            <AddressListItem
              key={adress.lineOne.split(" ").join("-")}
              address={adress}
              onDelete={deleteAdressFromList}
              onClick={() => {
                dispatch(setModal("detail-form"));
                dispatch(setAddress(adress));
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
