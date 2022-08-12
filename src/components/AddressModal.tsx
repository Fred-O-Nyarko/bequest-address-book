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
import { useState } from "react";
import { useAddressForm } from "../hooks/useAddressForm";
import SearchBox from "./SearchBox";

interface IAddressModalProps {
  open: boolean;
  setOpenModal: (m: boolean) => void;
  onSearch: any;
  options: string[];
  loading: boolean;
}

const AddressModal = ({
  open,
  setOpenModal,
  onSearch,
  options,
  loading
}: IAddressModalProps) => {
  const handleClose = () => {
    setOpenModal(false);
  };

  const {
    handleBlur,
    handleChange,
    onSubmit,
    values,
    setFieldValue,
    getError,
    resetForm,
  } = useAddressForm();

  const onAdd = () => {
    resetForm();
    setOpenModal(false);
    onSubmit();
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    handleChange(e);
    onSearch(e.target.value);
  };
  console.log(options);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Address</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in details below to add a new address.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              name="lineOne"
              margin="dense"
              label="Address 1"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={getError("lineOne")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              name="lineTwo"
              margin="dense"
              label="Address 2"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              name="lineThree"
              margin="dense"
              label="Address 3"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              name="town"
              margin="dense"
              label="Town"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={getError("town")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              name="postCode"
              margin="dense"
              label="Postal Code"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={getError("postCode")}
            />
          </Grid>
          <Grid item xs={12}>
            <SearchBox
              onChange={onSearchChange}
              setFieldValue={() => setFieldValue("country", "ghana")}
              options={options}
              label="Country"
              inputName="country"
              loading={loading}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        <Button onClick={onAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
