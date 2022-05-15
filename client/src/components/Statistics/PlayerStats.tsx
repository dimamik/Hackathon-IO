import React from 'react';
import EnemyScore from './EnemyScore';
import PlayerScore from './PlayerScore';
import Turn from './Turn';
import { Container, Row, Col } from 'react-bootstrap';
import './Statiscs.css';

interface Props {
  firstPlayerScore: number;
  secondPlayerScore: number;
}

function PlayerStats(props: Props) {
  return (
    <Container fluid>
      <div className="flexDisplay">
        <Row>
          <Col>
            <Turn />
          </Col>
        </Row>
        <Row>
          <Col>
            <PlayerScore points={props.firstPlayerScore} />
          </Col>
          <Col></Col>
          <Col>
            <EnemyScore points={props.secondPlayerScore} />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default PlayerStats;
