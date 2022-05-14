import React, { useContext } from 'react';
import PlayerStats from '../components/Statistics/PlayerStats';
import { MapContext } from '../context/Context';

function HomeScreen() {
  const { playingNow } = useContext(MapContext);
  return (
    <div>
      <PlayerStats />
      {playingNow?.socket}
    </div>
  );
}

export default HomeScreen;
