import { Autocomplete, TextField } from "@mui/material";

interface ISearchBoxProps {
  options: string[];
  loading?: boolean;
  onChange: (value: string) => void;
  label: string
}
const SearchBox = ({ options, loading, onChange, label }: ISearchBoxProps) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option}
      sx={{ width: "100%" }}
      loading={loading}
      onChange={() => console.log('here')}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    />
  );
};

export default SearchBox;
