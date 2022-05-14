import { generateRandomRoomId } from '../utils/randomGenerator';
import { CreateHandler, Player, scCreatedParams } from 'src/types';
import rooms from '../db/rooms';
import { Room } from '../types';

export const handleCreate: CreateHandler = (socket, settings) => {
  const roomID = generateRandomRoomId();
  rooms[roomID] = new Room(roomID, { id: socket.id } as Player);
  socket.join(roomID);
  socket.emit('created', { roomId: roomID } as scCreatedParams);
};
