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
import { FormikState, FormikErrors } from "formik";
import { IAddressesResponse, IFormValues } from "../shared/types";
import SearchBox from "./SearchBox";

interface IAddressModalProps {
  open: boolean;
  setOpenModal: (m: boolean) => void;
  onSearch: any;
  options: IAddressesResponse[];
  loading: boolean;
  openSearch: boolean;
  setOpenSearch: (m: boolean) => void;
  getOptionLabel: (o: IAddressesResponse|string) => string;
  isOptionEqualToValue: (
    o: IAddressesResponse,
    v: IAddressesResponse
  ) => boolean;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFieldValue: (name: string, value: any) => void;
    resetForm:  (nextState?: Partial<FormikState<IFormValues>> | undefined) => void;
    getError: (name: string) => string;
    errors: FormikErrors<IFormValues>;

}

const AddressModal = ({
  open,
  setOpenModal,
  onSearch,
  options,
  loading,
  openSearch,
  setOpenSearch,
  getOptionLabel,
  isOptionEqualToValue,
  handleBlur,
    onSubmit,
    handleChange,
    setFieldValue,
    resetForm,
    getError,
    errors,
    
}: IAddressModalProps) => {
  const handleClose = () => {
    setOpenModal(false);
  };



  const onAdd = () => {
    if (errors) return;
    resetForm();
    setOpenModal(false);
    onSubmit();
  };

  const onSearchChange = (value: string) => {
    handleChange(value as unknown as React.ChangeEvent<HTMLInputElement>);
    onSearch(value);
  };

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
              error={!!getError("lineOne")}
              helperText={getError("lineOne")}
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
              error={!!getError("town")}
              helperText={getError("town")}
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
              error={!!getError("postCode")}
              helperText={getError("postCode")}
            />
          </Grid>
          <Grid item xs={12}>
           
            <SearchBox
              searchFxn={onSearchChange}
              changeFxn={setFieldValue}
              options={options}
              label="Country"
              inputName="country"
              setFieldValue={setFieldValue}
              loading={loading}
              required
              getError={getError}
              open={openSearch}
              setOpen={setOpenSearch}
              getOptionLabel={getOptionLabel}
              isOptionEqualToValue={isOptionEqualToValue}
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
