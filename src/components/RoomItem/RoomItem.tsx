import { IBooking, IRoom, IRoomType } from "@/types";
import { Details, Item, Menu, Action } from "./RoomItem.styles";
import {
  DeleteOutline as DeleteIcon,
  Edit as EditIcon,
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
} from "@mui/material";
import { ModalActions } from "../RoomList/RoomList.styles";
import { updateRoom, useDispatch } from "@/lib/redux";

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

  const handleChange = (event: SelectChangeEvent) => {
    setRoomTypeValue(Number(event.target.value));
  };

  const handleSave = () => {
    const roomToUpdate: IRoom = {
      ...room,
      room_type_id: roomTypeValue,
    };
    dispatch(updateRoom({ id: room.id, room: roomToUpdate }));
    setShowEditModal(false);
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
        <Action onClick={() => setShowEditModal(true)}>
          <EditIcon />
        </Action>
        <Action onClick={() => null}>
          <DeleteIcon />
        </Action>
      </Menu>
      {showEditModal && (
        <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
          <DialogTitle>Edit Room</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <Select
                id="roomTypeSelector"
                value={`${roomTypeValue}`}
                onChange={handleChange}
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
              <Button variant="contained" color="primary" onClick={handleSave}>
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
