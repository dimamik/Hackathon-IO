import React, { useContext, useEffect } from 'react';
import { MapContext } from '../context/Context';
import Board from '../components/Board'
import { mapStateMock } from '../types/BoardTypes';
import './BoardScreen.css'

function BoardScreen() {
  const {setMapState} = useContext(MapContext)
  return (
    <div className='board-container'>
      <div className='turn-info-container'>
        * your turn / enemy turn goes here *
      </div>
      <div className='stats-container'>
        <div className='player-score-container'>
          your score
        </div>
        <div className='player-score-container'>
          enemy score
        </div>
      </div>
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
