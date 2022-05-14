import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { handleCreate } from './services/create';
import { handleJoin } from './services/join';
import { handleMove } from './services/move';
import { handleQuizResponse } from './services/quizResponse';
import {
  SettingParams,
  JoinParams,
  MoveParams,
  ServerToClientEvents,
  ClientToServerEvents,
} from './types';

const main = async () => {
  const app = express();

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    /* options */
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    socket.on('create', (settingsParams: SettingParams) =>
      handleCreate(socket, settingsParams),
    );
    socket.on('join', (joinParams: JoinParams) => handleJoin(socket, joinParams));

    socket.on('move', (moveParams: MoveParams) => handleMove(socket, moveParams));
    socket.on('quizResponse', quizResponseParams =>
      handleQuizResponse(socket, quizResponseParams),
    );
  });

  // Add cors to http server

  httpServer.listen(4000, () => {
    console.log('Listening on port 4000');
  });

  app.get('/', (_req, res) => {
    res.send('pong');
  });
};

main().catch(err => {
  console.error(err);
});
