import { RootState } from "./../store";
import { SettingsState, TModalID } from "src/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SettingsState = {
  modal: null,
  notification: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<TModalID>) => {
      state.modal = action.payload;
    },
    setNotification: (
      state,
      action: PayloadAction<SettingsState["notification"]>
    ) => {
      state.notification = action.payload;
    },
  },
});

export const { setModal, setNotification } = settingsSlice.actions;

export const selectModal = (state: RootState) => state.settings.modal;

export const selectNotification = (state: RootState) => state.settings.notification;

export default settingsSlice.reducer;
