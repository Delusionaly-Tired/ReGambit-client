import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter } from 'react-router-dom'
import { openingShow } from '../../api/openings'

class OpeningShow extends Component {
  constructor (props) {
    super(props)

    // initially our movie state will be null, until it is fetched from the api
    this.state = {
      opening: null
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    // make a request for a single movie
    openingShow(match.params.id, user)
    // set the movie state to the movie we got back in the resopnse's data
      .then(res => this.setState({ opening: res.data.opening }))
      .then(() => msgAlert({
        heading: 'Showing Opening Successfully',
        message: 'The opening is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Opening Failed',
          message: 'Failed to show opening with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { opening } = this.state

    // if we don't have a movie yet
    if (!opening) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    return (
      <div>
        <h3>{opening.title}</h3>
        <h4>Type: {opening.type}</h4>
        <h4>Skill: {opening.skill}</h4>
        <button>Delete Opening</button>
        <button>Update Opening</button>
      </div>
    )
  }
}

export default withRouter(OpeningShow)
