import { Socket } from 'socket.io';

type CoordinateY = number;
type CoordinateX = number;

export type Coordinates = `${CoordinateY},${CoordinateX}`;

type Lines = 'horizontal' | 'vertical';
type Boxes = 'Boxes';

export type Player = 0 | 1;

export type CoordinateMap = {
  [key: Coordinates]: Player;
};

export type Board = {
  [key in Lines | Boxes]: CoordinateMap;
};

export type MoveParams = {
  [key in Lines]?: Player;
};

export type SettingParams = {
  boardSize?: number;
};

export type QuizResponseParams = {};
export type JoinParams = {};

type WrapWithSocket<TFunction extends (...args: any) => any> = (
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  ...args: [Parameters<TFunction>]
) => ReturnType<TFunction>;

type CreateCallback = (settingParams: SettingParams) => void;
export type CreateHandler = WrapWithSocket<CreateCallback>;

export type ServerToClientEvents = {
  create: CreateCallback;
  join: (joinParams: JoinParams) => void;
  move: (moveParams: MoveParams) => void;
  quizResponse: (quizResponseParams: QuizResponseParams) => void;
};

export type ClientToServerEvents = {};
