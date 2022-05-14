// Model types
type CoordinateY = number;
type CoordinateX = number;

export type Coordinates = `${CoordinateY},${CoordinateX}`;

export type CoordinateMap = {
  [key: Coordinates]: Player;
};

type Lines = 'horizontal' | 'vertical';

export class Board {
  horizontal: CoordinateMap = {};
  vertical: CoordinateMap = {};
  boxes: CoordinateMap = {};
}

export type Move = {
  coordinates: Coordinates;
  type: Lines;
};

// TODO:

export type SettingParams = {
  boardSize?: number;
};

export type JoinParams = {};
export type QuizResponseParams = {};

// FRONT TYPES

export interface MapProps {
  height: number;
  width: number;
}

export type Player = {
  id: string;
};

export type BoardFrontend = Board & { currentPlayer: Player } & MapProps;

export type QuizParams = {
  question: string;
  answers: string[];
};

export type ServerToClientDTO = {
  board: BoardFrontend;
  currentPlayer: Player;
  quizParams: QuizParams;
};

export class Room {
  readonly id: string;
  readonly board: Board = new Board();
  readonly players: Player[] = [];
  currentPlayer: Player;
  isQuizActive: boolean = false;

  constructor(roomId: string, currentPlayer?: Player) {
    this.id = roomId;
    if (currentPlayer) {
      this.players.push(currentPlayer);
      this.currentPlayer = currentPlayer;
    }
  }
}
