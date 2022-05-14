import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { handleCreate } from './services/create';
import { handleJoin } from './services/join';
import { handleMove } from './services/move';
import { handleQuizResponse } from './services/quizResponse';
import { ServerSocket } from './types';

const app = express();

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: ServerSocket) => {
  socket.on('create', settingsParams => handleCreate(socket, settingsParams));
  socket.on('join', joinParams => handleJoin(socket, joinParams));

  socket.on('move', moveParams => handleMove(socket, moveParams));
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
