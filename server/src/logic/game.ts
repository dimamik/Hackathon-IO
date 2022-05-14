import rooms from '../db/rooms';
import { Board, csRoundParams, Move } from '../types';
import { isQuiz } from './quiz';
import { validateMove } from './validate';

export const startGame = (roomID: string) => {
  // First init room and check everything is cool & working

  const room = rooms[roomID];

  if (!room || room.players.length !== 2) {
    throw new Error('Room is not ready to start game');
  }

  console.log('Hello there');
  room.players[0]?.socket.emit('round', {
    board: room.board,
    isMyMove: true,
  } as csRoundParams);

  room.players[1]?.socket.emit('round', {
    board: room.board,
    isMyMove: false,
  } as csRoundParams);
};

export const playRound = (roomId: string, move: Move) => {
  const board = rooms[roomId].board;
  // Validate move
  validateMove(board, move);

  // Do we need to activate quiz?

  if (isQuiz(board, move)) {
    // TODO Handle quiz, and move to other callback

    return;
  }

  // Make move on board
  const newBoard = makeMove(move, roomId);

  // Emit move to players

  rooms[roomId].players[0]?.socket.emit('round', {
    board: newBoard,
    isMyMove: !rooms[roomId].currentPlayer == rooms[roomId].players[0],
  } as csRoundParams);

  rooms[roomId].players[1]?.socket.emit('round', {
    board: newBoard,
    isMyMove: !rooms[roomId].currentPlayer == rooms[roomId].players[1],
  } as csRoundParams);
};

const makeMove = (move: Move, roomId: string) => {
  // TODO Add logic to make move
  const board = rooms[roomId].board;
  const player = rooms[roomId].currentPlayer;
  const players = rooms[roomId].players;

  const id = player == players[0] ? 0 : 1;

  board.makeMove({}, move);
  if (move.type === 'horizontal') {
    board.horizontal[move.coordinates] = id;
  } else {
    board.vertical[move.coordinates] = id;
  }
  return board;
};
