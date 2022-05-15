import { Player, PlayerFrontend } from './Player';
import { Move } from '../types';
import { mapValues } from 'lodash';

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
  width: number;
  height: number;
  firstPlayerScore: number = 0;
  secondPlayerScore: number = 0;

  constructor(height: number, width: number) {
    this.width = width;
    this.height = height;
  }

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
    return new BoardFrontend(this);
  }

  getEnclosedBoxes(move: Move, boardHeight: number, boardWidth: number): Array<Coordinates> {
    // Returns the boxes enclosed by this move
    if (move.type === 'horizontal' && this.horizontal[move.coordinates] === undefined) {
      throw new Error(
        'Clicked position has to be saved to map state before calling computeEnclosedBoxes',
      );
    }
    if (move.type === 'vertical' && this.vertical[move.coordinates] === undefined) {
      throw new Error(
        'Clicked position has to be saved to map state before calling computeEnclosedBoxes',
      );
    }

    const [clickY, clickX] = move.coordinates.split(',').map(el => parseInt(el));
    // determine the two starting boxes
    const boxOnePosition: [number, number] = [clickY, clickX];
    const boxTwoPosition: [number, number] =
      move.type === 'horizontal' ? [clickY - 1, clickX] : [clickY, clickX - 1];

    const boxIsInMap = (boxPosition: [number, number]): boolean => {
      return (
        boxPosition[0] >= 0 &&
        boxPosition[1] >= 0 &&
        boxPosition[0] < boardHeight &&
        boxPosition[1] < boardWidth
      );
    };

    const searchEnclosedBoxes = (fromPosition: [number, number]): Array<Coordinates> => {
      const boxQueue = [fromPosition] as Array<[number, number]>;
      const visited = new Set<string>();

      // If at any point in time a box is extracted from the queue that is not on the map
      // (outside of map bounds) that means map has been left and the area is not enclosed

      const positionToEncoding = (position: [number, number]): Coordinates => {
        return `${position[0]},${position[1]}`;
      };

      const boxNeighbours = (boxPosition: [number, number]): Array<[number, number]> => {
        const result = new Array<[number, number]>();
        if (this.horizontal[positionToEncoding(boxPosition)] === undefined) {
          result.push([boxPosition[0] - 1, boxPosition[1]]);
        }
        if (this.vertical[positionToEncoding(boxPosition)] === undefined) {
          result.push([boxPosition[0], boxPosition[1] - 1]);
        }
        const boxOnTheRight: [number, number] = [boxPosition[0], boxPosition[1] + 1];
        const boxOnTheBottom: [number, number] = [boxPosition[0] + 1, boxPosition[1]];
        if (this.vertical[positionToEncoding(boxOnTheRight)] === undefined) {
          result.push(boxOnTheRight);
        }
        if (this.horizontal[positionToEncoding(boxOnTheBottom)] === undefined) {
          result.push(boxOnTheBottom);
        }
        return result;
      };

      // The real BFS goes here
      while (boxQueue.length > 0) {
        const currentBoxPosition = boxQueue.shift() as [number, number];
        const currentEncoding = positionToEncoding(currentBoxPosition);
        if (!boxIsInMap(currentBoxPosition)) {
          // Reached the outside of the map -- the area is not enclosed
          return new Array<Coordinates>();
        }
        visited.add(currentEncoding);
        const neighbours = boxNeighbours(currentBoxPosition);
        for (const neighbour of neighbours) {
          const neighbourEncoding = positionToEncoding(neighbour);
          if (!visited.has(neighbourEncoding)) {
            boxQueue.push(neighbour);
          }
        }
      }

      // reached all "reachable" boxes -- an area has been enclosed
      return Array.from(visited).map(el => el as Coordinates);
    };

    const enclosedBoxes: Coordinates[] = [];

    if (boxIsInMap(boxOnePosition)) {
      enclosedBoxes.push(...searchEnclosedBoxes(boxOnePosition));
    }

    if (boxIsInMap(boxTwoPosition)) {
      enclosedBoxes.push(...searchEnclosedBoxes(boxTwoPosition));
    }

    return enclosedBoxes;
  }

  addEnclosedBoxes(boxes: Board['boxes']) {
    this.boxes = { ...this.boxes, ...boxes };
  }
}

export class BoardFrontend {
  horizontal: CoordinateMap<PlayerFrontend>;
  vertical: CoordinateMap<PlayerFrontend>;
  boxes: CoordinateMap<PlayerFrontend>;
  width: number;
  height: number;
  firstPlayerScore: number;
  secondPlayerScore: number;

  constructor(backendBoard: Board) {
    this.horizontal = mapValues(backendBoard.horizontal, player => player!.id);
    this.vertical = mapValues(backendBoard.vertical, player => player!.id);
    this.boxes = mapValues(backendBoard.boxes, player => player!.id);
    this.height = backendBoard.height;
    this.width = backendBoard.width;
    this.firstPlayerScore = backendBoard.firstPlayerScore;
    this.secondPlayerScore = backendBoard.firstPlayerScore;
    console.log(this);
  }
}
