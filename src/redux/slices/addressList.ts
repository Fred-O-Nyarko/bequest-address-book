import { RootState } from './../store';
import { createSlice } from "@reduxjs/toolkit";
import { IAddress } from "../../shared";

export const addressListSlice = createSlice({
  name: "addressList",
  initialState: {
    addresses: [] as IAddress[],
  },
  reducers: {
    addAddress: (state, action) => {
      state.addresses = [...state.addresses, action.payload];
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
    },
  },
});

export const { addAddress, removeAddress } = addressListSlice.actions;

export const selectAddressList = (state: RootState) => state.addressList.addresses;
export default addressListSlice.reducer;
