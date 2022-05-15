import internal from 'stream';
import { Board, Move } from '../types';

export const validateMove = (
  board: Board,
  move: Move,
  mapHeight: number,
  mapWidth: number,
): boolean => {
  // TODO
  // Move has to:
  // 1. Lie inside of the map bounds
  // 2. Not lie on a border of any of the awarded/burned taken boxes
  // 3. Not lie on a move that has already been done before

  const coordY = parseInt(move.coordinates.split(',')[0]);
  const coordX = parseInt(move.coordinates.split(',')[1]);

  // 1.
  if (coordY < 0 || coordY >= mapHeight || coordX < 0 || coordX >= mapWidth) {
    return false;
  }

  // 2.
  const secondBoxNeighbour =
    move.type === 'horizontal' ? `${coordY - 1},${coordX}` : `${coordY},${coordX - 1}`;

  if (
    board.boxes[secondBoxNeighbour] !== undefined ||
    board.boxes[move.coordinates] !== undefined
  ) {
    return false;
  }

  // 3.
  if (move.type === 'horizontal' && board.horizontal[move.coordinates] !== undefined) {
    return false;
  }
  if (move.type === 'vertical' && board.vertical[move.coordinates] !== undefined) {
    return false;
  }

  return true;
};
