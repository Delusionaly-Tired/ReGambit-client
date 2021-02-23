import React from 'react'
// import Board from '../Board/Board'
// import './Landing.scss'
import './Board.scss'
import Chessboard from 'chessboardjsx'
import Chess from 'chess.js'

class Board extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pgn: 'start',
      tactic: '',
      history: []
    }
  }

  componentDidMount () {
    this.game = new Chess()
    console.log(this.game.ascii())
  }

  nextMove = () => {
    this.game.move('e5')
    console.log(this.game.ascii())
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    console.log('OHHHHHHH DREAMMMMMMM')
    this.game.move({ from: sourceSquare, to: targetSquare })
    console.log(this.game.get(targetSquare))
    this.setState({ pgn: this.game.fen() })
    this.gambitDisplay()
    if (this.props && this.props.renderPGN) {
      this.props.renderPGN(this.game.history().join(' '))
    }
    // if (this.game.move === null) return
    //
    // this.setState(({ move, history }) => ({
    //   history: this.game.history(),
    //   fen: this.game.fen() }))

    this.game.ascii()
    console.log(this.game.history())
  }

  clearBoard = () => {
    this.game = new Chess()
    this.game.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR9')
    this.setState({ pgn: 'start' })
    console.log(this.game.ascii())
  }

  checkOnDrop = () => {
    console.log(this.game.history())
    this.game.history().join(' ')
    console.log(this.game.history().join(' '))
    // this.game.load_pgn(this.game.history().join(' '))
    // this.game.fen()
    // this.setState({ pgn: this.game.fen() })
  }

  checkLegal = () => {
    console.log(this.game.moves())
  }

  gambitDisplay = () => {
    const gambitCheck = this.game.fen()
    if (gambitCheck === 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2') {
      this.setState({ tactic: 'The Queens Gambit' })
    } else {
      this.setState({ tactic: '' })
    }
  }

  loadMikePGN = () => {
    this.game.load_pgn('d4 d5 c4')
    this.game.fen()
    this.setState({ pgn: this.game.fen() })
    console.log(this.game.ascii())
  }

  render () {
    const { pgn } = this.state
    console.log(pgn)
    return (
      <div>
        <h1 id="gambitDisplay">{this.state.tactic}</h1>
        <div className='board'>
          <Chessboard
            width={600}
            position={this.state.pgn}
            onDrop={this.onDrop}
          />
        </div>
        <div className='boardControl'>
          <button onClick={this.clearBoard}>Clear Board</button>
          <button onClick={this.checkOnDrop}>Render PGN</button>
          <button onClick={this.checkLegal}>Check Moves</button>
          <button onClick={this.loadMikePGN}>Set Mike PGN</button>
        </div>
      </div>
    )
  }
}

export default Board
