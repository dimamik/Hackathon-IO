import React from 'react';
import './Map.css';
import { MapProps, MapState } from '../types/Map';

interface RowProps{
  y: number,
  width: number
}

interface ObjectProps{
  y: number,
  x: number
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
  const mapState = context.mapState as MapState
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
  const mapState = context.mapState as MapState
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
  const mapState = context.mapState as MapState
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
    cols.push(<Dot y={props.y} x={x} key={`dot:${props.y},${x}`}/>)
    if(x !== props.width-1){
      cols.push(<HorizontalBar y={props.y} x={x} key={`horizontal_bar:${props.y},${x}`}/>)
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
    cols.push(<VerticalBar y={props.y} x={x} key={`vertical_bar:${props.y},${x}`}/>)
    if(x !== props.width-1){
      cols.push(<Box y={props.y} x={x} key={`square:${props.y},${x}`}/>)
    }
  }
  
  return(
    <div className='map-row map-square-row'>
      {cols}
    </div>
  )
}

function Map(props: MapProps) {
  var rows = []

  for(let y = 0; y < props.height; y++){
    rows.push(<DotRow width={props.width} y={y} key={`dot_row:${y}`}/>)
    if(y !== props.height-1){
      rows.push(<SquareRow width={props.width} y={y} key={`square_row:${y}`}/>)
    }
  }

  return(
    <div className='map-container'>
      {rows}
    </div>
  )
}

export default Map;
