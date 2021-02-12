import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { openingShow } from '../../api/openings'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import PostCreate from './../Posts/PostCreate.js'

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
        <h3 className='openType'>{opening.type}</h3>
        <h3 className='openType'>{opening.skill}</h3>
        <div className='blogForm'>Ad dolor e tempor a id laborum consectetur, amet et ne enim pariatur, malis eu
        in irure fabulas, non quem anim eram offendit, ab e elit minim noster qui
        admodum quid quibusdam aliquip ex quo nulla voluptate singulis. Excepteur ubi
        aute id irure et eiusmod. A se quid fabulas eu in velit firmissimum o ea anim
        ullamco concursionibus, velit hic se aliqua appellat et mentitum ad quae sed est
        cillum fabulas arbitrantur, offendit duis fugiat do labore, doctrina tamen nam
        nescius despicationes.In aute cernantur offendit sed commodo quis minim ne enim,
        eu mandaremus imitarentur nam quo ut sunt iudicem, fabulas summis enim excepteur
        summis, ea sunt illum est cernantur, laboris ea tempor vidisse, est laborum iis
        offendit. Quo senserit consectetur, ita esse aliquip, ad quis efflorescere, aut
        admodum imitarentur ita singulis adipisicing sed nostrud, tempor aut et tempor
        mandaremus do dolor ne eu minim officia, amet commodo de instituendarum. Ullamco
        nam aute, iudicem multos minim qui aute iis ab ex elit summis magna, iudicem e
        anim, de quid litteris deserunt, senserit quem dolore singulis multos aut
        offendit eu quibusdam, id commodo graviterque. Ea elit eiusmod distinguantur qui
        anim pariatur ea amet veniam est noster quamquam ne deserunt hic iudicem sed
        laboris.
        </div>
        <button onClick={this.deleteOpening} className='submitBtn'>Delete Opening</button>  <button className='submitBtn'><Link to={`/update-opening/${opening._id}`}>Update Opening</Link></button>
        <div>
          <PostCreate/>
        </div>
        <h4 className="skillTest">TITLE</h4>
        <p className="testTitle">tester</p>
        <h4 className="skillTest">TITLE</h4>
        <p className="testTitle">tester</p>
        {deleted ? <Redirect to="/openings"/> : openingJsx}
      </div>
    )
  }
}

export default withRouter(OpeningShow)
