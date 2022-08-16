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
import { IAddress, TModalID } from "../shared/types";

interface IAddressDetailProps {
  open: TModalID;
  setOpenModal: (m: TModalID) => void;
  addressDetail: IAddress | null;
}

const AddressDetail = ({
  open,
  setOpenModal,
  addressDetail,
}: IAddressDetailProps) => {
  return (
    <Dialog open={!!open} onClose={() => setOpenModal(null)} fullWidth>
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
              secondary={<Typography>{addressDetail?.lineTwo ?? 'N/A'}</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Address Line 3"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
              secondary={<Typography>{addressDetail?.lineThree ?? 'N/A'}</Typography>}
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
        <Button onClick={() => setOpenModal(null)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressDetail;
