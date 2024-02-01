const API_URL = process.env.API_URL;

export const loadRoomsService = async () => {
  const res = await fetch(`${API_URL}/rooms`);
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  const rooms = await res.json();
  return rooms;
};

export const loadRoomTypesService = async () => {
  const res = await fetch(`${API_URL}/room-types`);
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  const rooms = await res.json();
  return rooms;
};

export const loadBookingsService = async () => {
  const res = await fetch(`${API_URL}/bookings`);
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  const rooms = await res.json();
  return rooms;
};
