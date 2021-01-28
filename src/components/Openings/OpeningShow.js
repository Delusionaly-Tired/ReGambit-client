import React, { Component, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { openingShow } from '../../api/openings'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class OpeningShow extends Component {
  constructor (props) {
    super(props)

    // initially our movie state will be null, until it is fetched from the api
    this.state = {
      opening: null,
      deleted: false
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

  deleteOpening = () => {
    // axios.delete(`${apiUrl}/books/${this.props.match.params.id}`)
    axios({
      url: `${apiUrl}/openings/${this.props.match.params.id}`,
      method: 'delete'
    })
      .then(() => this.setState({ deleted: true }))
      // .then(() => this.setState({ redirect: '/index-books' }))
      .catch(console.error)
  }

  render () {
    let openingJsx
    const { opening, deleted } = this.state

    if (deleted) {
      return <Redirect to="/openings"/>
    }
    // if we don't have a movie yet
    if (!opening) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    } else {
      openingJsx = (
        <Fragment>
          <h3>{opening.title}</h3>
          <h3>Type: {opening.type}</h3>
          <h3>Skill: {opening.skill}</h3>
          <button>
            <Link to={`/update-opening/${opening._id}`}>Update Opening</Link>
          </button>
          <button onClick={this.deleteOpening}>Delete opening</button>
        </Fragment>
      )
    }

    return (
      <div>
        <h3>{opening.title}</h3>
        <h4>Type: {opening.type}</h4>
        <h4>Skill: {opening.skill}</h4>
        <button>Delete Opening</button>
        <button>Update Opening</button>
        {deleted ? <Redirect to="/openings"/> : openingJsx}
      </div>
    )
  }
}

export default withRouter(OpeningShow)
