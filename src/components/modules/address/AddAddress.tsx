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
import { useCallback, useEffect, useState } from "react";
import { useAddressForm, useDebounce } from "src/hooks";
import {
  addAddress,
  selectModal,
  setModal,
  setNotification,
  useAppDispatch,
  useAppSelector,
} from "src/redux";
import { useGetCountriesQuery } from "src/services";
import { DEBOUNCE_RATE, randomId } from "src/shared";
import { SearchBox } from "src/components";

const AddAddress = () => {
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

  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);

  const closeModal = () => {
    dispatch(setModal(null));
  };

  const onAdd = () => {
    if (!(JSON.stringify(errors) === "{}"))
      return dispatch(
        setNotification({
          message: "Please fill in all fields",
          type: "error",
        })
      );
    resetForm();
    closeModal();
    dispatch(
      addAddress({
        ...values,
        // generate a unique random id for the address
        id: randomId(),
      })
    );
    onSubmit();
  };

  const onCancel = () => {
    resetForm();
    closeModal();
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_RATE);

  const {
    data: countries,
    isLoading: loading,
    error,
    isError,
  } = useGetCountriesQuery(debouncedSearchQuery, {
    skip: debouncedSearchQuery === "",
  });

  useEffect(() => {
    if (isError) {
      dispatch(
        setNotification({
          //  @ts-ignore
          message: error?.data.message || "Something went wrong",
          type: "error",
        })
      );
    }
  }, [dispatch, error, isError]);

  const onSearchChange = (value: string) => {
    handleChange(value as unknown as React.ChangeEvent<HTMLInputElement>);
    setSearchQuery(value);
  };

  useEffect(() => {
    if (!openSearch) {
      // todo: reset search query
    }
  }, [openSearch]);

  const getOptionLabel = useCallback((option: string) => option, []);

  const isOptionEqualToValue = useCallback((option: string, value: string) => {
    return option === value;
  }, []);

  return (
    <Dialog open={!!modal} onClose={closeModal}>
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
              onBlur={handleBlur}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          variant="outlined"
          size="large"
          style={{
            color: "#ff4c50",
            borderColor: "#ff4c50",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onAdd}
          variant="contained"
          color="primary"
          size="large"
          style={{
            backgroundColor: "#ff4c50",
            width: "7rem",
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAddress;
