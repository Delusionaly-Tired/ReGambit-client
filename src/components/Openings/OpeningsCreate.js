import React, { Component } from 'react'
import OpeningsForm from './OpeningsForm'
import { Redirect } from 'react-router-dom'

class OpeningsCreate extends Component {
  constructor (props) {
    super(props)

    // initially our opening title and director will be empty until they are filled in
    this.state = {
      opening: {
        name: '',
        type: '',
        skill: ''
      },
      // createdId will be null, until we successfully create an opening
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { opening } = this.state

    // create an opening, pass it the opening data and the user for its token
    OpeningsCreate(opening, user)
      // set the createdId to the id of the opening we just created
      .then(res => this.setState({ createdId: res.data.opening._id }))
      .then(() => msgAlert({
        heading: 'Created opening Succesfully',
        message: 'opening has been created successfully. Now viewing the opening.',
        variant: 'success'
      }))
  }

  render () {
  // destructure our openings and createdId state
    const { opening, createdId } = this.state

    // if the book has been created and we sits id
    if (createdId) {
      // redirect to the openings show page
      return <Redirect to={`/openings/${createdId}`} />
    }

    return (
      <div>
        <h3>Create Opening</h3>
        <OpeningsForm
          opening={opening}
          handleChange
        />
      </div>
    )
  }
}

export default OpeningsCreate
