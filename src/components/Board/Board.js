import React from 'react'
import Chessboard from 'chessboardjsx'
import './Board.scss'

class Board extends Chessboard {
  render () {
    return (
      <div className="board">
        <Chessboard position='start'/>
      </div>
    )
  }
}
console.log(Chessboard)

export default Board
