import React, { Component } from 'react'
import PostForm from './PostForm'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { postCreate } from '../../api/posts'
// import './PostsAll.scss'

export class PostCreate extends Component {
  constructor (props) {
    super(props)

    // initially our opening states will be empty until they are filled in
    this.state = {
      post: {
        title: '',
        content: ''
      },
      // createdId will be null, until we successfully create a movie
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { post } = this.state
    console.log(this)
    console.log(this.props)
    console.log(this.props.user)

    // create a movie, pass it the movie data and the user for its token
    postCreate(post, user)
      .then(res => this.setState({ createdId: res.data.post._id }))
      .then(() => msgAlert({
        heading: 'Created opening Succesfully',
        message: 'opening has been created successfully. Now viewing the opening.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Opening',
          message: 'Could not create opening with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    event.persist()

    this.setState(state => {
      // return our state changge
      return {
        // set the post state, to what it used to be (...state.post)
        // but replace the property with `name` to its current `value`
        // ex. name could be `title` or `director`
        post: { ...state.post, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    // destructure our post and createdId state
    const { post, createdId } = this.state

    // if the post has been created and we set its id
    if (createdId) {
      // redirect to the posts show page
      return <Redirect to={`/posts/${createdId}`} />
    }

    return (
      <div>
        <h3>Create post</h3>
        <PostForm
          post={post}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default PostCreate
