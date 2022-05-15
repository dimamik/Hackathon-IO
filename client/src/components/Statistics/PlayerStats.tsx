import EnemyScore from './EnemyScore';
import PlayerScore from './PlayerScore';
import Turn from './Turn';
import { Container, Row, Col } from 'react-bootstrap';
import { MapContext } from '../../context/Context';
import { useContext } from 'react';
import './Statiscs.css';

interface Props {
  firstPlayerScore: number;
  secondPlayerScore: number;
}

function PlayerStats(props: Props) {
  const { gameConfig } = useContext(MapContext);
  const yourPoints =
    gameConfig.playerID == 0 ? props.firstPlayerScore : props.secondPlayerScore;
  const enemyPoints =
    gameConfig.playerID == 1 ? props.firstPlayerScore : props.secondPlayerScore;
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
            <PlayerScore points={yourPoints} />
          </Col>
          <Col></Col>
          <Col>
            <EnemyScore points={enemyPoints} />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default PlayerStats;
