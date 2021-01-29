import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect } from 'react-router-dom'
import { openingShow } from '../../api/openings'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class OpeningShow extends Component {
  constructor (props) {
    super(props)

    // initially our opening state will be null, until it is fetched from the api
    this.state = {
      opening: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    console.log(user)
    console.log(match)
    // make a request for a single opening
    openingShow(match.params.id, user)
    // set the opening state to the opening we got back in the resopnse's data
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

  deleteOpening = () => {
    const { user, match } = this.props
    console.log(user)
    console.log(match)
    axios({
      url: `${apiUrl}/openings/${match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    let openingJsx
    const { opening, deleted } = this.state

    if (deleted) {
      return <Redirect to="/openings"/>
    }
    // if we don't have a opening yet
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
        <h3>{opening.name}</h3>
        <h4>Type: {opening.type}</h4>
        <h4>Skill: {opening.skill}</h4>
        <button onClick={this.deleteOpening}>Delete Opening</button>
        <button>Update Opening</button>
        {deleted ? <Redirect to="/openings"/> : openingJsx}
      </div>
    )
  }
}

export default withRouter(OpeningShow)
