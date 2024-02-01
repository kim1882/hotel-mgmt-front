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
import { Content, DisplayMessage, List } from "./RoomList.styles";
import RoomItem from "../RoomItem";

const RoomList = () => {
  const dispatch = useDispatch();
  const roomTypes: IRoomType[] = useSelector(selectRoomTypes);
  const rooms: IRoom[] = useSelector(selectRooms);
  const bookings: IBooking[] = useSelector(selectBookings);

  const status = useSelector(selectStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadRoomTypes());
      dispatch(loadRooms());
      dispatch(loadBookings());
    }
  }, [dispatch, status]);

  return (
    <Content>
      {rooms.length ? (
        <List>
          {rooms.map((room) => (
            <RoomItem
              key={room.id}
              room={room}
              roomTypes={roomTypes}
              bookings={bookings.filter(
                (booking) => booking.room_id === room.id
              )}
            />
          ))}
        </List>
      ) : (
        <DisplayMessage>
          No rooms created yet. Start by adding a new room!
        </DisplayMessage>
      )}
    </Content>
  );
};

export default RoomList;
