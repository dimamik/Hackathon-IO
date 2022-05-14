import React from 'react';
import { io } from 'socket.io-client';
import { MapContextType, MapState, mapStateMock, Player } from '../types/BoardTypes';

const initMapContext: MapContextType = {
  horizontalBars: new Map<string, Player>(),
  verticalBars: new Map<string, Player>(),
  boxes: new Map<string, Player>(),
  playingNow: null,
  roomId: null,
  socket: io('http://localhost:4000'),
  setMapState: (mapState: MapState) => {},
};

export const MapContext = React.createContext<MapContextType>(initMapContext);

type Props = {
  children: React.ReactNode;
};

export default class MapProvider extends React.Component<Props> {
  state: MapState = mapStateMock;

  setMapState = (mapState: MapState) => {
    this.setState(mapState);
  };

  render() {
    return (
      <MapContext.Provider
        value={{
          horizontalBars: this.state.horizontalBars,
          verticalBars: this.state.verticalBars,
          boxes: this.state.boxes,
          playingNow: this.state.playingNow,
          roomId: this.state.roomId,
          socket: this.state.socket,
          setMapState: this.setMapState,
        }}>
        {this.props.children}
      </MapContext.Provider>
    );
  }
}
