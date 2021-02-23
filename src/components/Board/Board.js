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

  getPosition = (position) => {
    this.game.fen()
  }

  checkOnDrop = () => {
    console.log(this.game.history())
  }

  checkLegal = () => {
    console.log(this.game.moves())
    console.log(this.game.ascii())
  }

  gambitDisplay = () => {
    const gambitCheck = this.game.fen()
    if (gambitCheck === 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2') {
      this.setState({ tactic: 'The Queens Gambit' })
    } else {
      this.setState({ tactic: ':)' })
    }
  }

  loadMikePGN = () => {
    this.game.load_pgn('1.e4 d5 2.exd5 Nf6 3.d4 Nxd5 4.c4 Nb6 5.Nc3 g6 6.Be3 Bg7 7.h3 O-O 8.Qd2 Nc6 9.Nf3 e5 10.d5 Ne7 11.g4 f5 12.O-O-O e4 13.Ng5 h6 14.Ne6 Bxe6 15.dxe6 Qxd2+ 16.Rxd2 Rad8 17.Bc5 Rxd2 18.Kxd2 Rd8+ 19.Kc2 Nc6 20.gxf5 Nd4+ 21.Bxd4 Rxd4 22.Rg1 g5 23.c5 Nc4 24.Bxc4 Rxc4 25.Rd1 Bf6 26.Kb3 Rxc5 27.Nxe4 Rxf5 28.Nxf6+ Kf8 29.Ng4 h5 30.Ne3 Rf3 31.Rd5 g4 32.hxg4 1-0')
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
          <button onClick={this.getPosition}>Get Position</button>
          <button onClick={this.checkOnDrop}>Check PGN</button>
          <button onClick={this.nextMove}>Play e5</button>
          <button onClick={this.checkLegal}>Check Moves</button>
          <button onClick={this.loadMikePGN}>Set Mike PGN</button>
        </div>
      </div>
    )
  }
}

export default Board
