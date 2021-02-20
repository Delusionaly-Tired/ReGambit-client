import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { postShow } from '../../api/posts'
import { withRouter } from 'react-router-dom'
import PostUpdateForm from './PostUpdateForm.js'

class ShowPosts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      opening: {
        posts: [],
        updated: false,
        deleted: false
      }
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    // const { openingId } = this.state
    console.log(user)
    console.log(match)
    // make a request for a single opening
    postShow(match.params.id)
    // set the opening state to the opening we got back in the resopnse's data
      .then(res => this.setState({ opening: res.data.opening }))
      .then(() => msgAlert({
        heading: 'Showing Post Successfully',
        message: 'The post is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Post Failed',
          message: 'Failed to show post with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  deletePost = (postId, openingId) => {
    const { user, match } = this.props

    console.log(user)
    console.log(match)
    console.log(this.state.opening.posts)
    axios({
      url: `${apiUrl}/posts/${postId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { opening: this.state.opening }
    })
      .then(res => this.setState({ opening: { ...this.state.opening, posts: this.state.opening.posts.filter((post) => post._id !== postId) } }
      ))
      .then(console.log(this.state))
      .catch(console.error)
  }

  updatePost = async (postId, post) => {
    const { user } = this.props
    axios({
      url: `${apiUrl}/posts/${postId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { post: post }
    })
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => this.setState({ opening: res.data.opening }
      ))
      .catch(console.error)
  }

  selectPost = (post) => {
    this.setState({ selected: post })
    console.log(post)
  }

  render () {
    const { opening, selected } = this.state
    console.log('this is ', opening.posts)
    const postsJsx = opening.posts.map(post => (
      <div
        key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <button onClick={() => this.deletePost(post._id)} className='submitBtn'>Delete Post</button>
        { selected === post
          ? <button onClick={() => this.selectPost(null)} className='submitBtn'>Close Editing Form</button>
          : <button onClick={() => this.selectPost(post)} className='submitBtn'>Update Post</button> }
      </div>
    ))

    return (
      <div>
        {postsJsx}
        {selected
          ? <PostUpdateForm post={selected} updatePost={this.updatePost} openingId={this.state.opening._id} />
          : null
        }
      </div>
    )
  }
}

export default withRouter(ShowPosts)
