import { RootState } from './../store';
import { TModalID } from "./../../shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  modal: TModalID;
};

const initialState: SettingsState = {
  modal: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setModal: (state,  action: PayloadAction<TModalID>) => {
      state.modal = action.payload;
    },
  },
});

export const { setModal } = settingsSlice.actions;

export const selectModal = (state: RootState) => state.settings.modal;

export default settingsSlice.reducer;