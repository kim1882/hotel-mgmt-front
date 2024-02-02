export interface IRoom {
  id: number;
  room_type_id: number;
}

export interface IRoomType {
  id: number;
  name: string;
  price: number;
}

export interface IBooking {
  id: number;
  room_id: number;
  guest_name: string;
  checkin: Date | null;
  checkout: Date | null;
}
