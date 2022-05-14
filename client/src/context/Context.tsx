import React from 'react';
import { MapContextType, MapState, Player } from '../types/Map';

const initMapContext: MapContextType = {
  horizontalBars: new Map<string, Player>(),
  verticalBars: new Map<string, Player>(),
  boxes: new Map<string, Player>(),
  playingNow: null,
  setPlayingNow: (player: Player) => {},
  setHorizontaBars: (map: Map<string, Player>) => {},
  setVerticalBars: (map: Map<string, Player>) => {},
  setBoxes: (map: Map<string, Player>) => {},
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

  setPlayingNow = (player: Player) => {
    this.setState({ ...this.state, playingNow: player });
  };
  setHorizontaBars = (map: Map<string, Player>) => {
    this.setState({ ...this.state, horizontalBars: map });
  };
  setVerticalBars = (map: Map<string, Player>) => {
    this.setState({ ...this.state, verticalBars: map });
  };
  setBoxes = (map: Map<string, Player>) => {
    this.setState({ ...this.state, boxes: map });
  };

  render() {
    return (
      <MapContext.Provider
        value={{
          horizontalBars: this.state.horizontalBars,
          verticalBars: this.state.verticalBars,
          boxes: this.state.boxes,
          playingNow: this.state.playingNow,
          setPlayingNow: this.setPlayingNow,
          setHorizontaBars: this.setHorizontaBars,
          setVerticalBars: this.setVerticalBars,
          setBoxes: this.setBoxes,
        }}>
        {this.props.children}
      </MapContext.Provider>
    );
  }
}
