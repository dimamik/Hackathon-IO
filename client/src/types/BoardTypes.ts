import { BoardFrontend, Player } from './types';

export interface MapProps {
  height: number;
  width: number;
}

export interface MapState {
  board: BoardFrontend;
  roomId: string | null;
  playingNow: Player | null;
}

export interface MapContextType {
  mapState: MapState;
  setMapState?: (mapState: MapState) => void;
}

export const mapStateMock: MapState = {
  board: {
    vertical: {
      '2,4': 1,
      '3,5': 0,
      '2,7': 0,
    },
    horizontal: {
      '4,3': 0,
      '4,6': 1,
      '5,7': 1,
      '7,1': 1,
    },
    boxes: {
      '5,3': 0,
      '2,5': 1,
      '4,4': -1,
    },
  },
  playingNow: 0,
  roomId: '',
};
