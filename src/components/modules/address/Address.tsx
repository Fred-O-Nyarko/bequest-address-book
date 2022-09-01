/* eslint-disable react/jsx-no-undef */
import { IAddress } from "@shared/types";
import { AddAddress, AddressDetail, AddressList } from "..";

const Address = () => {
    let openModal;
    const setOpenModal = (modal) => {}
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
