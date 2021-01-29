// imports
import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

// import axios & apiConfig
import axios from 'axios'
import apiUrl from '../../apiConfig'

// class
class UpdateOpening extends Component {
  constructor (props) {
    super(props)

    this.state = {
      opening: {
        name: '',
        type: '',
        skill: ''
      },
      updated: false
    }
  }

  async componentDidMount () {
    // we're going to "try" some things (our request)
    try {
      const res = await axios(`${apiUrl}/openings/${this.props.match.params.id}`)
      this.setState({ opening: res.data.opening })
    } catch (err) {
      // if anything goes wrong in the try block, hanlde error
      console.error(err)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match } = this.props
    console.log(event)
    axios({
      method: 'patch',
      url: `${apiUrl}/openings/${match.params.id}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { opening: this.state.opening }
    })
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }

  handleInputChange = (event) => {
    event.persist()
    // merge/combine the updatedField & the current state.book
    this.setState(currState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      // spread operator (...) will turn an object/array into coma
      // separate values or key/value pairs
      // { ...{ title: '', author: '' }, ...{ title: 'a' } }
      // { title: '', author: '', title: 'a' }
      // {author: '', title: 'a' }
      const newOpening = { ...currState.opening, ...updatedField }

      // Object.assign copies key/values pairs from one or more objects to a target object
      // Empty object is the 1st arg (modified in place)
      // state is the 2nd arg
      // updatedField is the 3rd arg (comes after the state so it overrides the state values)
      // const newBook = Object.assign({}, this.state.book, updatedField)

      return { opening: newOpening }
    })
  }

  render () {
    if (this.state.updated) {
      return <Redirect to={`{/openings/${this.props.match.params.id}}`}/>
    }
    return (
      <Fragment>
        <h2>Update an Opening:</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Opening name here"
            value={this.state.opening.name}
            onChange={this.handleInputChange}
          />
          <input
            name="type"
            type="text"
            placeholder="Opening type here"
            value={this.state.opening.type}
            onChange={this.handleInputChange}
          />
          <input
            name="skill"
            type="text"
            placeholder="Opening skill here"
            value={this.state.opening.skill}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </Fragment>
    )
  }
}

// export
export default UpdateOpening
