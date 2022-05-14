import { Coordinates, MapState, BoardFrontend } from '../types';

export function computeEnclosedBoxes(
  { board }: MapState,
  clickedPosition: Coordinates,
  clickHorizontal: boolean,
  mapWidth: number,
  mapHeight: number,
): Array<string> {
  if (clickHorizontal) {
    if (board.horizontal[clickedPosition] === undefined) {
      throw new Error(
        'Clicked position has to be saved to map state before calling computeEnclosedBoxes',
      );
    }
  } else {
    if (board.vertical[clickedPosition] === undefined) {
      throw new Error(
        'Clicked position has to be saved to map state before calling computeEnclosedBoxes',
      );
    }
  }

  const clickY = parseInt(clickedPosition.split(',')[0]);
  const clickX = parseInt(clickedPosition.split(',')[1]);
  // determine the two starting boxes
  const boxOnePosition: [number, number] = [clickY, clickX];
  const boxTwoPosition: [number, number] = clickHorizontal
    ? [clickY - 1, clickX]
    : [clickY, clickX - 1];

  const boxIsInMap = (boxPosition: [number, number]): boolean => {
    return (
      boxPosition[0] >= 0 &&
      boxPosition[1] >= 0 &&
      boxPosition[0] < mapHeight &&
      boxPosition[1] < mapWidth
    );
  };

  const enclosedBoxes: string[] = [];

  const searchEnclosedBoxes = (
    board: BoardFrontend,
    fromPosition: [number, number],
    mapHeight: number,
    mapWidth: number,
  ): Array<string> => {
    const boxQueue = [fromPosition] as Array<[number, number]>;
    const visited = new Set<[number, number]>();

    // If at any point in time a box is extracted from the queue that is not on the map
    // (outside of map bounds) that means map has been left and the area is not enclosed

    const positionToEncoding = (position: [number, number]): Coordinates => {
      return `${position[0]},${position[1]}`;
    };

    const boxNeighbours = (boxPosition: [number, number]): Array<[number, number]> => {
      const result = new Array<[number, number]>();
      if (!board.horizontal[positionToEncoding(boxPosition)]) {
        result.push([boxPosition[0] - 1, boxPosition[1]]);
      }
      if (!board.vertical[positionToEncoding(boxPosition)]) {
        result.push([boxPosition[0], boxPosition[1] - 1]);
      }
      const boxOnTheRight: [number, number] = [boxPosition[0], boxPosition[1] + 1];
      const boxOnTheBottom: [number, number] = [boxPosition[0] + 1, boxPosition[1]];
      if (!board.vertical[positionToEncoding(boxOnTheRight)]) {
        result.push(boxOnTheRight);
      }
      if (!board.horizontal[positionToEncoding(boxOnTheBottom)]) {
        result.push(boxOnTheBottom);
      }
      return result;
    };

    while (boxQueue.length > 0) {
      const currentBoxPosition = boxQueue.shift() as [number, number];
      if (!boxIsInMap(currentBoxPosition)) {
        // Reached the outside of the map -- the area is not enclosed
        return new Array<string>();
      }
      visited.add(currentBoxPosition);
      const neighbours = boxNeighbours(currentBoxPosition);
      for (const neighbour of neighbours) {
        if (!visited.has(neighbour)) {
          boxQueue.push(neighbour);
        }
      }
    }

    // reached all "reachable" boxes -- an area has been enclosed
    return Array.from(visited).map(boxPosition => positionToEncoding(boxPosition));
  };

  if (boxIsInMap(boxOnePosition)) {
    enclosedBoxes.push(...searchEnclosedBoxes(board, boxOnePosition, mapHeight, mapWidth));
  }

  if (boxIsInMap(boxTwoPosition)) {
    enclosedBoxes.push(...searchEnclosedBoxes(board, boxTwoPosition, mapHeight, mapWidth));
  }

  return [];
}
