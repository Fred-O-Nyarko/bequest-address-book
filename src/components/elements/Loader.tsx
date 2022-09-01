import { Box, CircularProgress } from "@mui/material";

interface ILoaderProps {
  size?: number | string;
}
const Loader = ({ size }: ILoaderProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loader;
