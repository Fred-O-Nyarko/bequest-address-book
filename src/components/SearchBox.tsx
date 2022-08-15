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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchChange = useCallback(
    debounce((e) => searchFxn(e.target.value), DEBOUNCE_RATE),
    [searchFxn]
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
      onChange={(_: any, newValue: IAddressesResponse | null) => {
        newValue && changeFxn(newValue);
        setFieldValue && setFieldValue(inputName, newValue);
      }}
      filterOptions={(x) => x}
      includeInputInList
      filterSelectedOptions
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
