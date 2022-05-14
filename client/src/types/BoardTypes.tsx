export interface MapProps {
  height: number;
  width: number;
}

export interface Player {
  id: number;
  socket: string;
}

export interface MapState {
  horizontalBars: Map<string, Player>;
  verticalBars: Map<string, Player>;
  boxes: Map<string, Player>;
  roomId: string | null;
  playingNow: Player | null;
}

export interface MapContextType {
  horizontalBars: Map<string, Player>;
  verticalBars: Map<string, Player>;
  boxes: Map<string, Player>;
  playingNow: Player | null;
  roomId: string | null;
  setMapState?: (mapState: MapState) => void;
}

export const mapStateMock: MapState = {
  verticalBars: new Map([
    ['2,4', { id: 1, socket: 'lorem' }],
    ['3,5', { id: 0, socket: 'lorem' }],
    ['2,7', { id: 0, socket: 'lorem' }],
  ]),
  horizontalBars: new Map([
    ['4,3', { id: 0, socket: 'lorem' }],
    ['4,6', { id: 1, socket: 'lorem' }],
    ['5,7', { id: 1, socket: 'lorem' }],
    ['7,1', { id: 0, socket: 'lorem' }],
  ]),
  boxes: new Map([
    ['5,3', { id: 0, socket: 'lorem' }],
    ['2,5', { id: 1, socket: 'lorem' }],
    ['4,4', { id: -1, socket: '' }],
  ]),
  playingNow: { id: 0, socket: 'lorem' },
};

export function computeEnclosedBoxes(
  mapState: MapState,
  clickedPosition: string,
  clickHorizontal: boolean,
  mapWidth: number,
  mapHeight: number,
): Array<string> {
  if (clickHorizontal) {
    if (mapState.horizontalBars.get(clickedPosition) === undefined) {
      throw Error(
        'Clicked position has to be saved to map state before calling computeEnclosedBoxes',
      );
    }
  } else {
    if (mapState.verticalBars.get(clickedPosition) === undefined) {
      throw Error(
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

  let enclosedBoxes = Array<string>();

  const searchEnclosedBoxes = (
    mapState: MapState,
    fromPosition: [number, number],
    mapHeight: number,
    mapWidth: number,
  ): Array<string> => {
    const boxQueue = [fromPosition] as Array<[number, number]>;
    const visited = new Set<[number, number]>();

    // If at any point in time a box is extracted from the queue that is not on the map
    // (outside of map bounds) that means map has been left and the area is not enclosed

    const positionToEncoding = (position: [number, number]): string => {
      return position[0].toString() + ',' + position[1].toString();
    };

    const boxNeighbours = (boxPosition: [number, number]): Array<[number, number]> => {
      const result = new Array<[number, number]>();
      if (!mapState.horizontalBars.has(positionToEncoding(boxPosition))) {
        result.push([boxPosition[0] - 1, boxPosition[1]]);
      }
      if (!mapState.verticalBars.has(positionToEncoding(boxPosition))) {
        result.push([boxPosition[0], boxPosition[1] - 1]);
      }
      const boxOnTheRight: [number, number] = [boxPosition[0], boxPosition[1] + 1];
      const boxOnTheBottom: [number, number] = [boxPosition[0] + 1, boxPosition[1]];
      if (!mapState.verticalBars.has(positionToEncoding(boxOnTheRight))) {
        result.push(boxOnTheRight);
      }
      if (!mapState.horizontalBars.has(positionToEncoding(boxOnTheBottom))) {
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
    enclosedBoxes.push(...searchEnclosedBoxes(mapState, boxOnePosition, mapHeight, mapWidth));
  }

  if (boxIsInMap(boxTwoPosition)) {
    enclosedBoxes.push(...searchEnclosedBoxes(mapState, boxTwoPosition, mapHeight, mapWidth));
  }

  return Array<string>();
}
