export interface IRoom {
  id: number;
  roomTypeId: number;
}

export interface IRoomType {
  id: number;
  name: string;
  price: number;
}

export interface IBooking {
  id: number;
  roomId: number;
  guestName: string;
  checkin: Date;
  checkout: Date;
}
