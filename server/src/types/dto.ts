import { Board, QuizParams, Move } from './types';

export type csCreateParams = {
  boardSize: string;
  quizParams: QuizParams;
  isLocal: boolean;
};

export type scCreatedParams = {
  roomId: string;
};

export type csJoinParams = {
  roomId: string;
};

export type csRoundParams = {
  board: Board;
  isMyMove: boolean;
};

export type csMoveParams = {
  move: Move;
  roomID: string;
};

export type scRejectedParams = {
  reason: string;
};

export type scQuizParams = {
  question: string;
  answers: string[];
};

export type csQuizParams = {
  answer: number;
};

export type scQuizResultParams = {
  isCorrect: boolean;
};
