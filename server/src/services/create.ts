import { generateRandomRoomId } from '../utils/randomGenerator';
import { CreateHandler, Player, scCreatedParams } from '../types';
import rooms from '../db/rooms';
import { Room } from '../types';

export const handleCreate: CreateHandler = (socket, settings) => {
  console.log('Create is working');
  const roomID = generateRandomRoomId();
  rooms[roomID] = new Room(roomID, settings, { socket, id: 0 } as Player);
  socket.join(roomID);
  socket?.emit('created', { roomID } as scCreatedParams);
  console.log(settings);
};
