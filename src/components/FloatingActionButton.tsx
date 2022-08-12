import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface IFloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton = ({ onClick }: IFloatingActionButtonProps) => {
  return (
    <Box position="absolute" bottom={32} right={0}>
      <Fab variant="extended" onClick={onClick}>
        <AddIcon sx={{ mr: 1 }} />
        New Address
      </Fab>
    </Box>
  );
};

export default FloatingActionButton;