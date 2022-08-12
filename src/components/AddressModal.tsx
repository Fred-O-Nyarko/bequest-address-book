import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import SearchBox from "./SearchBox";

interface IAddressModalProps {
  open: boolean;
  setOpenModal: (m: boolean) => void;
}

const AddressModal = ({ open, setOpenModal }: IAddressModalProps) => {
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Address</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <Grid container spacing={2}>
         
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Address 1"
              type="email"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Address 2"
              type="email"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Address 3"
              type="email"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Town"
              type="email"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Postal Code"
              type="email"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <SearchBox
              onChange={() => console.log()}
              options={[]}
              label="Country"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
