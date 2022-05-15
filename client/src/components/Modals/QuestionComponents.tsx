import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Quiz } from '../../types';
import dolphin from '../../assets/images/dolphin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuestionComponents.css';

interface Props {
  quiz: Quiz | null;
  closeModal: (correct: boolean, callback: () => void) => void;
}

function QuestionComponents(props: Props) {
  const [showCorrect, setShowCorrect] = useState(false);

  function onClick(index: number) {
    setShowCorrect(true);
    props.closeModal(index === props.quiz?.correctAnswer, () => setShowCorrect(false));
  }

  return props.quiz ? (
    <Container fluid>
      <div className="questionNavbar">
        <div className="bar">
          <div className="barTitle">
            <div>[１]　Q u e s t i o n</div>
          </div>
          <div className="closeIcon">X</div>
        </div>

        <div className="questionPanel">
          <div className="title">
            <p>Question 【{props.quiz.points}】</p>
          </div>
          <div className="question">
            <p>{props.quiz.question}</p>
          </div>
          <div className="dolphinContainer">
            <img src={dolphin} className="dolphin" />
          </div>
          <div className="answers">
            {props.quiz.answers.map((answer, index) => {
              return (
                <button
                  key={answer + index}
                  type="button"
                  className={`button ${
                    index === props.quiz?.correctAnswer && showCorrect
                      ? 'correct'
                      : 'incorrect'
                  }`}
                  onClick={() => onClick(index)}>
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  ) : null;
}

export default QuestionComponents;
