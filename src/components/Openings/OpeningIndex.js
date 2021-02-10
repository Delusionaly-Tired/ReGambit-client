import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { openingIndex } from '../../api/openings'
import './OpeningAll.scss'

class OpeningIndex extends Component {
  constructor (props) {
    super(props)

    // keep track of the openings in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      openings: null
    }
  }

  // after we render the OpeningIndex component for the first time
  componentDidMount () {
    const { msgAlert, user } = this.props
    // make a request to get all of our openings
    openingIndex(user)
      // set the openings state, to the openings we got back in the response's data
      .then(res => {
        this.setState({ openings: res.data.openings })
      })
      // dummy data until we create actual openings
      // .then(res => this.setState({ openings: [{ _id: 1, name: 'jaws' }, { _id: 2, name: 'The Phantom Menace' }] }))
      .then(() => msgAlert({
        heading: 'Loaded Openings Successfully',
        message: 'All openings retrieved. Click on one to go to its page.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Load Openings!',
          message: 'Could not load openings with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure our openings state
    const { openings } = this.state
    console.log(openings)
    // if we haven't fetched any openings yet from the API
    if (!openings) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const openingJsx = openings.map(opening => (
      <Link to={`/openings/${opening._id}`} key={opening._id}>
        <li>
          {opening.name}
        </li>
      </Link>
    ))

    return (
      <div className='openingDiv1'>
        <h3 className='createh3'>Openings</h3>
        <ul>
          {openingJsx}
        </ul>
      </div>
    )
  }
}

export default OpeningIndex
