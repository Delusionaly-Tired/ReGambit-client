import React, { Component } from 'react'
import PostForm from './PostForm'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import { postCreate } from '../../api/posts'
// import './PostsAll.scss'

class PostCreate extends Component {
  constructor (props) {
    super(props)

    // initially our opening states will be empty until they are filled in
    this.state = {
      post: [],
      // openingID: this.props.match.params.id
      // createdId will be null, until we successfully create an post
      updated: false
    }
  }

  async componentDidMount () {
    // we're going to "try" some things (our request)
    try {
      const res = await axios(`${apiUrl}/openings/${this.props.match.params.id}`)
      console.log(res)
      console.log(res.data.post)
      // this.setState({ opening: res.data.opening })
      // console.log(res)
    } catch (err) {
      // if anything goes wrong in the try block, hanlde error
      console.error(err)
    }
  }

  // when an input changes, update the state that corresponds with the input's name
  handleChange = (event) => {
    event.persist()
    this.setState(currState => {
      const storedPost = {
        [event.target.name]: event.target.value
      }
      const throwPost = { ...currState.post, ...storedPost }
      return { opening: throwPost }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, match, msgAlert, throwPost } = this.props
    const { post, opening, openingID } = this.state
    console.log(match)
    console.log(post)
    console.log(this)
    axios({
      method: 'PATCH',
      url: `${apiUrl}/openings/${match.params.id}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { opening: opening }
    })
      .then(res => console.log(this))
      .then(() => console.log('THIS Printed Above'))
      // .then(res => console.log(post))
      // .then(() => console.log('Post Printed Above'))
      .then(res => console.log(opening))
      .then(() => console.log('Opening Printed Above'))
      .then(res => this.setState({ openingID: match.params.id }))
      .then(res => console.log(openingID))
      .then(() => console.log('OpeningID Printed Above'))
      .then(res => console.log(throwPost))
      .then(() => console.log('Updated Post Printed Above'))
      // .then(res => this.setState({ opening }))
      // .then(() => this.setState({ updated: true }))
      // .then(res => this.setState({ createdId: res.data.post.id }))
      // .then(() => this.setState({ opening: throwPost }))
      .then(() => msgAlert({
        heading: 'Created post Succesfully',
        message: 'post has been created successfully. Now viewing the post.',
        variant: 'success'
      }))
      .then(() => this.setState({ post: this.state.post.concat() }, () => console.log(this.state)))
      // .then(() => this.state.concat(`${apiUrl}/openings/${match.params.id}`))
      .catch(error => {
        console.log(this.state)
        msgAlert({
          heading: 'Failed to Create post',
          message: 'Could not create post with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
  // destructure our posts and createdId state
    const { updated, post } = this.state

    // if the post has been created and we sits id
    if (updated) {
      console.log('This is the loop in render coming from the alert boxes.')
      console.log(post)
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
