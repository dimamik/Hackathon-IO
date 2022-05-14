import React from 'react'
import EnemyScore from './EnemyScore'
import PlayerScore from './PlayerScore'
import Turn from './Turn'
import { Container, Row, Col } from 'react-bootstrap'
import './Statiscs.css'

function PlayerStats() {
  return (

      <Container fluid>
        <div className='flexDisplay'> 
          <Row>
            <Col><Turn /></Col>
          </Row>
          <Row >
            <Col><PlayerScore/></Col>
            <Col></Col>
            <Col><EnemyScore/></Col>
          </Row>
        </div>
      </Container>

  )
}

export default PlayerStats
