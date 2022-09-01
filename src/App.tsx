import { Container, useMediaQuery } from "@mui/material";
import {
  FloatingActionButton,
  SearchBox,
  Notification,
  AddressModule,
} from "src/components";

import { useServices } from "./hooks";

const App = () => {
  const {
    loading,
    getAddressByPostcode,
    getAddressOptionLabel,
    addAddressToList,
    isAddressOptionEqualtToValue,
    setOpenModal,
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
      <SearchBox
        options={postCodeLookupResults}
        loading={loading}
        searchFxn={getAddressByPostcode}
        label={loading ? "Loading..." : "Search address with postcode"}
        changeFxn={addAddressToList}
        open={openSearch}
        setOpen={setOpenSearch}
        getOptionLabel={getAddressOptionLabel}
        isOptionEqualToValue={isAddressOptionEqualtToValue}
      />

      <AddressModule />
      <FloatingActionButton onClick={() => setOpenModal("mutate-form")} />
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
