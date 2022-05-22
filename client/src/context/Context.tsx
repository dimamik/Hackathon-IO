import React from 'react';
import { MapContextType, mapStateMock, scRoundParams, gameConfigMock } from '../types/';

const initMapContext: () => MapContextType = () => {
  return {
    gameConfig: gameConfigMock,
    mapState: mapStateMock(),
    setPlayerID: (id: number) => {
      return Promise.resolve(null);
    },
    setMapconfig: (width: number, height: number, maxPoints: number, time: number) =>
      Promise.resolve(null),
    setRoomId: roomId => Promise.resolve(null),
    setParams: (params: scRoundParams, shouldShowModal: boolean) => Promise.resolve(null),
    setShouldShowModal: (shouldShowModal: boolean) => {},
  };
};

export const MapContext = React.createContext<MapContextType>(initMapContext());
export const SecondPlayerMapContext = React.createContext<MapContextType>(initMapContext());

type Props = {
  contextInstance: React.Context<MapContextType>;
  children: React.ReactNode;
};

export default class MapProvider extends React.Component<Props> {
  state = {
    mapState: mapStateMock(),
    config: gameConfigMock,
  };

  setPlayerID = (id: number) => {
    const promise = new Promise<null>(resolve => {
      this.setState(
        {
          mapState: {
            ...this.state.mapState,
          },
          config: { ...this.state.config, playerID: id },
        },
        () => {
          resolve(null);
        },
      );
    });
    return promise;
  };

  setRoundParams = (params: scRoundParams, shouldShowModal: boolean) => {
    const promise = new Promise<null>(resolve => {
      this.setState(
        {
          mapState: {
            ...this.state.mapState,
            board: params.board,
            isMyMove: params.isMyMove,
          },
          config: {
            ...this.state.config,
            shouldShowModal,
          },
        },
        () => {
          resolve(null);
        },
      );
    });
    return promise;
  };

  setMapconfig = (width: number, height: number, maxPoints: number, time: number) => {
    const promise = new Promise<null>(resolve => {
      this.setState({
        mapState: this.state.mapState,
        config: {
          ...this.state.config,
          width,
          height,
          maxPoints,
          time,
        },
      });
      resolve(null);
    });
    return promise;
  };

  setRoomId = (roomID: string) => {
    const promise = new Promise<null>(resolve => {
      this.setState(
        {
          mapState: {
            ...this.state.mapState,
            roomID: roomID,
          },
          config: this.state.config,
        },
        () => {
          resolve(null);
        },
      );
    });
    return promise;
  };

  setShouldShowModal = (shouldShowModal: boolean) => {
    this.setState({
      mapState: this.state.mapState,
      config: {
        ...this.state.config,
        shouldShowModal,
      },
    });
  };

  render() {
    return (
      <this.props.contextInstance.Provider
        value={{
          gameConfig: this.state.config,
          mapState: this.state.mapState,
          setPlayerID: this.setPlayerID,
          setParams: this.setRoundParams,
          setMapconfig: this.setMapconfig,
          setRoomId: this.setRoomId,
          setShouldShowModal: this.setShouldShowModal,
        }}>
        {this.props.children}
      </this.props.contextInstance.Provider>
    );
  }
}
