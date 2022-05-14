import React, { useContext, useEffect } from 'react';
import { MapContext } from '../context/Context';
import Board from '../components/Board'
import { mapStateMock } from '../types/BoardTypes';

function BoardScreen() {
  const {setMapState} = useContext(MapContext)
  return <Board width={10} height={10}/>;
}

export default BoardScreen;
