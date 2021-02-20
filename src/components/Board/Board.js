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

  onDrop = ({ sourceSquare, targetSquare }) => {
    const move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    })

    if (move === null) return

    this.setState(({ move, history }) => ({
      history: this.game.history,
      fen: this.game.fen() }))
  }

  clearBoard = () => {
    this.game = new Chess()
    this.game.move('e4')
    this.game.pgn()
    // this.setState({ position: 'start' })
    console.log(this.state)
    console.log(this.props.position)
  }

  getPosition = () => {
    // const { position, newPosition } = this.props
    // chess.load_pgn('1. e4')
    this.setState({ position: '1. e4: wK' })
    console.log(this.state)
    console.log(this.props)
    // this.state.position = this.props.position
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
