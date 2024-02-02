/* Core */
import { IBooking, IRoom, IRoomType } from "@/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { loadRoomsService, updateRoomService } from "@/services/rooms";
import { loadRoomTypesService } from "@/services/roomTypes";
import {
  loadBookingsService,
  createBookingService,
  updateBookingService,
} from "@/services/bookings";

const initialState: HotelMgmtSliceState = {
  rooms: [],
  roomTypes: [],
  bookings: [],
  status: "idle",
  error: null,
};

export const hotelMgmtSlice = createSlice({
  name: "hotelMgmt",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Load Room Types
      .addCase(loadRoomTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadRoomTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roomTypes = action.payload;
      })
      .addCase(loadRoomTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // Load Rooms
      .addCase(loadRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(loadRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // Load Bookings
      .addCase(loadBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(loadBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // Update Room
      .addCase(updateRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedItem = action.payload;
        state.rooms = state.rooms.map((room) => {
          if (room.id === updatedItem.id) return updatedItem;
          return room;
        });
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        const createdItem = action.payload;
        state.bookings = [...state.bookings, createdItem];
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // Update Booking Check-In / Check-Out
      .addCase(updateBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedItem = action.payload;
        console.log("updatedItem", updatedItem);
        // state.bookings = [...state.bookings, createdItem];
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const loadRooms = createAsyncThunk("hotelMgmt/loadRooms", async () => {
  const response = await loadRoomsService();
  return response;
});

export const loadRoomTypes = createAsyncThunk(
  "hotelMgmt/loadRoomTypes",
  async () => {
    const response = await loadRoomTypesService();
    return response;
  }
);

export const loadBookings = createAsyncThunk(
  "hotelMgmt/loadBookings",
  async () => {
    const response = await loadBookingsService();
    return response;
  }
);

export const updateRoom = createAsyncThunk(
  "hotelMgmt/updateRoom",
  async ({ id, room }: { id: number; room: IRoom }) => {
    const response = await updateRoomService(id, room);
    return response;
  }
);

export const createBooking = createAsyncThunk(
  "hotelMgmt/createBooking",
  async (newBooking: Omit<IBooking, "id">) => {
    const response = await createBookingService(newBooking);
    return response;
  }
);

export const updateBooking = createAsyncThunk(
  "hotelMgmt/updateBooking",
  async ({ id, booking }: { id: number; booking: IBooking }) => {
    const response = await updateBookingService(id, booking);
    return response;
  }
);

const { actions } = hotelMgmtSlice;

/* Types */
export interface HotelMgmtSliceState {
  rooms: IRoom[];
  roomTypes: IRoomType[];
  bookings: IBooking[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
