/* eslint-disable react/jsx-no-undef */
import { useAppSelector, selectModal } from "src/redux";
import { IAddress } from "src/shared";
import AddAddress from "./AddAddress";
import AddressDetail from "./AddressDetail";
import AddressList from "./AddressList";

const Address = () => {
  const modal = useAppSelector(selectModal);
  return (
    <>
      <AddressList />
      {modal === "mutate-form" && <AddAddress />}
      {modal === "detail-form" && (
        <AddressDetail />
      )}
    </>
  );
};

export default Address;
