"use client";

import {
  loadBookings,
  loadRoomTypes,
  loadRooms,
  selectBookings,
  selectError,
  selectRoomTypes,
  selectRooms,
  selectStatus,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { IBooking, IRoom, IRoomType } from "@/types";
import { useEffect } from "react";

const Rooms = () => {
  const dispatch = useDispatch();
  const roomTypes: IRoomType[] = useSelector(selectRoomTypes);
  const rooms: IRoom[] = useSelector(selectRooms);
  const bookings: IBooking[] = useSelector(selectBookings);

  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadRoomTypes());
      dispatch(loadRooms());
      dispatch(loadBookings());
    }
  }, [dispatch, status]);

  useEffect(() => {
    console.log({ roomTypes, rooms, bookings });
  }, [rooms, roomTypes, bookings]);

  return <div>Hello from Rooms</div>;
};

export default Rooms;
