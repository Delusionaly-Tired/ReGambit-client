import React, { Component } from 'react'
import PostForm from './PostForm'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { postCreate } from '../../api/posts'
// import './PostsAll.scss'

class PostCreate extends Component {
  constructor (props) {
    super(props)

    // initially our opening states will be empty until they are filled in
    this.state = {
      post: {
        title: '',
        content: '',
        openingId: ''
      },
      // createdId will be null, until we successfully create a movie
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert, match } = this.props
    const { post } = this.state
    console.log(this)
    console.log(this.props)
    console.log(match)
    console.log(this.props.user)

    // create a movie, pass it the movie data and the user for its token
    postCreate(post, user)
      // .then(res => this.setState({ post: res.data.opening._id }))
      .then(res => {
        this.setState({ createdId: res.data.opening.posts._id })
        return res
      })
      .then(res => this.props.handleOpeningChange({ opening: res.data.opening }))
      .then(() => msgAlert({
        heading: 'Created Post Succesfully',
        message: 'Nice.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Post',
          message: 'Could not create post with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    event.persist()

    this.setState(state => {
      return {
        post: { ...state.post, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    // const { opening } = this.props
    const { post, createdId } = this.state

    // if the post has been created and we set its id
    if (createdId) {
      // redirect to the posts show page
      return <Redirect to={`/posts/${createdId}`} />
    }

    return (
      <div>
        <h3>Create post (Sidepost Box)</h3>
        <PostForm
          post={post}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          // openingId={this.state.post.openingId}
        />
      </div>
    )
  }
}

export default PostCreate
