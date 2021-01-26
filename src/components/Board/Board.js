import React from 'react'
import Chessboard from 'chessboardjsx'

class Board extends Chessboard {
  const boardStyles = {
    marginLeft: '50px',
    marginTop: '50px'
  }
  render() {
    <div className="board">
      <Chessboard position='start'/>
    </div>
  }
}
console.log(Chessboard)

export default Board
