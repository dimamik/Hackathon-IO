export class Room {
  readonly id: string;
  readonly board: Board = new Board();
  readonly players: [Player, Player] = [null, null];
  currentPlayer: Player;
  isQuizActive: boolean = false;

  constructor(roomId: string, firstPlayer?: Player) {
    this.id = roomId;
    if (firstPlayer) {
      this.players[0] = firstPlayer;
      this.currentPlayer = firstPlayer;
    }
  }

  joinRoom(secondPlayer: Player) {
    this.players[1] = secondPlayer;
  }
}