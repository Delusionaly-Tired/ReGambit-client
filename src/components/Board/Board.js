import React, { Component } from 'react'
import Chessboard from 'chessboardjsx'
import './Board.scss'
// import Chess from 'chess.js'

export default class Board extends Chessboard {
  render () {
    return (
      <div className="board">
        <Chessboard position='start'/>
      </div>
    )
  }
}

export class MoveCheck extends Component {
  state = {
    fen: 'start',
    dropSquareStyle: {},
    square: ''
  }

  // componentDidMount () {
  //   this.game = new Chess()
  // }

  onDrop = ({ sourceSquare, targetSquare }) => {
    const move = this.game.move({ from: sourceSquare, to: targetSquare })
    console.log(move)
    if (move === 'e4') { console.log('Lets go') }
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}
