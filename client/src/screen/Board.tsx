import React, { useContext, useEffect } from 'react';
import { MapContext } from '../context/Context';

function Board() {
  const { setPlayingNow } = useContext(MapContext);
  useEffect(() => {
    setPlayingNow({ id: 1, socket: 'fronty sa gitami' });
  });

  return <div>Board</div>;
}

export default Board;
