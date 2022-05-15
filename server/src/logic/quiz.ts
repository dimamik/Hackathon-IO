import { Quiz, Room } from '../types';
import { getRandomQuiz } from '../utils/quiz';

export const startQuiz = (room: Room): any => {
  // TODO
  const currentPlayerSocket = room.currentPlayer?.socket;
  let numberOfPoints = room.enclosedByMoveBoxes.length;
  let quizes: Quiz[] = [];
  while (numberOfPoints > 0) {
    const quiz = getRandomQuiz(numberOfPoints);
    numberOfPoints -= quiz.points;
    // Append to quiz array
    quizes.push(quiz);
  }

  // Send questions to player

  currentPlayerSocket?.emit('quiz', {
    questions: quizes,
  });

  console.log(quizes);
};
