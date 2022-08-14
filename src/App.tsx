import { Box, Container, List } from "@mui/material";
import {
  AddressListItem,
  AddressModal,
  EmptyState,
  FloatingActionButton,
  Loader,
  SearchBox,
} from "./components";
import { useServices } from "./hooks/useServices";

const App = () => {
  const {
    addresses,
    loading,
    getAddressByPostcode,
    getAddressOptionLabel,
    addAddressToList,
    deleteAdressFromList,
    getCountries,
    getCountryOptionLabel,
    isAddressOptionEqualtToValue,
    isCountryOptionEqualtToValue,
    openModal,
    setOpenModal,
    options,
    postCode,
    setOpenSearch,
    openSearch,
    addressList,
  } = useServices();

  return (
    <Container
      style={{
        padding: "4rem",
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
        options={addresses}
        loading={loading}
        searchFxn={getAddressByPostcode}
        label={loading ? "Loading..." : "Search Address"}
        changeFxn={addAddressToList}
        open={openSearch}
        setOpen={setOpenSearch}
        getOptionLabel={getAddressOptionLabel}
        isOptionEqualToValue={isAddressOptionEqualtToValue}
      />
      <Box marginTop={8} overflow="auto">
        {loading ? (
          <Loader size="4rem" />
        ) : addressList?.length > 0 ? (
          <List>
            {addressList?.map((address) => (
              <AddressListItem
                address={address}
                onDelete={deleteAdressFromList}
                postCode={postCode}
              />
            ))}
          </List>
        ) : (
          <EmptyState message="It's kinda lonely here 😢" />
        )}
      </Box>
      {openModal && (
        <AddressModal
          open={openModal}
          setOpenModal={setOpenModal}
          onSearch={getCountries}
          options={options}
          loading={loading}
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
          // @ts-ignore
          getOptionLabel={getCountryOptionLabel}
          isOptionEqualToValue={isCountryOptionEqualtToValue}
        />
      )}
      <FloatingActionButton onClick={() => setOpenModal(true)} />
    </Container>
  );
};

export default App;
