import rooms from '../db/rooms';
import { Board, QuizAnswerHandler, scRoundParams } from '../types';

export const handleQuizResponse: QuizAnswerHandler = (socket, quizResponseParams) => {
  const roomId = quizResponseParams.roomID;
  const room = rooms[roomId];

  console.log('--=');

  console.log(room.board.firstPlayerScore);
  console.log(room.board.secondPlayerScore);
  console.log(room.currentPlayer?.id);
  console.log(quizResponseParams.points);

  if (room.currentPlayer?.id == 0) {
    room.board.firstPlayerScore += quizResponseParams.points;
  } else {
    room.board.secondPlayerScore += quizResponseParams.points;
  }

  // Make Move to board

  const points = quizResponseParams.points;

  const enclosedBoxesArr = room.enclosedByMoveBoxes;
  const enclosedBoxes: Board['boxes'] = {};

  for (let i = 0; i < points; i++) {
    const box = enclosedBoxesArr[i];
    enclosedBoxes[box] = room.currentPlayer;
  }

  room.board.addEnclosedBoxes(enclosedBoxes);

  // Emit move to players

  rooms[roomId].players[0]?.socket?.emit('round', {
    board: room.board.toFrontendBoard(),
    isMyMove: !(rooms[roomId].currentPlayer == rooms[roomId].players[0]),
  } as scRoundParams);

  rooms[roomId].players[1]?.socket?.emit('round', {
    board: room.board.toFrontendBoard(),
    isMyMove: !(rooms[roomId].currentPlayer == rooms[roomId].players[1]),
  } as scRoundParams);

  // Change current player
  if (rooms[roomId].currentPlayer == rooms[roomId].players[0]) {
    rooms[roomId].currentPlayer = rooms[roomId].players[1];
  } else {
    rooms[roomId].currentPlayer = rooms[roomId].players[0];
  }
  //Emit game ended if there is no possible move, or maxPoints were obtained by someone
  const maxPoints = room.roomSettings.maxPoints;
  if (room.board.firstPlayerScore >= maxPoints) {
    //emit to playerOne - win, playerTwo - lose
    room.players.forEach(player => player?.socket?.emit('gameOver', { winner: 0 }));
  } else if (room.board.secondPlayerScore >= maxPoints) {
    room.players.forEach(player => player?.socket?.emit('gameOver', { winner: 1 }));
    //emit to playerTwo - win, playerOne - win
  } else if (Object.keys(room.board.boxes).length === room.board.width * room.board.height) {
    const winner =
      room.board.firstPlayerScore > room.board.secondPlayerScore
        ? 0
        : room.board.firstPlayerScore < room.board.secondPlayerScore
        ? 1
        : -1;
    room.players.forEach(player => player?.socket?.emit('gameOver', { winner }));
  }
  console.group();
  console.log(quizResponseParams);
  console.log(room.board.boxes);
  console.groupEnd();
};
