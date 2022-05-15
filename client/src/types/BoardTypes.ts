import { ClientSocket } from './sockets';
import { io } from 'socket.io-client';
import { BoardFrontend } from './types';
import { csRoundParams } from './dto';

export interface MapState {
  board: BoardFrontend;
  roomID: string | null;
  isMyMove: boolean;
  socket: ClientSocket | null;
}

export type GameConfig = {
  width: number;
  height: number;
  time: number;
  maxPoints: number;
  shouldShowModal: boolean,
};

export interface MapContextType {
  gameConfig: GameConfig;
  mapState: MapState;
  setRoomId: (roomId: string) => void;
  setMapconfig: (width: number, height: number, maxPoints: number, time: number) => void;
  setParams: (params: csRoundParams, shouldShowModal: boolean) => void;
  setShouldShowModal: (shouldShow: boolean) => void;
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
    height:0,
    width: 0,
  },
  isMyMove: true,
  roomID: '',
  socket: io('http://localhost:4000'),
};

export const gameConfigMock: GameConfig = {
  width: 10,
  height: 10,
  maxPoints: 50,
  time: 100,
  shouldShowModal: false,
};
