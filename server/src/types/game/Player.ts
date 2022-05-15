import { ServerSocket } from '../sockets';

export type Player = {
  socket: ServerSocket | null;
  id: PlayerFrontend;
} | null;

export type PlayerFrontend = 0 | 1 | -1;
