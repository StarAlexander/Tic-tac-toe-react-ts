import { chooseCombination } from "./winCombinations";

function minimax(board:string[],  isMaximizing:boolean,pov:string,alpha:number,beta:number,depth:number) {
  if (depth == 1) return 10
  const scoreWinner = evaluate(board,pov);
  if (scoreWinner == 10 || scoreWinner == -10) {
    return scoreWinner
  }
  if (checkDraw(board)) {
    return 0
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      
        if (board[i] == '') {
          board[i] = pov;
          bestScore = Math.max(bestScore,minimax(board,  !isMaximizing,pov,alpha,beta,depth+1))
          alpha = Math.max(alpha,bestScore)

          board[i] = '';
          if (beta <= alpha) break;
        }
      
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      
        if (board[i] == '') {
          board[i] = pov == 'X'?'O':'X';
         bestScore =Math.min(bestScore,minimax(board,!isMaximizing,pov,alpha,beta,depth))
         beta = Math.min(beta,bestScore)
          board[i] = '';
          if (beta <= alpha) break;
        }
      
    }
    return bestScore;
  }
}
  export function findBestMove(board:string[],pov:string):number {
    let best = -Infinity
    let bestMove = -1
    for (let i=0; i<board.length;i++) {
      if (board[i]==''){
        board[i] = pov
        const move = minimax(board,false,pov,-Infinity,+Infinity,0)
        board[i] = ''

        if (move > best) {
          bestMove = i
          best = move
        }
      }
    }
    return bestMove
  }
  export function checkDraw(board:string[]):boolean {
    for (const el of board) {
      if (!el) return false
    }
    return true
  }


export function calculateWinner(squares:string[]) : string {
    const lines  = chooseCombination(squares.length)
    for (const line of lines) {
      let k=1
      for (let i=0; i<line.length-1;i++) {
        if (squares[line[i]] !== squares[line[i+1]]) break;
        k++
      }
      if (k == line.length && squares[line[0]]) return squares[line[0]]
    }
    return ''
  }
function evaluate(board:string[],pov:string):number {
    const winner = calculateWinner(board)
    if (winner == pov) return 10
    else if (winner !== '') return -10
    else return 0
  }
