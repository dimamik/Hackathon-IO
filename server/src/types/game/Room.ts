import { csCreateParams } from '../dto';
import { Board } from './Board';
import { Player } from './Player';

export class Room {
  readonly id: string;
  readonly board: Board = new Board();
  readonly players: [Player, Player] = [null, null];
  currentPlayer: Player;
  roomSettings: csCreateParams;
  isQuizActive: boolean = false;

  constructor(roomId: string, roomSettings: csCreateParams, firstPlayer?: Player) {
    this.id = roomId;
    if (firstPlayer) {
      this.players[0] = firstPlayer;
      this.currentPlayer = firstPlayer;
    }
    this.roomSettings = roomSettings;
  }

  joinRoom(secondPlayer: Player) {
    this.players[1] = secondPlayer;
  }
}