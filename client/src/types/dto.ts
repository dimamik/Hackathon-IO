import { QuizParams, Move } from './types';
import { BoardFrontend } from './game';

export type csCreateParams = {
  width: number;
  height: number;
  maxPoints: number;
  maxTime: number;
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
  board: BoardFrontend;
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
