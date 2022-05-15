import { Quiz, Move } from './types';
import { BoardFrontend, PlayerFrontend } from './game';

export type csCreateParams = {
  width: number;
  height: number;
  maxPoints: number;
  maxTime: number;
  isLocal: boolean;
};

export type scCreatedParams = {
  roomID: string;
};

export type csJoinParams = {
  roomID: string;
};

export type scRoundParams = {
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

// QUIZES

export type scQuizParams = {
  questions: Quiz[];
};

export type csQuizAnswerParams = {
  points: number;
  roomID: string;
};

export type scGameOverParams = {
  winner: PlayerFrontend;
};
