import rooms from '../db/rooms';
import { BoardFrontend, Coordinates, csRoundParams, Move } from '../types';
import { isQuiz } from './quiz';
import { validateMove } from './validate';

export const startGame = (roomID: string) => {
  // First init room and check everything is cool & working

  const room = rooms[roomID];

  if (!room || room.players.length !== 2) {
    throw new Error('Room is not ready to start game');
  }

  const board = room.board.toFrontendBoard();

  console.log('Hello there');
  room.players[0]?.socket.emit('round', {
    board,
    isMyMove: true,
  } as csRoundParams);

  room.players[1]?.socket.emit('round', {
    board,
    isMyMove: false,
  } as csRoundParams);
};

export const playRound = (roomId: string, move: Move) => {
  const board = rooms[roomId].board;

  const boardWidth = rooms[roomId].board.width;
  const boardHeight = rooms[roomId].board.height;

  // Validate move
  validateMove(board, move, boardHeight, boardWidth);

  // Do we need to activate quiz?

  // We don't need this - if BFS returns at least
  // one box than we know we have a quiz
  // if (isQuiz(board, move)) {
  //   // TODO Handle quiz, and move to other callback

  //   return;
  // }

  // Make move on board
  const [enclosedBoxes, newBoard]: [Array<Coordinates>, BoardFrontend] = makeMove(
    move,
    roomId,
    boardHeight,
    boardWidth,
  );

  // If at least one box has been enclosed, you only then
  // need to run the quiz
  if (enclosedBoxes.length > 0) {
    console.log(enclosedBoxes);
    // All the boxes that will be awarded in this quiz
    // are in the `enclosedBoxes` list, but they are
    // not drawn on the map yet
  }

  // Emit move to players

  rooms[roomId].players[0]?.socket.emit('round', {
    board: newBoard,
    isMyMove: !(rooms[roomId].currentPlayer == rooms[roomId].players[0]),
  } as csRoundParams);

  rooms[roomId].players[1]?.socket.emit('round', {
    board: newBoard,
    isMyMove: !(rooms[roomId].currentPlayer == rooms[roomId].players[1]),
  } as csRoundParams);

  if (rooms[roomId].currentPlayer == rooms[roomId].players[0]) {
    rooms[roomId].currentPlayer = rooms[roomId].players[1];
  } else {
    rooms[roomId].currentPlayer = rooms[roomId].players[0];
  }
};

const makeMove = (
  move: Move,
  roomId: string,
  boardHeight: number,
  boardWidth: number,
): [Array<Coordinates>, BoardFrontend] => {
  if (!rooms[roomId]) {
    throw new Error('Room does not exist');
  }

  // TODO: deepcopy if we plan to add bot.
  const board = rooms[roomId].board;

  board.makeMove(rooms[roomId].currentPlayer, move);
  const enclosedBoxes: Array<Coordinates> = board.getEnclosedBoxes(
    move,
    boardHeight,
    boardWidth,
  );
  return [enclosedBoxes, board.toFrontendBoard()];
};
