import { generateRandomRoomId } from '../utils/randomGenerator';
import { CreateHandler } from 'src/types';

export const handleCreate: CreateHandler = (socket, settings) => {

  const roomID = generateRandomRoomId();
  socket.emit('')
  socket.join(roomID);
  console.log(socket.id);
};
