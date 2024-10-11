/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState: {
    links: [],
    profileData: {},
  },
  reducers: {
    setLinksStore: (state, action) => {
      state.links = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setLinksStore, setProfileData } = globalSlice.actions;

export default globalSlice.reducer;
