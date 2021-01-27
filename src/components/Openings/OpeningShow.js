import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter } from 'react-router-dom'
import { movieShow } from '../../api/movies'

class MovieShow extends Component {
  constructor (props) {
    super(props)

    // initially our movie state will be null, until it is fetched from the api
    this.state = {
      movie: null
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    // make a request for a single movie
    movieShow(match.params.id, user)
    // set the movie state to the movie we got back in the resopnse's data
      .then(res => this.setState({ movie: res.data.movie }))
      .then(() => msgAlert({
        heading: 'Showing Movie Successfully',
        message: 'The movie is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Movie Failed',
          message: 'Failed to show movie with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { movie } = this.state

    // if we don't have a movie yet
    if (!movie) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    return (
      <div>
        <h3>{movie.title}</h3>
        <h4>Directed by: {movie.director}</h4>
        <button>Delete Movie</button>
        <button>Update Movie</button>
      </div>
    )
  }
}

export default withRouter(MovieShow)
