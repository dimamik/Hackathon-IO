import React from 'react'
import EnemyScore from './EnemyScore'
import PlayerScore from './PlayerScore'
import Turn from './Turn'

function PlayerStats() {
  
  return (
    <div >
      <PlayerScore />
      <Turn />
      <EnemyScore />
    </div>
  )
}

export default PlayerStats
