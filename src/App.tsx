import { Container, useMediaQuery } from "@mui/material";
import {
  FloatingActionButton,
  Notification,
  AddressModule,
  PostcodeSearchBox,
} from "src/components";

const App = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Container
      style={{
        padding: isSmallScreen ? "2rem" : "4rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
      maxWidth="sm"
    >
      <PostcodeSearchBox />
      <AddressModule />
      <FloatingActionButton />
      <Notification />
    </Container>
  );
};

export default App;
