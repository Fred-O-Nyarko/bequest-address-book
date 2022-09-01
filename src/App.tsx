import { Provider } from "react-redux";
import { store } from "./redux";

import { Box, Container, List, useMediaQuery } from "@mui/material";
import {
  AddressListItem,
  AddressModal,
  EmptyState,
  FloatingActionButton,
  SearchBox,
  Notification,
  AddressDetail,
} from "./components";

import { useServices, useAddressForm } from "./hooks";

const App = () => {
  const {
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
    countries,
    setOpenSearch,
    openSearch,
    addressList,
    showNotification,
    setShowNotification,
    notificationMessage,
    notificationType,
    postCodeLookupResults,
    setAddressDetail,
    addressDetail,
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

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Provider store={store}>
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
        <Box
          marginTop={3}
          width="100%"
          style={{
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          {addressList?.length > 0 ? (
            <List>
              {addressList?.map((address) => (
                <AddressListItem
                  key={address.lineOne.split(" ").join("-")}
                  address={address}
                  onDelete={deleteAdressFromList}
                  onClick={() => {
                    setOpenModal("detail-form");
                    setAddressDetail(address);
                  }}
                />
              ))}
            </List>
          ) : (
            <EmptyState message="It's kinda lonely here 😢" />
          )}
        </Box>
        {openModal === "mutate-form" && (
          <AddressModal
            open={openModal}
            setOpenModal={setOpenModal}
            onSearch={getCountries}
            countries={countries}
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
        {openModal === "detail-form" && (
          <AddressDetail
            addressDetail={addressDetail}
            open={openModal}
            setOpenModal={setOpenModal}
          />
        )}
        <FloatingActionButton onClick={() => setOpenModal("mutate-form")} />
        <Notification
          setOpen={setShowNotification}
          open={showNotification}
          severity={notificationType}
          message={notificationMessage}
        />
      </Container>
    </Provider>
  );
};

export default App;
