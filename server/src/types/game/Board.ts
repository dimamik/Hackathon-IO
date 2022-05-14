import { Player, PlayerFrontend } from './Player';
import { Move } from '../types';
import { mapValues } from 'lodash-es';

type CoordinateY = number;
type CoordinateX = number;

export type Coordinates = `${CoordinateY},${CoordinateX}`;

export type CoordinateMap<Value> = {
  [key: Coordinates]: Value;
};

// type BackendBoardPlayer

export class Board {
  horizontal: CoordinateMap<Player> = {};
  vertical: CoordinateMap<Player> = {};
  boxes: CoordinateMap<Player> = {};

  makeMove(player: Player, { coordinates, type }: Move) {
    switch (type) {
      case 'horizontal':
        this.horizontal[coordinates] = player;
        break;
      case 'vertical':
        this.vertical[coordinates] = player;
        break;
    }
  }

  toFrontendBoard() {
    return new BoardFrontend(this, null);
  }
}

class BoardFrontend {
  horizontal: CoordinateMap<PlayerFrontend>;
  vertical: CoordinateMap<PlayerFrontend>;
  boxes: CoordinateMap<PlayerFrontend>;

  constructor(backendBoard: Board, player0: Player) {
    this.horizontal = mapValues(backendBoard.horizontal, player => player!.id);
    this.vertical = mapValues(backendBoard.vertical, player => player!.id);
    this.boxes = mapValues(backendBoard.boxes, player => player!.id);
  }
}
