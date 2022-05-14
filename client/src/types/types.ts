type CoordinateY = number;
type CoordinateX = number;

export type Coordinates = `${CoordinateY},${CoordinateX}`;

type Lines = 'horizontal' | 'vertical';
type Boxes = 'boxes';

// TODO:
export type Player = 0 | 1 | -1;

export type CoordinateMap = {
  [key: Coordinates]: Player;
};

export type BoardFrontend = {
  [key in Lines | Boxes]: CoordinateMap;
};

export type Move = {
  coordinates: Coordinates;
  type: Lines;
};

// TODO: temporary
export type QuizParams = {
  question: string;
  answers: string[];
};
