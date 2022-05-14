import { Player } from './Player';
import { Move } from '../types';

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

  makeMove(player: Player, {coordinates, type}: Move) {
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
    };
  }
}

type PlayerFrontend = 0 | 1;


export class BoardFrontend {
  horizontal: CoordinateMap<PlayerFrontend> = {};
  vertical: CoordinateMap<PlayerFrontend> = {};
  boxes: CoordinateMap<PlayerFrontend> = {};

  constructor(backendBoard: Board, player0: Player) {
    this.horizontal = Object.fromEntries().horizontal;
  }

  makeMove(coordinates: Coordinates, type: 'horizontal' | 'vertical') {
    this.board.makeMove(this.player, {coordinates, type});
  }
}