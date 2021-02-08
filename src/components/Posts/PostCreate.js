import React, { Component } from 'react'
import PostForm from './PostForm'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import { postCreate } from '../../api/posts'
// import './PostsAll.scss'

class PostCreate extends Component {
  constructor (props) {
    super(props)

    // initially our opening states will be empty until they are filled in
    this.state = {
      post: {
        title: '',
        content: ''
      },
      // createdId will be null, until we successfully create an post
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, match, msgAlert } = this.props
    const { post } = this.state
    console.log(user)
    console.log(match)
    console.log(post)
    axios({
      method: 'POST',
      url: `${apiUrl}/openings/${match.params.id}/posts`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { post: this.state.post }
    })
      .then(res => this.setState({ createdId: res.data.post._id }))
      .then(res => console.log(match.params.id))
      .then(() => msgAlert({
        heading: 'Created post Succesfully',
        message: 'post has been created successfully. Now viewing the post.',
        variant: 'success'
      }))
      .catch(error => {
        console.log(match.params.id)
        console.log(post)
        msgAlert({
          heading: 'Failed to Create post',
          message: 'Could not create post with error: ' + error.message,
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
        // ex. name could be `name` or `director`
        post: { ...state.post, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
  // destructure our posts and createdId state
    const { post, createdId } = this.state

    // if the post has been created and we sits id
    if (createdId) {
      console.log(createdId)
      // redirect to the posts show page
      return <Redirect to={`/posts/${createdId}`} />
    }

    return (
      <div id='postsDiv1'>
        <h3 className='posth3'>Create post</h3>
        <PostForm
          post={post}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default withRouter(PostCreate)