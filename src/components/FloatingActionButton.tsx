import { Box, Fab, Typography, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface IFloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton = ({ onClick }: IFloatingActionButtonProps) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <Box position="absolute" bottom={32} right={0} marginRight={8}>
      <Fab
        variant="extended"
        onClick={onClick}
        color="primary"
        style={{
          backgroundColor: "#ff4c50",
        }}
        
      >
        <AddIcon style={{
          marginRight: isSmallScreen ? 0 : 8,
        }} />
       { !isSmallScreen && <Typography> New Address</Typography>}
      </Fab>
    </Box>
  );
};

export default FloatingActionButton;
