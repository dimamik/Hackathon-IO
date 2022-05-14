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

export type QuizParams = {
  question: string;
  answers: string[];
};

export type ServerToClientDTO = {
  board: BoardFrontend;
  currentPlayer: Player;
  quizParams: QuizParams;
};
