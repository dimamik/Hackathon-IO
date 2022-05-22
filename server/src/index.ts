import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { handleCreate } from './services/create';
import { handleJoin } from './services/join';
import { handleMove } from './services/move';
import { handleQuizResponse } from './services/quizResponse';
import { Quiz, ServerSocket } from './types';
import { getRandomQuiz, addQuiz } from './utils/quiz';

import cors from 'cors';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

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

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(
  cors({
    origin: '*',
  }),
);

app.get('/', (_req, res) => {
  res.send('pong');
});

app.post('/add_question', (req, res) => {
  console.log(req.body.quiz);
  addQuiz(req.body.quiz as Quiz);
  res.send('Added');
});
