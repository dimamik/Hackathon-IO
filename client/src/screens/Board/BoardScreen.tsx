import { useContext, useState } from 'react';
import { MapContext } from '../../context/Context';
import Board from '../../components/Board/Board';
import PlayerStats from '../../components/Statistics/PlayerStats';
import Modal from 'react-modal';
import Question from '../../components/Modals/QuestionComponents';
import { Quiz, scQuizParams, scRoundParams } from '../../types';
import WaitingForPlayer from '../../components/Modals/WaitingForPlayer';
import GameOver from '../../components/Modals/GameOverComponts';
import './BoardScreen.css';

Modal.setAppElement('#root');

export interface BoardProps {
  width: number;
  height: number;
  maxPoints: number;
  time: number;
}

function BoardScreen() {
  const { mapState, setParams, gameConfig } = useContext(MapContext);

  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Quiz | null>(null);
  const [currentTurnPoints, setCurrentTurnPoints] = useState(0);
  const [questions, setQuestions] = useState<Quiz[]>([]);

  function toggleQuestionModal() {
    setIsQuestionOpen(!isQuestionOpen);
  }

  const [isWaitingOpen, setIsWaitingOpen] = useState(gameConfig.shouldShowModal);
  function toggleWaitingModal() {
    setIsWaitingOpen(!isWaitingOpen);
  }
  const [isGameOver, setIsGameOver] = useState(false);
  function toggleGameOverModal() {
    setIsGameOver(!isGameOver);
  }

  mapState.socket?.on('round', (ev: scRoundParams) => {
    setIsWaitingOpen(false);
    setParams(ev, false);
  });

  const closeModal = (correct: boolean) => {
    setTimeout(() => {
      setIsQuestionOpen(false);
      if (currentQuestion && correct) {
        setCurrentTurnPoints(currentTurnPoints + currentQuestion?.points);
        if (!nextQuestion() && mapState.roomID) {
          mapState.socket?.emit('quizResponse', {
            points: currentTurnPoints,
            roomID: mapState.roomID,
          });
        }
      }
    }, 2000);
  };

  const nextQuestion = (): boolean => {
    if (questions.length > 0) {
      const next = questions[0];
      setCurrentQuestion(next);
      setQuestions(questions.filter(question => question != next));
      setIsQuestionOpen(true);
      return true;
    }
    return false;
  };

  mapState.socket?.on('quiz', (quizParams: scQuizParams) => {
    setQuestions(quizParams.questions);
    nextQuestion();
  });

  return (
    <div className="board-container">
      <PlayerStats />
      <div className="grey-border">
        <div className="white-border">
          <div className="grey-border">
            <div className="violet-border">
              <Board contextInstance={MapContext} />
            </div>
          </div>
        </div>
        x
      </div>
      <br />
      &nbsp;
      <br />
      <Modal isOpen={isQuestionOpen} onRequestClose={toggleQuestionModal} className="mymodal">
        <Question quiz={currentQuestion} closeModal={closeModal} />
      </Modal>
      <Modal isOpen={isWaitingOpen} onRequestClose={toggleWaitingModal} className="mymodal">
        <WaitingForPlayer roomID={mapState.roomID} />
      </Modal>
      <Modal isOpen={isGameOver} onRequestClose={toggleGameOverModal} className="mymodal">
        <GameOver />
      </Modal>
    </div>
  );
}

export default BoardScreen;
