import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Quiz } from 'src/types';

const db = new JsonDB(new Config('./src/db/quiz', true, true, '/'));

export const getRandomQuiz = (points: number) => {
  const quizs: Quiz[] = db.getData('/quizs');
  let availablePoints = quizs.map(q => q.points);
  availablePoints = [...new Set(availablePoints)];
  availablePoints.sort(function (a, b) {
    return b - a;
  });
  const maxPoints = availablePoints.find(p => points >= p);
  const quizsWithPoints = quizs.filter(q => q.points === maxPoints);
  const allQuizs = quizsWithPoints.length;
  const randomQuizNumber = Math.floor(Math.random() * allQuizs);
  return quizsWithPoints[randomQuizNumber];
};

export const addQuiz = (newQuiz: Quiz) => {
  db.push(
    '/quizs[]',
    {
      ...newQuiz,
    },
    true,
  );
};
