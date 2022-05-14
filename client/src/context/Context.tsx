import React from 'react';
import { MapContextType, MapState, mapStateMock, csRoundParams, gameConfigMock } from '../types/';

const initMapContext: MapContextType = {
  gameConfig: gameConfigMock,
  mapState: mapStateMock,
  setMapconfig: (width: number, height: number, maxPoints: number, time: number) => {},
  setRoomId: (roomId) => {},
  setParams: (params: csRoundParams) => {},
};

export const MapContext = React.createContext<MapContextType>(initMapContext);

type Props = {
  children: React.ReactNode;
};

export default class MapProvider extends React.Component<Props> {
  state = {    
    mapState: mapStateMock,
    config: gameConfigMock,
  }

  setRoundParams = (params: csRoundParams) => {
    console.log(params);
    this.setState({
      mapState: {
        ...this.state.mapState,
        board: params.board,
        isMyMove: params.isMyMove
      },
      config: this.state.config
    })
  }

  setMapconfig = (width: number, height: number, maxPoints: number,
    time: number) => {
      this.setState({
        mapState: this.state.mapState,
        config: {
          ...this.state.config,
          width,
          height, 
          maxPoints, 
          time
        },
      })
    }

  setRoomId = (roomID: string) => {
    this.setState({
      mapState: {
        ...this.state.mapState,
        roomID
      },
      config: this.state.config,
    })
  }

  render() {
    return (
      <MapContext.Provider
        value={{
          gameConfig: this.state.config,
          mapState: this.state.mapState,
          setParams: this.setRoundParams,
          setMapconfig: this.setMapconfig,
          setRoomId: this.setRoomId,
        }}>
        {this.props.children}
      </MapContext.Provider>
    );
  }
}
function BoardFrontend(board: any, BoardFrontend: any) {
  throw new Error('Function not implemented.');
}

