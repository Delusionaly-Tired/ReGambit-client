import React, { Component, Fragment } from 'react'
import OpeningsForm from './OpeningsForm'
import { Redirect } from 'react-router-dom'
import { openingCreate } from '../../api/openings'
import './OpeningAll.css'
import Board from '../Board/Board'
import Chess from 'chess.js'

class OpeningsCreate extends Component {
  constructor (props) {
    super(props)

    // initially our opening states will be empty until they are filled in
    this.state = {
      opening: {
        name: '',
        type: '',
        skill: '',
        blogPost: '',
        pgn: ''
      },
      // createdId will be null, until we successfully create an opening
      createdId: null
    }
  }

  componentDidMount () {
    this.game = new Chess()
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { opening } = this.state

    // create an opening, pass it the opening data and the user for its token
    openingCreate(opening, user)
      // set the createdId to the id of the opening we just created
      .then(res => this.setState({ createdId: res.data.opening._id }))
      // .then(() => this.setState({ opening: pgn }))
      .then(() => msgAlert({
        heading: 'Created opening Succesfully',
        message: 'opening has been created successfully. Now viewing the opening.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Opening',
          message: 'Could not create opening with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  renderPGN = (taco) => {
    this.setState(currPGN => {
      const updatedPGN = {
        pgn: taco
      }
      const newPgn = { ...currPGN.opening, ...updatedPGN }
      return { opening: newPgn }
    })
    // this.setState({ opening: { ...this.state.opening, pgn: pgn } })
    console.log(this.state.opening)
  }
  // setPGN = () => {
  //   this.game = new Chess()
  //   console.log('COME ERE GEORGE')
  //   console.log(this.game.history())
  //   const moveHistory = this.game.history()
  //   if (moveHistory.length > 1) {
  //     moveHistory.join('')
  //     return moveHistory
  //   }
  //
  //   console.log(moveHistory)
  //   // this.game.load_pgn(this.game.history())
  //   // this.setState({ opening: this.game.fen() })
  // }

  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    event.persist()
    this.setState(state => {
      // return our state changge
      return {
        // set the opening state, to what it used to be (...state.opening)
        // but replace the property with `name` to its current `value`
        // ex. name could be `name` or `director`
        opening: { ...state.opening, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
  // destructure our openings and createdId state
    const { opening, createdId } = this.state
    // console.log(this.state.opening.pgn)
    // if the opening has been created and we sits id
    if (createdId) {
      console.log(createdId)
      // redirect to the openings show page
      return <Redirect to={`/openings/${createdId}`} />
    }

    return (
      <div id='openingsDiv1'>
        <Fragment>
          <div>
            <h3 className='openingh3'>Create Opening</h3>
            <OpeningsForm
              opening={opening}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            <div>
              <p className='Notation'>
                {opening.pgn}
              </p>
            </div>
          </div>
          <div className='createOpeningBoard'>
            <h2>What are the moves for this opening?</h2>
            <Board
              position={opening.pgn}
              renderPGN={this.renderPGN}
            />
          </div>
        </Fragment>
      </div>
    )
  }
}

export default OpeningsCreate
