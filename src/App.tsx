import { Container, useMediaQuery } from "@mui/material";
import {
  FloatingActionButton,
  SearchBox,
  Notification,
  AddressModule,
  PostcodeSearchBox,
} from "src/components";

import { useServices } from "./hooks";

const App = () => {
  const {
    loading,
    getAddressByPostcode,
    getAddressOptionLabel,
    addAddressToList,
    isAddressOptionEqualtToValue,
    setOpenSearch,
    openSearch,
    showNotification,
    setShowNotification,
    notificationMessage,
    notificationType,
    postCodeLookupResults,
  } = useServices();

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
      <Notification
        setOpen={setShowNotification}
        open={showNotification}
        severity={notificationType}
        message={notificationMessage}
      />
    </Container>
  );
};

export default App;
