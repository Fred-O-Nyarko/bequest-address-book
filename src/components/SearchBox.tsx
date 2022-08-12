import { Autocomplete, TextField } from "@mui/material";
import React from "react";

interface ISearchBoxProps {
  options: string[];
  loading?: boolean;
  onChange: any;
  setFieldValue?:  any;
  label: string;
  inputName?: string;
}
const SearchBox = ({
  options,
  loading,
  onChange,
  label,
  inputName = "",
  setFieldValue,
}: ISearchBoxProps) => {
  console.log(options);
  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options ?? []}
      getOptionLabel={(option) => option}
      sx={{ width: "100%" }}
      loading={loading}
      onChange={(e, value) => setFieldValue && setFieldValue(inputName, value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={inputName}
          onChange={onChange}
        />
      )}
    />
  );
};

export default SearchBox;
