import React from 'react';
import { MapContextType, MapState, mapStateMock } from '../types/';

const initMapContext: MapContextType = {
  mapState: mapStateMock,
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
          mapState: this.state,
          setMapState: this.setMapState,
        }}>
        {this.props.children}
      </MapContext.Provider>
    );
  }
}
