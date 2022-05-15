import React, { useContext } from 'react';
import { BoardFrontend, Coordinates, MapState } from '../types';
import { MapContext } from '../../context/Context';
import './Map.css';
import { Socket } from 'socket.io-client';

type RowProps = {
  y: number;
  width: number;
  board: BoardFrontend;
};

type HorizontalBarProps = BoxProps & { rows: BoardFrontend['horizontal'] };
type VerticalBarProps = BoxProps & { columns: BoardFrontend['vertical'] };
type BoxProps = ObjectProps & { boxes: BoardFrontend['boxes'] };

type ObjectProps = {
  x: number;
  y: number;
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

function HorizontalBar({ x, y, boxes, rows }: HorizontalBarProps) {
  const { mapState } = useContext(MapContext);
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

function VerticalBar({ x, y, boxes, columns }: VerticalBarProps) {
  const { mapState } = useContext(MapContext);
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

function Box({ x, y, boxes }: BoxProps) {
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

function DotRow({ width, y, board }: RowProps) {
  const cols = [];
  for (let x = 0; x < width; x++) {
    cols.push(<Dot y={y} x={x} key={`dot:${y},${x}`} />);
    if (x !== width - 1) {
      cols.push(
        <HorizontalBar
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

function SquareRow({ width, y, board }: RowProps) {
  const cols = [];
  for (let x = 0; x < width; x++) {
    cols.push(
      <VerticalBar
        boxes={board.boxes}
        columns={board.vertical}
        y={y}
        x={x}
        key={`vertical_bar:${y},${x}`}
      />,
    );
    if (x !== width - 1) {
      cols.push(<Box boxes={board.boxes} y={y} x={x} key={`square:${y},${x}`} />);
    }
  }

  return <div className="map-row map-square-row">{cols}</div>;
}

function Board() {
  const {
    mapState: { board },
  } = useContext(MapContext);

  const rows = [];

  const width = board.width;

  for (let y = 0; y < board.height; y++) {
    rows.push(<DotRow board={board} width={width} y={y} key={`dot_row:${y}`} />);
    if (y !== board.height - 1) {
      rows.push(<SquareRow board={board} width={width} y={y} key={`square_row:${y}`} />);
    }
  }

  return <div className="map-container">{rows}</div>;
}

export default Board;
