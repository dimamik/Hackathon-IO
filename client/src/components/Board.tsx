import React, { useContext, useEffect, useState } from 'react';
import './Map.css';
import { MapProps, MapState } from '../types/BoardTypes';
import { MapContext } from '../context/Context';

interface RowProps{
  y: number,
  width: number,
  mapState: MapState
}

interface ObjectProps{
  y: number,
  x: number,
  mapState: MapState
}

function Dot(props: ObjectProps){
  return (
    <div className='map-dot' data-y={props.y} data-x={props.x}/>
  )
}

function horizontalClick(event: React.MouseEvent<HTMLDivElement>){
  // send click event to the server
  const target = event.target as HTMLDivElement
  const x = parseInt(target.getAttribute('data-x') as string)
  const y = parseInt(target.getAttribute('data-y') as string)
  console.log("Horizontal click", y, x)
}

function HorizontalBar(props: ObjectProps){
  const thisPosition = `${props.y},${props.x}`
  const mapState = props.mapState
  if(mapState.horizontalBars.get(thisPosition)  !== undefined){ 
    // this bar is selected
    const playerClass = mapState.horizontalBars.get(thisPosition)?.id === 0 ?
      "bar-player0"
      : "bar-player1"

    return(
      <div className={`map-bar map-bar-selected map-horizontal-bar ${playerClass}`} data-y={props.y} data-x={props.x}/>
    )
  }
  else{
    // this bar was not clicked before
    return (
      <div onClick={horizontalClick} className={`map-bar map-horizontal-bar`} data-y={props.y} data-x={props.x}/>
    )
  }
}

function verticalClick(event: React.MouseEvent<HTMLDivElement>){
  // send click event to the server
  const target = event.target as HTMLDivElement
  const x = parseInt(target.getAttribute('data-x') as string)
  const y = parseInt(target.getAttribute('data-y') as string)
  console.log("Vertical click", y, x)
}

function VerticalBar(props: ObjectProps){
  const thisPosition = `${props.y},${props.x}`
  const mapState = props.mapState
  if(mapState.verticalBars.get(thisPosition) !== undefined){ 
    // this bar is selected
    const playerClass = mapState.verticalBars.get(thisPosition)?.id === 0 ?
    "bar-player0"
    : "bar-player1"

    return(
      <div className={`map-bar map-bar-selected map-vertical-bar ${playerClass}`} data-y={props.y} data-x={props.x}/>
    )
  }
  else{
    // this bar was not clicked before
    return (
      <div onClick={verticalClick} className={`map-bar map-vertical-bar`} data-y={props.y} data-x={props.x}/>
    )
  }
}

function Box(props: ObjectProps){
  const thisPosition = `${props.y},${props.x}`
  const mapState = props.mapState
  if(mapState.boxes.get(thisPosition) !== undefined){
    const boxPlayer = mapState.boxes.get(thisPosition)?.id
    const boxClass = boxPlayer === 0 ?
      "map-box-player0"
      : (boxPlayer === 1 ? 
          "map-box-player1"
          : "map-box-neutral"
        );
    return(
      <div className={`map-box ${boxClass}`}/>
    )
  }
  else{
    return (
      <div className='map-box'/>
    )
  }
}

function DotRow(props: RowProps) {
  const cols = []
  for(let x = 0; x < props.width; x++){
    cols.push(<Dot mapState={props.mapState} y={props.y} x={x} key={`dot:${props.y},${x}`}/>)
    if(x !== props.width-1){
      cols.push(<HorizontalBar mapState={props.mapState} y={props.y} x={x} key={`horizontal_bar:${props.y},${x}`}/>)
    }
  }

  return (
    <div className='map-row map-dot-row'>
      {cols}
    </div>
  )
}

function SquareRow(props: RowProps) {
  var cols = []
  for(let x = 0; x < props.width; x++){
    cols.push(<VerticalBar mapState={props.mapState} y={props.y} x={x} key={`vertical_bar:${props.y},${x}`}/>)
    if(x !== props.width-1){
      cols.push(<Box mapState={props.mapState} y={props.y} x={x} key={`square:${props.y},${x}`}/>)
    }
  }
  
  return(
    <div className='map-row map-square-row'>
      {cols}
    </div>
  )
}

function Board(props: MapProps) {
  const mapState = useContext(MapContext)

  var rows = []

  for(let y = 0; y < props.height; y++){
    rows.push(<DotRow mapState={mapState} width={props.width} y={y} key={`dot_row:${y}`}/>)
    if(y !== props.height-1){
      rows.push(<SquareRow mapState={mapState} width={props.width} y={y} key={`square_row:${y}`}/>)
    }
  }

  return(
    <div className='map-container'>
      {rows}
    </div>
  )
}

export default Board;
