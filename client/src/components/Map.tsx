import React from 'react';
import './Map.css';
import { MapProps } from '../types/Map';

interface RowProps{
  y: number,
  width: number
}

function Dot(props){
  return (
    <div className='map-dot' data-y={props.y} data-x={props.x}/>
  )
}

function horizontalClick(event){
  // send click event to the server
  const x = parseInt(event.target.getAttribute('data-x'))
  const y = parseInt(event.target.getAttribute('data-y'))
  console.log("Horizontal click", y, x)
}

function HorizontalBar(props){
  const thisPosition = `${props.y},${props.x}`
  if(props.mapState['horizontal_bars'][thisPosition] !== undefined){ 
    // this bar is selected
    const playerClass = props.mapState['horizontal_bars'][thisPosition] === 0 ?
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

function verticalClick(event){
  // send click event to the server
  const x = parseInt(event.target.getAttribute('data-x'))
  const y = parseInt(event.target.getAttribute('data-y'))
  console.log("Vertical click", y, x)
}

function VerticalBar(props){
  const thisPosition = `${props.y},${props.x}`
  if(props.mapState['vertical_bars'][thisPosition] !== undefined){ 
    // this bar is selected
    const playerClass = props.mapState['vertical_bars'][thisPosition] === 0 ?
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

function Box(props){
  const thisPosition = `${props.y},${props.x}`
  if(props.mapState['boxes'][thisPosition] !== undefined){
    const mapState = props.mapState['boxes'][thisPosition]
    const boxClass = mapState === 0 ?
      "map-box-player0"
      : (mapState === 1 ? 
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
    cols.push(<Dot y={props.y} x={x} mapState={props.mapState} key={`dot:${props.y},${x}`}/>)
    if(x !== props.width-1){
      cols.push(<HorizontalBar y={props.y} x={x} mapState={props.mapState} key={`horizontal_bar:${props.y},${x}`}/>)
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
    cols.push(<VerticalBar y={props.y} x={x} mapState={props.mapState} key={`vertical_bar:${props.y},${x}`}/>)
    if(x !== props.width-1){
      cols.push(<Box y={props.y} x={x} mapState={props.mapState} key={`square:${props.y},${x}`}/>)
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
