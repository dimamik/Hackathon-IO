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

// TODO:

export type SettingParams = {
  boardSize?: number;
};

export type JoinParams = {};

// export type Sockett = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
