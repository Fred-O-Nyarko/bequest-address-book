import {
  Autocomplete,
  CircularProgress,
  debounce,
  TextField,
} from "@mui/material";
import React, { useCallback } from "react";
import { DEBOUNCE_RATE } from "../shared/constants";
import { IAddressesResponse } from "../shared/types";

interface ISearchBoxProps {
  options: IAddressesResponse[];
  loading?: boolean;
  searchFxn: any;
  changeFxn: any;
  setFieldValue?: any;
  getError?: (key: string) => any;
  label: string;
  inputName?: string;
  required?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  getOptionLabel?: (option: IAddressesResponse) => string;
  isOptionEqualToValue?: (
    option: IAddressesResponse,
    value: IAddressesResponse
  ) => boolean;
}
const SearchBox = ({
  options,
  loading,
  searchFxn,
  label,
  inputName = "",
  setFieldValue,
  changeFxn,
  getError = () => {},
  required = false,
  open,
  setOpen,
  getOptionLabel,
  isOptionEqualToValue,
}: ISearchBoxProps) => {
  // @ts-ignore
  const [inputValue, setInputValue] = React.useState("");

  // const onSearchChange = useCallback(debounce(searchFxn, DEBOUNCE_RATE), []);
  const onSearchChange = useCallback(
    debounce((e) => searchFxn(e.target.value), DEBOUNCE_RATE),
    []
  );

  return (
    <Autocomplete
      disablePortal
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options ?? []}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      sx={{ width: "100%" }}
      loading={loading}
      // onInputChange={(event, newInputValue) => {
      //   setInputValue(newInputValue);
      // }}

      // onChange={(e, value) => {
      //   setFieldValue && setFieldValue(inputName, value);
      // }}

      onChange={(_: any, newValue: IAddressesResponse | null) => {
        newValue && changeFxn(newValue);
      }}
      filterOptions={(x) => x}
      includeInputInList
      filterSelectedOptions
      // value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={inputName}
          onChange={onSearchChange}
          required={required}
          error={getError(inputName) ? true : false}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBox;
