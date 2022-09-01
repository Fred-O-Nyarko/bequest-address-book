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
import { useEffect, useState } from "react";
import { useAddressForm, useDebounce } from "../hooks";
import { useGetCountriesQuery } from "../services";
import { DEBOUNCE_RATE } from "../shared";
import { IAddress, TModalID } from "../shared/types";
import SearchBox from "./SearchBox";

interface IAddressModalProps {
  open: TModalID;
  setOpenModal: (m: TModalID) => void;
  getOptionLabel: (o: string) => string;
  isOptionEqualToValue: (o: string, v: string) => boolean;
  addAddressToList: (a: IAddress) => void;
}

const AddressModal = ({
  open,
  setOpenModal,
  getOptionLabel,
  isOptionEqualToValue,
  addAddressToList,
}: IAddressModalProps) => {
  const {
    handleBlur,
    handleChange,
    onSubmit,
    setFieldValue,
    getError,
    resetForm,
    errors,
    values,
  } = useAddressForm();

  const handleClose = () => {
    setOpenModal(null);
  };

  const onAdd = () => {
    if (!(JSON.stringify(errors) === "{}")) return;

    resetForm();
    setOpenModal(null);
    addAddressToList(values);
    onSubmit();
  };

  const onCancel = () => {
    resetForm();
    setOpenModal(null);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_RATE);

  const {
    data: countries,
    isFetching: loading,
    isError: error,
  } = useGetCountriesQuery(debouncedSearchQuery, {
    skip: debouncedSearchQuery === "",
  });

  const onSearchChange = (value: string) => {
    handleChange(value as unknown as React.ChangeEvent<HTMLInputElement>);
    setSearchQuery(value);
  };
  console.log(countries);

  useEffect(() => {
    if (!openSearch) {
      // todo: reset search query
    }
  }, [openSearch]);

  return (
    <Dialog open={!!open} onClose={handleClose}>
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
              options={countries ?? []}
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
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
