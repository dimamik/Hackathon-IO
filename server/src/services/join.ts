import { JoinHandler } from '../types';
import { io } from '../';
import rooms from '../db/rooms';
import { Player } from '../types';
import { startGame } from '../logic/game';

export const handleJoin: JoinHandler = (socket, joinParams) => {
  // TODO take rooms from io.sockets.adapter.rooms

  const roomId = joinParams.roomID;
  console.log(roomId);
  const room = rooms[roomId];

  if (room?.players.length !== 2) {
    throw new Error('Room is not ready to start game');
  }

  rooms[roomId].joinRoom({ socket } as Player);
  socket.join(roomId);

  // There we need to initialize game
  startGame(roomId);
};
