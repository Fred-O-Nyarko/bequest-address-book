/* eslint-disable react/jsx-no-undef */
import { IAddress } from "src/shared";
import AddAddress from "./AddAddress";
import AddressDetail from "./AddressDetail";
import AddressList from "./AddressList";


const Address = () => {
    let openModal;
    const setOpenModal = () => {}
    const addressDetail = {} as IAddress;
  return (
    <>
    <AddressList />
      {openModal === "mutate-form" && (
        <AddAddress
          open={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      {openModal === "detail-form" && (
        <AddressDetail
          addressDetail={addressDetail}
          open={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default Address;
