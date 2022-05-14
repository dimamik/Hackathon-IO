export interface MapProps {
  height: number,
  width: number
}

export interface Player {
  id: number,
  socket: string
}

export interface MapState {
  horizontalBars: Map<string, Player>,
  verticalBars: Map<string, Player>,
  boxes: Map<string, Player>,
  playingNow: Player
}

// const mapState = {
//   'horizontal_bars': {
//     '4,3': 0,
//     '4,6': 1,
//     '5,7': 1,
//     '7,1': 0
//   },
//   'vertical_bars': {
//     '2,4': 1,
//     '3,5': 0,
//     '2,7': 0
//   },
//   'boxes': {
//     '5,3': 0,
//     '2,5': 1
//   }
// }