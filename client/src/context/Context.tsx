import React from 'react';
import { MapContextType, MapState, Player } from '../types/Map';

const initMapContext: MapContextType = {
  horizontalBars: new Map<string, Player>(),
  verticalBars: new Map<string, Player>(),
  boxes: new Map<string, Player>(),
  playingNow: null,
  setMapState: (mapState: MapState) => {},
};

export const MapContext = React.createContext<MapContextType>(initMapContext);

type Props = {
  children: React.ReactNode;
};

export default class MapProvider extends React.Component<Props> {
  state: MapState = {
    horizontalBars: new Map<string, Player>(),
    verticalBars: new Map<string, Player>(),
    boxes: new Map<string, Player>(),
    playingNow: null,
  };

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
          setMapState: this.setMapState,
        }}>
        {this.props.children}
      </MapContext.Provider>
    );
  }
}
