import React, { useContext } from 'react';
import { BoardFrontend, Coordinates, MapState } from '../../types';
import './Map.css';
import { MapContextType } from '../../types';

type RowProps = {
  contextInstance: React.Context<MapContextType>;
  y: number;
  width: number;
  board: BoardFrontend;
};

type HorizontalBarProps = BoxProps & { rows: BoardFrontend['horizontal'] };
type VerticalBarProps = BoxProps & { columns: BoardFrontend['vertical'] };
type BoxProps = ObjectProps & { boxes: BoardFrontend['boxes'] };

type ObjectProps = {
  contextInstance: React.Context<MapContextType>;
  x: number;
  y: number;
};

export type BoardProps = {
  contextInstance: React.Context<MapContextType>;
};

function Dot(props: ObjectProps) {
  return <div className="map-dot" data-y={props.y} data-x={props.x} />;
}

function horizontalClick(event: React.MouseEvent<HTMLDivElement>, mapState: MapState) {
  if (!mapState.isMyMove) return;
  // send click event to the server
  const target = event.target as HTMLDivElement;
  const x = parseInt(target.getAttribute('data-x') as string);
  const y = parseInt(target.getAttribute('data-y') as string);

  mapState.socket?.emit('move', {
    move: {
      type: 'horizontal',
      coordinates: `${y},${x}`,
    },
    roomID: mapState.roomID!,
  });

  console.log('Horizontal click', y, x);
}

function HorizontalBar({ contextInstance, x, y, boxes, rows }: HorizontalBarProps) {
  const { mapState } = useContext(contextInstance);
  const thisPosition: Coordinates = `${y},${x}`;
  if (rows[thisPosition] !== undefined) {
    // this bar is selected
    const playerClass = rows[thisPosition] === 0 ? 'bar-player0' : 'bar-player1';

    return (
      <div
        className={`map-bar map-bar-selected map-horizontal-bar ${playerClass}`}
        data-y={y}
        data-x={x}
      />
    );
  } else {
    // this bar was not clicked before, but still we need to disable
    // clicks on borders of boxes
    const upperPosition: Coordinates = `${y - 1},${x}`;
    if (boxes[upperPosition] !== undefined || boxes[thisPosition] !== undefined) {
      // No onclick because it borders a box
      return (
        <div className={`map-bar map-horizontal-bar map-bar-selected`} data-y={y} data-x={x} />
      );
    }
    return (
      <div
        onClick={e => horizontalClick(e, mapState)}
        className={`map-bar map-horizontal-bar`}
        data-y={y}
        data-x={x}
      />
    );
  }
}

function verticalClick(event: React.MouseEvent<HTMLDivElement>, mapState: MapState) {
  if (!mapState.isMyMove) return;
  // send click event to the server
  const target = event.target as HTMLDivElement;
  const x = parseInt(target.getAttribute('data-x') as string);
  const y = parseInt(target.getAttribute('data-y') as string);
  console.log('Vertical click', y, x);

  mapState.socket?.emit('move', {
    move: {
      type: 'vertical',
      coordinates: `${y},${x}`,
    },
    roomID: mapState.roomID!,
  });
}

function VerticalBar({ contextInstance, x, y, boxes, columns }: VerticalBarProps) {
  const { mapState } = useContext(contextInstance);
  const thisPosition: Coordinates = `${y},${x}`;
  if (columns[thisPosition] !== undefined) {
    // this bar is selected
    const playerClass = columns[thisPosition] === 0 ? 'bar-player0' : 'bar-player1';

    return (
      <div
        className={`map-bar map-bar-selected map-vertical-bar ${playerClass}`}
        data-y={y}
        data-x={x}
      />
    );
  } else {
    // this bar was not clicked before, but still we need to disable
    // clicks on borders of boxes
    const leftPosition: Coordinates = `${y},${x - 1}`;
    if (boxes[leftPosition] !== undefined || boxes[thisPosition] !== undefined) {
      // No onclick because it borders a box
      return (
        <div className={`map-bar map-vertical-bar map-bar-selected`} data-y={y} data-x={x} />
      );
    }
    return (
      <div
        onClick={e => verticalClick(e, mapState)}
        className={`map-bar map-vertical-bar`}
        data-y={y}
        data-x={x}
      />
    );
  }
}

function Box({ contextInstance, x, y, boxes }: BoxProps) {
  const thisPosition: Coordinates = `${y},${x}`;
  if (boxes[thisPosition] !== undefined) {
    const boxPlayer = boxes[thisPosition];
    const boxClass =
      boxPlayer === 0
        ? 'map-box-player0'
        : boxPlayer === 1
        ? 'map-box-player1'
        : 'map-box-neutral';
    return <div className={`map-box ${boxClass}`} />;
  } else {
    return <div className="map-box" />;
  }
}

function DotRow({ contextInstance, width, y, board }: RowProps) {
  const cols = [];
  for (let x = 0; x < width; x++) {
    cols.push(<Dot contextInstance={contextInstance} y={y} x={x} key={`dot:${y},${x}`} />);
    if (x !== width - 1) {
      cols.push(
        <HorizontalBar
          contextInstance={contextInstance}
          boxes={board.boxes}
          rows={board.horizontal}
          y={y}
          x={x}
          key={`horizontal_bar:${y},${x}`}
        />,
      );
    }
  }

  return <div className="map-row map-dot-row">{cols}</div>;
}

function SquareRow({ contextInstance, width, y, board }: RowProps) {
  const cols = [];
  for (let x = 0; x < width; x++) {
    cols.push(
      <VerticalBar
        contextInstance={contextInstance}
        boxes={board.boxes}
        columns={board.vertical}
        y={y}
        x={x}
        key={`vertical_bar:${y},${x}`}
      />,
    );
    if (x !== width - 1) {
      cols.push(
        <Box
          contextInstance={contextInstance}
          boxes={board.boxes}
          y={y}
          x={x}
          key={`square:${y},${x}`}
        />,
      );
    }
  }

  return <div className="map-row map-square-row">{cols}</div>;
}

function Board(props: BoardProps) {
  const {
    mapState: { board },
    gameConfig: { playerID },
  } = useContext(props.contextInstance);

  const rows = [];

  const width = board.width;

  for (let y = 0; y < board.height; y++) {
    rows.push(
      <DotRow
        contextInstance={props.contextInstance}
        board={board}
        width={width}
        y={y}
        key={`dot_row:${y}`}
      />,
    );
    if (y !== board.height - 1) {
      rows.push(
        <SquareRow
          contextInstance={props.contextInstance}
          board={board}
          width={width}
          y={y}
          key={`square_row:${y}`}
        />,
      );
    }
  }

  const playerDesc =
    playerID === 1 ? (
      <span className="player-cyan-color">ｃｙａｎ</span>
    ) : (
      <span className="player-magenta-color">ｍａｇｅｎｔａ</span>
    );

  return (
    <div className="map-container">
      <div className="plays-as">Ｙｏｕ　ｐｌａｙ　ａｓ: {playerDesc}</div>
      {rows}
    </div>
  );
}

export default Board;
