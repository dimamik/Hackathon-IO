import React, { useContext } from 'react';
import PlayerStats from '../components/Statistics/PlayerStats';
import { MapContext } from '../context/Context';

function HomeScreen() {
  return (
    <div>
      <PlayerStats />
    </div>
  );
}

export default HomeScreen;
