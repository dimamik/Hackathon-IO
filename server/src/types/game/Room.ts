import { csCreateParams } from '../dto';
import { Board, Coordinates } from './Board';
import { Player } from './Player';

export class Room {
  readonly id: string;
  readonly board: Board;
  readonly players: [Player, Player] = [null, null];
  currentPlayer: Player;
  roomSettings: csCreateParams;
  isQuizActive: boolean = false;
  enclosedByMoveBoxes: Array<Coordinates>;

  constructor(roomId: string, roomSettings: csCreateParams, firstPlayer?: Player) {
    this.id = roomId;
    if (firstPlayer) {
      this.players[0] = firstPlayer;
      this.currentPlayer = firstPlayer;
    }
    this.board = new Board(roomSettings.height, roomSettings.width);
    this.roomSettings = roomSettings;
  }

  joinRoom(secondPlayer: Player) {
    this.players[1] = secondPlayer;
  }
}
