import { JoinHandler } from '../types';

export const handleJoin: JoinHandler = (socket, joinParams) => {
  const roomId = joinParams.roomId;
  socket.join(roomId);
};
