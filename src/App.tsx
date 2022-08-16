import { Box, Container, List } from "@mui/material";
import {
  AddressListItem,
  AddressModal,
  EmptyState,
  FloatingActionButton,
  Loader,
  SearchBox,
  Notification,
} from "./components";

import { useServices, useAddressForm } from "./hooks";

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
    showNotification,
    setShowNotification,
    notificationMessage,
    notificationType,
  } = useServices();

  const {
    handleBlur,
    handleChange,
    onSubmit,
    setFieldValue,
    getError,
    resetForm,
    errors,
    values,
  } = useAddressForm();

  console.log(addressList);

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
          getOptionLabel={getCountryOptionLabel}
          isOptionEqualToValue={isCountryOptionEqualtToValue}
          handleBlur={handleBlur}
          handleChange={handleChange}
          onSubmit={onSubmit}
          setFieldValue={setFieldValue}
          getError={getError}
          errors={errors}
          resetForm={resetForm}
          addAddressToList={addAddressToList}
          values={values}
        />
      )}
      <FloatingActionButton onClick={() => setOpenModal(true)} />
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
