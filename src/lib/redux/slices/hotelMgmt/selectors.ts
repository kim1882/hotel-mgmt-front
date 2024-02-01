/* Instruments */
import type { ReduxState } from "@/lib/redux";

export const selectRooms = (state: ReduxState) => state.hotelMgmt.rooms;
export const selectRoomTypes = (state: ReduxState) => state.hotelMgmt.roomTypes;
export const selectBookings = (state: ReduxState) => state.hotelMgmt.bookings;

export const selectStatus = (state: ReduxState) => state.hotelMgmt.status;
export const selectError = (state: ReduxState) => state.hotelMgmt.error;
