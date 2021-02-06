import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
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
      <div className="showOpeningDiv">
        <h3 className='openingEdit'>{opening.name}</h3>
        <h3 className='openType'>Type: {opening.type}</h3>
        <h3 className='openType'>Skill: {opening.skill}</h3>
        <div className='blogForm'>Non quis quis qui ea sit proident ipsum sunt mollit qui. Exercitation amet consequat exercitation est ut velit magna sint nisi adipisicing nisi aute. Anim aliquip proident fugiat id. Et sunt laborum nisi dolor sit eu culpa.</div>
        <button onClick={this.deleteOpening} className='submitBtn'>Delete Opening</button>
        <button className='submitBtn'>
          <Link to={`/update-opening/${opening._id}`}>Update Opening</Link>
        </button>
        {deleted ? <Redirect to="/openings"/> : openingJsx}
      </div>
    )
  }
}

export default withRouter(OpeningShow)
