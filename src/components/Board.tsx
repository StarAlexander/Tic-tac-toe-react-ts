'use client'

import { useState } from "react"
import { findBestMove,calculateWinner,checkDraw } from "./utils"
import styles from "../app/page.module.css"


type SquareProps = {
    value:number
    onClick:()=>void,
    fraction:number
  }
  
  const Square:React.FC<SquareProps> = ({value,onClick,fraction}) => {
    return <button onClick={onClick} className={`${fraction==20? styles['big-cell'] :fraction==15? styles['mid-cell']:styles['small-cell']} ${styles['cell']}`}>{value}</button>
  }
  const Board:React.FC = () => {
    const [squares,setSquares] = useState(Array(9).fill(''))
    const [xIsNext,setXIsNext] = useState(true)
    const [playerChar,setPlayerChar] = useState('X')
    const handleClick = (i:number) => {
      const next = xIsNext? 'X':'O'
      const newSquares = squares.slice()
      if (calculateWinner(newSquares) || newSquares[i]) return;
      newSquares[i] = next
      setSquares(newSquares)
      setXIsNext(!xIsNext)
    }
  
    const renderSquare = (i:number) => {
      const fraction = squares.length == 9? 20: squares.length == 16? 15: 12
      return (
        <Square value={squares[i]} fraction={fraction} onClick={()=>handleClick(i)}/>
      )
    }
    const checkEmpty = (board:string[]):boolean => {
      for (const el of board) {
        if (el) return false
      }
      return true
    }
    
    const winner = calculateWinner(squares)
    let status = ''
    if (winner){
      status = 'Winner: ' + winner
    } else if (checkDraw(squares)) {
      status = 'Draw'
      
    }
    if (!winner && !xIsNext && playerChar == 'X') {
      const botIndex = findBestMove(squares,'O')
      handleClick(botIndex)
    }
    if (playerChar != 'X' && xIsNext && !winner) {
      let botIndex
      if (checkEmpty(squares)) {
        botIndex = Math.floor(Math.random()*squares.length)
      } else botIndex = findBestMove(squares,'X')
      handleClick(botIndex)
    }
    
    const setBoard = (n:number) => {
      setSquares(Array(n).fill(''))
      setXIsNext(true)
    }
    return (
      <div className={styles["board-container"]}>
        <p style={{"marginBottom":"0.5rem"}}>Play with a bot</p>
        <div style={{"marginBottom":"1rem","width":"16rem"}}>
          <button onClick={()=>setBoard(9)} className={styles['mode-button']}>3x3</button>
          <button onClick={()=>setBoard(16)} className={styles['mode-button']}>4x4</button>
          <button onClick={()=>setBoard(25)} className={styles['mode-button']}>5x5</button>
        </div>
        <div style={{"marginBottom":"0.5rem","width":"16rem", "color":"white"}}>
          <label>You are playing as: </label>
          <select onChange={(e)=>{setPlayerChar(e.target.value)
          setSquares(Array(9).fill(''))
          setXIsNext(true)}} style={{"marginLeft":"0.25rem","color":"#000000"}}>
            <option value={'X'}>X</option>
            <option value={'O'}>O</option>
          </select>
        </div>
        <div className={styles['status']}>{status}</div>
        {
          squares.length==9? <div>
            <div style={{"display":"flex"}}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div style={{"display":"flex"}}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div style={{"display":"flex"}}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
          </div> : squares.length == 16 ? <div>
          <div style={{"display":"flex"}}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
        </div>
        <div style={{"display":"flex"}}>
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
        </div>
        <div style={{"display":"flex"}}>
          {renderSquare(8)}
          {renderSquare(9)}
          {renderSquare(10)}
          {renderSquare(11)}
        </div>
        <div style={{"display":"flex"}}>
          {renderSquare(12)}
          {renderSquare(13)}
          {renderSquare(14)}
          {renderSquare(15)}
        </div>
          </div> : <div>
          <div style={{"display":"flex"}}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
        </div>
        <div style={{"display":"flex"}}>
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
          {renderSquare(9)}
        </div>
        <div style={{"display":"flex"}}>
          {renderSquare(10)}
          {renderSquare(11)}
          {renderSquare(12)}
          {renderSquare(13)}
          {renderSquare(14)}
        </div>
        <div style={{"display":"flex"}}>
          {renderSquare(15)}
          {renderSquare(16)}
          {renderSquare(17)}
          {renderSquare(18)}
          {renderSquare(19)}
        </div>
        <div style={{"display":"flex"}}>
          {renderSquare(20)}
          {renderSquare(21)}
          {renderSquare(22)}
          {renderSquare(23)}
          {renderSquare(24)}
        </div>
          </div>
        }
          
        
        <button onClick={()=>{setSquares(prev=>Array(prev.length).fill(''))
      setXIsNext(true)}} className={styles["reset-button"]}>Reset</button>
      </div>
    )
  }

  export default Board