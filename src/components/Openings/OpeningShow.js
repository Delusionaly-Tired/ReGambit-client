import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import PostCreate from '../Posts/PostCreate.js'
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
        <div className='blogForm'>Veniam vidisse in quibusdam. Iis cillum doctrina relinqueret qui laboris quis
        enim excepteur tamen, nam fore est legam ne fabulas anim hic laboris
        firmissimum. Incurreret nulla non admodum concursionibus non quid te consequat
        nam elit offendit graviterque non in dolore ex sint, ex tamen fabulas ita
        nescius in culpa litteris nam eiusmod in admodum an hic enim noster culpa
        arbitror. Culpa exercitation laboris anim litteris eu cernantur fugiat
        offendit.Iis dolore comprehenderit, sint mentitum firmissimum a fugiat fabulas
        proident, commodo ut eiusmod. Cillum ita ab esse laborum o quae relinqueret
        cupidatat ipsum offendit, et laborum cohaerescant ad non quamquam fidelissimae,
        id se quis multos nulla, e iis elit voluptate qui qui dolore minim non
        excepteur, hic quid de summis. Nam ab anim summis duis. Sint aliquip ne
        ingeniis.</div>
        <div className="postForm">
          {PostCreate}
        </div>
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
