import { Box, Container, debounce, Fab } from "@mui/material";
import axios from "axios";
import React, { useCallback } from "react";
import {
  AddressModal,
  EmptyState,
  FloatingActionButton,
  Loader,
  SearchBox,
} from "./components";

const App = () => {
  const [addresses, setAddresses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleChange = (value: string) => {
    setLoading(true);
    axios
      .get(
        `https://api.getAddress.io/find/${value}?api-key=5LOTLJcma065xnWNvF4Bbg36195`
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const onInputChange = useCallback(debounce(handleChange, 1000), []);

  const addAddress = () => {
    setOpenModal(true);
  };

  console.log(addresses);
  return (
    <Container
      style={{
        padding: "4rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        height: "100vh",
      }}
      maxWidth="sm"
    >
      <SearchBox
        options={addresses}
        loading={loading}
        onChange={onInputChange}
        label={loading ? "Loading..." : "Search Address"}
      />
      <Box marginTop={8}>
        {loading ? (
          <Loader size="4rem" />
        ) : (
          <EmptyState message="It's kinda lonely here 😢" />
        )}
      </Box>
      <AddressModal open={openModal} setOpenModal={setOpenModal} />
      <FloatingActionButton onClick={addAddress} />
    </Container>
  );
};

export default App;
