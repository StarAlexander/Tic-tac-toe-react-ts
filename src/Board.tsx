import { useState } from "react"
import { findBestMove,calculateWinner,checkDraw } from "./utils"



type SquareProps = {
    value:number
    onClick:()=>void,
    fraction:number
  }
  
  const Square:React.FC<SquareProps> = ({value,onClick,fraction}) => {
    return <button onClick={onClick} className={`${fraction==20?'w-20 h-20':fraction==15?'w-15 h-15':'w-12 h-12'} border border-white`}>{value}</button>
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
      <div className="mx-auto p-4 shadow-md dark:shadow-white shadow-slate-300">
        <p className="mb-2">Play with a bot</p>
        <div className="w-60 mb-4">
          <button onClick={()=>setBoard(9)} className="w-20 p-1 border border-black dark:border-white bg-black text-white hover:bg-white hover:text-black transition-all">3x3</button>
          <button onClick={()=>setBoard(16)} className="w-20 p-1 border border-black dark:border-white bg-black text-white hover:bg-white hover:text-black transition-all">4x4</button>
          <button onClick={()=>setBoard(25)} className="w-20 p-1 border border-black dark:border-white bg-black text-white hover:bg-white hover:text-black transition-all">5x5</button>
        </div>
        <div className="w-60 mb-2">
          <label>You are playing as: </label>
          <select onChange={(e)=>{setPlayerChar(e.target.value)
          setSquares(Array(9).fill(''))
          setXIsNext(true)}} className="text-black ml-1">
            <option value={'X'}>X</option>
            <option value={'O'}>O</option>
          </select>
        </div>
        <div>{status}</div>
        {
          squares.length==9? <div>
            <div className="flex flex-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex flex-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex flex-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
          </div> : squares.length == 16 ? <div>
          <div className="flex flex-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
        </div>
        <div className="flex flex-row">
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
        </div>
        <div className="flex flex-row">
          {renderSquare(8)}
          {renderSquare(9)}
          {renderSquare(10)}
          {renderSquare(11)}
        </div>
        <div className="flex flex-row">
          {renderSquare(12)}
          {renderSquare(13)}
          {renderSquare(14)}
          {renderSquare(15)}
        </div>
          </div> : <div>
          <div className="flex flex-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
        </div>
        <div className="flex flex-row">
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
          {renderSquare(9)}
        </div>
        <div className="flex flex-row">
          {renderSquare(10)}
          {renderSquare(11)}
          {renderSquare(12)}
          {renderSquare(13)}
          {renderSquare(14)}
        </div>
        <div className="flex flex-row">
          {renderSquare(15)}
          {renderSquare(16)}
          {renderSquare(17)}
          {renderSquare(18)}
          {renderSquare(19)}
        </div>
        <div className="flex flex-row">
          {renderSquare(20)}
          {renderSquare(21)}
          {renderSquare(22)}
          {renderSquare(23)}
          {renderSquare(24)}
        </div>
          </div>
        }
          
        
        <button onClick={()=>{setSquares(prev=>Array(prev.length).fill(''))
      setXIsNext(true)}} className="bg-white p-1 w-60 mt-5 dark:bg-black border border-solid border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Reset</button>
      </div>
    )
  }

  export default Board