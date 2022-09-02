import {
  Autocomplete,
  CircularProgress,
  debounce,
  TextField,
} from "@mui/material";
import React, { useCallback } from "react";
import { DEBOUNCE_RATE } from "../../shared/constants";

interface ISearchBoxProps<T> {
  options: T[];
  loading?: boolean;
  searchFxn: (search: string) => void;
  changeFxn?: (option: T) => void;
  setFieldValue?: (name: string, value: any) => void;
  getError?: (key: string) => string;
  label: string;
  inputName?: string;
  required?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  getOptionLabel?: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
}
const SearchBox = <T extends unknown>({
  options,
  loading,
  searchFxn,
  label,
  inputName = "",
  setFieldValue,
  changeFxn,
  getError = () => "",
  required = false,
  open,
  setOpen,
  getOptionLabel,
  isOptionEqualToValue,
  onBlur,
}: ISearchBoxProps<T>) => {
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
      options={(options ?? []) as T[]}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      sx={{ width: "100%" }}
      loading={loading}
      onChange={(_: any, newValue: T | null) => {
        newValue && changeFxn && changeFxn(newValue);
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
          error={!!getError(inputName)}
          helperText={getError(inputName)}
          onBlur={onBlur}
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
