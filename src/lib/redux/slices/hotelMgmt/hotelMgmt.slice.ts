/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: HotelMgmtSliceState = {};

export const hotelMgmtSlice = createSlice({
  name: "hotelMgmt",
  initialState,
  reducers: {},
});

const { actions } = hotelMgmtSlice;

export const {} = actions;

/* Types */
export interface HotelMgmtSliceState {}
