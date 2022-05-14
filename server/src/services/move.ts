import { MoveHandler } from '../types';
import { playRound } from '../logic/game';

export const handleMove: MoveHandler = (socket, moveParams) => {
  playRound(moveParams.roomID, moveParams.move);
};
