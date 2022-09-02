import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddress } from "../../shared";

export const addressListSlice = createSlice({
  name: "addressList",
  initialState: {
    addresses: [] as IAddress[],
    address: null as IAddress | null,
  },
  reducers: {
    addAddress: (state, action: PayloadAction<IAddress>) => {
      state.addresses = [...state.addresses, action.payload];
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
    },
    address: (state, action: PayloadAction<IAddress>) => {
      state.address = action.payload;
    },
  },
});

export const { addAddress, removeAddress, address } = addressListSlice.actions;

export const selectAddressList = (state: RootState) =>
  state.addressList.addresses;

export const selectAddress = (state: RootState) => state.addressList.address;

export default addressListSlice.reducer;
