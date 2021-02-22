import React, { Component } from 'react'
import Chessboard from 'chessboardjsx'
import './Board.scss'
import Chess from 'chess.js'

export default class Board extends Chessboard {
  constructor (props) {
    super(props)

    this.state = {
      fen: 'start',
      move: '',
      PGN: '',
      history: [],
      game: null
    }
  }

  componentDidMount () {
    this.setState({ game: new Chess() })
    if (this.state.game) {
      console.log(this)
    }
    // console.log(this.state)
    // console.log(this.game.load_pgn)
  }

  render () {
    return (
      <div className="board">
        <Chessboard
          position = "start"
        />
        <button onClick={this.clearBoard} className='submitBtn'>Clear Board</button>
        <button onClick={this.getPosition} className='submitBtn'>Submit Opening</button>
      </div>
    )
  }
}

export class MoveCheck extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fen: 'start',
      dropSquareStyle: {},
      square: ''
    }
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}
