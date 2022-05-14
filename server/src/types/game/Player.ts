import { ServerSocket } from '../sockets';

export type Player = {
  socket: ServerSocket;
  id: PlayerFrontend;
} | null;

export type PlayerFrontend = 0 | 1;
