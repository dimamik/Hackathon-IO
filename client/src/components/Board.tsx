import React, { useContext } from 'react';
import { MapProps, BoardFrontend, Coordinates } from '../types';
import { MapContext } from '../context/Context';
import './Map.css';

type RowProps = {
  y: number;
  width: number;
  board: BoardFrontend;
};

type HorizontalBarProps = ObjectProps & { rows: BoardFrontend['horizontal'] };
type VerticalBarProps = ObjectProps & { columns: BoardFrontend['vertical'] };
type BoxProps = ObjectProps & { boxes: BoardFrontend['boxes'] };

type ObjectProps = {
  x: number;
  y: number;
};

function Dot(props: ObjectProps) {
  return <div className="map-dot" data-y={props.y} data-x={props.x} />;
}

function horizontalClick(event: React.MouseEvent<HTMLDivElement>) {
  // send click event to the server
  const target = event.target as HTMLDivElement;
  const x = parseInt(target.getAttribute('data-x') as string);
  const y = parseInt(target.getAttribute('data-y') as string);
  console.log('Horizontal click', y, x);
}

function HorizontalBar({ x, y, rows }: HorizontalBarProps) {
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
    // this bar was not clicked before
    return (
      <div
        onClick={horizontalClick}
        className={`map-bar map-horizontal-bar`}
        data-y={y}
        data-x={x}
      />
    );
  }
}

function verticalClick(event: React.MouseEvent<HTMLDivElement>) {
  // send click event to the server
  const target = event.target as HTMLDivElement;
  const x = parseInt(target.getAttribute('data-x') as string);
  const y = parseInt(target.getAttribute('data-y') as string);
  console.log('Vertical click', y, x);
}

function VerticalBar({ x, y, columns }: VerticalBarProps) {
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
    // this bar was not clicked before
    return (
      <div
        onClick={verticalClick}
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
        <HorizontalBar rows={board.horizontal} y={y} x={x} key={`horizontal_bar:${y},${x}`} />,
      );
    }
  }

  return <div className="map-row map-dot-row">{cols}</div>;
}

function SquareRow({ width, y, board }: RowProps) {
  const cols = [];
  for (let x = 0; x < width; x++) {
    cols.push(
      <VerticalBar columns={board.vertical} y={y} x={x} key={`vertical_bar:${y},${x}`} />,
    );
    if (x !== width - 1) {
      cols.push(<Box boxes={board.boxes} y={y} x={x} key={`square:${y},${x}`} />);
    }
  }

  return <div className="map-row map-square-row">{cols}</div>;
}

function Board({ width, height }: MapProps) {
  const { mapState } = useContext(MapContext);

  const rows = [];

  for (let y = 0; y < height; y++) {
    rows.push(<DotRow board={mapState.board} width={width} y={y} key={`dot_row:${y}`} />);
    if (y !== height - 1) {
      rows.push(
        <SquareRow board={mapState.board} width={width} y={y} key={`square_row:${y}`} />,
      );
    }
  }

  return <div className="map-container">{rows}</div>;
}

export default Board;
