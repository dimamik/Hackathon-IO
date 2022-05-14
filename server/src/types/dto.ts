import { QuizParams, Move } from './types';
import { Board } from './game';

export type csCreateParams = {
  boardSize: string;
  quizParams: QuizParams;
  isLocal: boolean;
};

export type scCreatedParams = {
  roomID: string;
};

export type csJoinParams = {
  roomID: string;
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
