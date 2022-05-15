import { useContext, useEffect, useState } from 'react';
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
  const [quizActive, setQuizActive] = useState(false);
  const [isWaitingOpen, setIsWaitingOpen] = useState(gameConfig.shouldShowModal);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    firstQuestion();
  }, [quizActive]);

  function toggleQuestionModal() {
    setIsQuestionOpen(!isQuestionOpen);
  }

  function toggleWaitingModal() {
    setIsWaitingOpen(!isWaitingOpen);
  }
  function toggleGameOverModal() {
    setIsGameOver(!isGameOver);
  }

  mapState.socket?.on('round', (ev: scRoundParams) => {
    setIsWaitingOpen(false);
    setParams(ev, false);
  });

  const closeModal = (correct: boolean, callback: () => void) => {
    setTimeout(() => {
      setIsQuestionOpen(false);
      let newPoints = currentTurnPoints;
      if (currentQuestion) {
        if (correct) {
          newPoints += currentQuestion.points;
          setCurrentTurnPoints(newPoints);
        }
        if (!nextQuestion() && mapState.roomID) {
          mapState.socket?.emit('quizResponse', {
            points: newPoints,
            roomID: mapState.roomID,
          });
          setQuizActive(false);
          setCurrentQuestion(null);
          setCurrentTurnPoints(0);
        }
      }
      callback();
    }, 2000);
  };

  const nextQuestion = (): boolean => {
    const newQuestions = questions.filter(question => question != currentQuestion);
    setQuestions(newQuestions);
    if (newQuestions.length > 0) {
      const next = newQuestions[0];
      setCurrentQuestion(next);
      setIsQuestionOpen(true);
      return true;
    }
    return false;
  };

  const firstQuestion = () => {
    if (quizActive) {
      const next = questions[0];
      setCurrentQuestion(next);
      setIsQuestionOpen(true);
    }
  };

  mapState.socket?.on('quiz', (quizParams: scQuizParams) => {
    setQuestions(quizParams.questions);
    setQuizActive(true);
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
