import { ServerSocket } from './sockets';
import { BoardFrontend, Coordinates, Player } from './game';

// Model types

type Lines = 'horizontal' | 'vertical';

export type Move = {
  coordinates: Coordinates;
  type: Lines;
};

// TODO: remove below?
// FRONT TYPES

export interface MapProps {
  height: number;
  width: number;
}

export type Quiz = {
  question: string;
  answers: string[];
  correctAnswer: number;
  points: number;
};

export type ServerToClientDTO = {
  board: BoardFrontend;
  currentPlayer: Player;
  quizParams: Quiz;
};
