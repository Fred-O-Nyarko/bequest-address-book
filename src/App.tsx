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
  const [options, setOptions] = React.useState([]);

  const fetchData = (value: string) => {
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

  const onInputChange = useCallback(debounce(fetchData, 1000), []);

  const getCounties = (value: React.ChangeEvent<Element>) => {
    setLoading(true);
    axios
      .post(
        `https://api.getAddress.io/typeahead/${value}?api-key=5LOTLJcma065xnWNvF4Bbg36195`,
        {
          search: ["country"],
        }
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
        onChange={() => console.log("here")}
        label={loading ? "Loading..." : "Search Address"}
      />
      <Box marginTop={8}>
        {loading ? (
          <Loader size="4rem" />
        ) : (
          <EmptyState message="It's kinda lonely here 😢" />
        )}
      </Box>
      {openModal && (
        <AddressModal
          open={openModal}
          setOpenModal={setOpenModal}
          onSearch={getCounties}
          options={options}
          loading={loading}
        />
      )}
      <FloatingActionButton onClick={() => setOpenModal(true)} />
    </Container>
  );
};

export default App;
