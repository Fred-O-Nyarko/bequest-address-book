import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
  selectModal,
  setModal,
  selectAddress,
} from "src/redux";


const AddressDetail = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);
  const addressDetail = useAppSelector(selectAddress);
  
  const closeModal = () => {
    dispatch(setModal(null));
  };

  return (
    <Dialog open={!!modal} onClose={closeModal} fullWidth>
      <DialogTitle>Address Detail</DialogTitle>
      <DialogContent dividers>
        <List>
          <ListItem>
            <ListItemText
              primary="Address Line 1"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
              secondary={<Typography>{addressDetail?.lineOne}</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Address Line 2"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
              secondary={
                <Typography>{addressDetail?.lineTwo ?? "N/A"}</Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Address Line 3"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
              secondary={
                <Typography>{addressDetail?.lineThree ?? "N/A"}</Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Postcode"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
              secondary={<Typography>{addressDetail?.postCode}</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Town/City"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
              secondary={<Typography>{addressDetail?.town}</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Country"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
              secondary={<Typography>{addressDetail?.country}</Typography>}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressDetail;
