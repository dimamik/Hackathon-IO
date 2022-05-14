type CoordinateY = number;
type CoordinateX = number;

export type Coordinates = `${CoordinateY},${CoordinateX}`;


export type CoordinateMap = {
  [key: Coordinates]: Player;
};

export type Board = {
  horizontal: CoordinateMap;
  vertical: CoordinateMap;
  boxes: CoordinateMap;
};

export type MoveParams = {
  horizontal?: Player | undefined;
  vertical?: Player | undefined;
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

export interface Player {
  id: string;
}

export type BoardFrontend = Board & { currentPlayer: Player } & MapProps;

export type QuizParams = {
  question: string;
  answers: string[];
}

export type ServerToClientDTO = {
  board: BoardFrontend;
  currentPlayer: Player;
  quizParams: QuizParams;
};

// SOCKET TYPES

export type Room = {
  id: string;
  board: Board;
  players: Player[];
  currentPlayer: Player;
  isQuizActive: boolean;
};

export type ServerToClientEvents = {
  board: ()
};



