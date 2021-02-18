import React, { Component } from 'react'
import Chessboard from 'chessboardjsx'
import './Board.scss'
import Chess from 'chess.js'

// let board = null
const chess = new Chess()
// let status = $('#status')
// let pgn = $('#pgn')

export default class Board extends Chessboard {
  componentDidMount () {
    this.game = new Chess()
    console.log(this.game)
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    const move = chess.move({ from: sourceSquare, to: targetSquare })
    console.log(move)
    if (move) { console.log('Lets go') }
  }

  render () {
    return (
      <div className="board">
        <Chessboard
          position = "start"
          onDrop={(move) => ({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: 'q' }
          )}
        />
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

  render () {
    return (
      <div>
      </div>
    )
  }
}
