import { IBooking } from "@/types";

const API_URL = process.env.API_URL;

export const loadBookingsService = async () => {
  const res = await fetch(`${API_URL}/bookings`);
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  const rooms = await res.json();
  return rooms;
};

export const createBookingService = async (
  newBooking: Omit<IBooking, "id">
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  };
  const res = await fetch(`${API_URL}/bookings`, options);
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  const createdBooking = await res.json();
  return createdBooking;
};
