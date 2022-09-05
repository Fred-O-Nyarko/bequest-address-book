import { Box, Fab, Typography, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { setModal, useAppDispatch } from "src/redux";

const FloatingActionButton = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useAppDispatch();
  return (
    <Box
      position="absolute"
      bottom={32}
      right={0}
      marginRight={8}
      id="floating-action-btn"
    >
      <Fab
        variant="extended"
        onClick={() => dispatch(setModal("mutate-form"))}
        color="primary"
        style={{
          backgroundColor: "#ff4c50",
        }}
      >
        <AddIcon
          style={{
            marginRight: isSmallScreen ? 0 : 8,
          }}
        />
        {!isSmallScreen && <Typography> New Address</Typography>}
      </Fab>
    </Box>
  );
};

export default FloatingActionButton;
