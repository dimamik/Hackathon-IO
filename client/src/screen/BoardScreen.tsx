import React, { useContext, useEffect } from 'react';
import { MapContext } from '../context/Context';
import Board from '../components/Board'
import { mapStateMock } from '../types/BoardTypes';
import './BoardScreen.css'
import PlayerStats from '../components/Statistics/PlayerStats';

function BoardScreen() {
  const {setMapState} = useContext(MapContext)
  return (
    <div className='board-container'>
      <PlayerStats />
      <div className='grey-border'>
        <div className='white-border'>
          <div className='grey-border'>
            <div className='violet-border'>
              <Board width={10} height={10}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardScreen;
