import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import OpeningForm from '../OpeningForm/OpeningForm'
import { openingCreate } from '../../api/openings'

class OpeningCreate extends Component {
  constructor (props) {
    super(props)
    // initially our movies title and director will be empty until they are filled in
    this.state = {
      opening: {
        name: '',
        type: '',
        skill: ''
      },
      // createdId will be null, until we successfully create a movie
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { opening } = this.state
    // create a movie, pass it the movie data and the user for its token
    openingCreate(opening, user)
      // set the createdId to the id of the movie we just created
      // .then(res => this.setState({ createdId: res.data.movie._id }))
      .then(res => {
        this.setState({ createdId: res.data.opening._id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Created Opening Successfully',
        message: `Opening has been created successfully. Now viewing ${res.data.opening.title}.`,
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

  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    event.persist()
    this.setState(state => {
      // return our state changge
      return {
        // set the movie state, to what it used to be (...state.movie)
        // but replace the property with `name` to its current `value`
        // ex. name could be `title` or `director`
        opening: { ...state.opening, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    // destructure our movie and createdId state
    const { opening, createdId } = this.state
    // if the movie has been created and we set its id
    if (createdId) {
      // redirect to the movies show page
      return <Redirect to={`/openings/${createdId}`} />
    }
    return (
      <div>
        <h3>Create Opening</h3>
        <OpeningForm
          opening={opening}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default OpeningCreate
