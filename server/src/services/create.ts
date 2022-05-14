import { generateRandomRoomId } from '../utils/randomGenerator';
import { CreateHandler, Player, scCreatedParams } from '../types';
import rooms from '../db/rooms';
import { Room } from '../types';

export const handleCreate: CreateHandler = (socket, settings) => {
  const roomID = generateRandomRoomId();
  rooms[roomID] = new Room(roomID, { socket } as Player);
  socket.join(roomID);
  socket.emit('created', { roomID } as scCreatedParams);
  console.log(settings);
};
