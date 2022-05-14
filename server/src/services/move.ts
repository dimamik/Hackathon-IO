import { MoveHandler } from 'src/types';

export const handleMove: MoveHandler = (socket, moveParams) => {
  console.log(moveParams);
};
