import { IBooking, IRoom, IRoomType } from "@/types";
import { Details, Item, Menu, Action } from "./RoomItem.styles";
import {
  Edit as EditIcon,
  Hotel as BookIcon,
  Login as CheckinIcon,
  Logout as CheckoutIcon,
} from "@mui/icons-material";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import { ModalActions } from "../RoomList/RoomList.styles";
import {
  createBooking,
  updateBooking,
  updateRoom,
  useDispatch,
} from "@/lib/redux";

interface RoomItemProps {
  room: IRoom;
  roomTypes: IRoomType[];
  bookings: IBooking[];
}

const RoomItem = ({ room, roomTypes, bookings }: RoomItemProps) => {
  const dispatch = useDispatch();
  const roomType = roomTypes.find(
    (roomType) => roomType.id === room.room_type_id
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [roomTypeValue, setRoomTypeValue] = useState(room.room_type_id);
  const [showBookRoomModal, setShowBookRoomModal] = useState(false);
  const [guestNameValue, setGuestNameValue] = useState("");

  const handleChangeRoomType = (event: SelectChangeEvent) => {
    setRoomTypeValue(Number(event.target.value));
  };

  const handleChangeGuestName = (event: React.FocusEvent<HTMLInputElement>) => {
    setGuestNameValue(event.target.value);
  };

  const handleSaveEditRoom = () => {
    const roomToUpdate: IRoom = {
      ...room,
      room_type_id: roomTypeValue,
    };
    dispatch(updateRoom({ id: room.id, room: roomToUpdate }));
    setShowEditModal(false);
  };

  const handleSaveBookRoom = () => {
    const bookingToCreate: Omit<IBooking, "id"> = {
      room_id: room.id,
      guest_name: guestNameValue,
      checkin: null,
      checkout: null,
    };
    dispatch(createBooking(bookingToCreate));
    setShowBookRoomModal(false);
  };

  const handlCheckIn = (booking: IBooking) => {
    const bookingToUpdate: IBooking = { ...booking, checkin: new Date() };
    dispatch(updateBooking({ id: booking.id, booking: bookingToUpdate }));
  };

  const handlCheckOut = (booking: IBooking) => {
    const bookingToUpdate: IBooking = { ...booking, checkout: new Date() };
    dispatch(updateBooking({ id: booking.id, booking: bookingToUpdate }));
  };

  const determinateAction = () => {
    let action = (
      <Tooltip title="Book room">
        <Action onClick={() => setShowBookRoomModal(true)}>
          <BookIcon />
        </Action>
      </Tooltip>
    );
    let currentBooking = bookings.find(
      (bookingItem) => bookingItem.checkin === null
    );
    if (currentBooking) {
      action = (
        <Tooltip title="Check-In">
          <Action onClick={() => handlCheckIn(currentBooking)}>
            <CheckinIcon />
          </Action>
        </Tooltip>
      );
    } else {
      currentBooking = bookings.find(
        (bookingItem) => bookingItem.checkout === null
      );
      if (currentBooking) {
        action = (
          <Tooltip title="Check-Out">
            <Action onClick={() => handlCheckOut(currentBooking)}>
              <CheckoutIcon />
            </Action>
          </Tooltip>
        );
      }
    }
    return action;
  };

  return (
    <Item>
      <Details>
        <div>{room.id}</div>
        <div>{roomType?.name}</div>
        <div>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(roomType?.price || 0)}
        </div>
      </Details>
      <Menu>
        <Tooltip title="Edit Room Type">
          <Action onClick={() => setShowEditModal(true)}>
            <EditIcon />
          </Action>
        </Tooltip>

        {determinateAction()}
      </Menu>
      {showEditModal && (
        <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
          <DialogTitle>Edit Room</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <Select
                id="roomTypeSelector"
                value={`${roomTypeValue}`}
                onChange={handleChangeRoomType}
              >
                {roomTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ModalActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveEditRoom}
              >
                Save
              </Button>
            </ModalActions>
          </DialogContent>
        </Dialog>
      )}
      {showBookRoomModal && (
        <Dialog
          open={showBookRoomModal}
          onClose={() => setShowBookRoomModal(false)}
        >
          <DialogTitle>Book Room</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <TextField
                autoFocus
                fullWidth
                variant="outlined"
                size="small"
                defaultValue={guestNameValue}
                placeholder="Guest name"
                onBlur={handleChangeGuestName}
              />
            </FormControl>
            <ModalActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowBookRoomModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveBookRoom}
              >
                Save
              </Button>
            </ModalActions>
          </DialogContent>
        </Dialog>
      )}
    </Item>
  );
};

export default RoomItem;
