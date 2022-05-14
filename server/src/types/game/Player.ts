import { ServerSocket } from "../sockets";

export type Player = {
  socket: ServerSocket;
} | null;