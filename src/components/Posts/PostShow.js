import React, { Component, Fragment } from 'react'
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
    const { match, msgAlert, handleChange } = this.props
    // const { openingId } = this.state
    // console.log(user)
    // console.log(match)
    // make a request for a single opening
    postShow(match.params.id)
    // set the opening state to the opening we got back in the resopnse's data
      .then(res => handleChange({ opening: res.data.opening }))
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
    const { user, match, opening, handleChange } = this.props

    console.log(user)
    console.log(match)
    console.log(opening.posts)
    axios({
      url: `${apiUrl}/posts/${postId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { opening: opening }
    })
      .then(res => handleChange({ opening: { ...opening, posts: opening.posts.filter((post) => post._id !== postId) } }
      ))
      .then(console.log(this.state))
      .catch(console.error)
  }

  updatePost = async (postId, post) => {
    const { user, handleChange } = this.props
    axios({
      url: `${apiUrl}/posts/${postId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { post: post }
    })
      .then(res => handleChange({ opening: res.data.opening }
      ))
      .catch(console.error)
  }

  selectPost = (post) => {
    this.setState({ selected: post })
    console.log(post)
  }

  render () {
    const { selected } = this.state
    const { opening, user } = this.props
    console.log('this is ', opening.posts)
    const postsJsx = opening.posts.map(post => (
      <div
        key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        { post.owner === user._id
          ? <Fragment>
            <button onClick={() => this.deletePost(post._id)} className='submitBtn'>Delete Post</button>
            { selected === post
              ? <button onClick={() => this.selectPost(null)} className='submitBtn'>Close Editing Form</button>
              : <button onClick={() => this.selectPost(post)} className='submitBtn'>Update Post</button> }
          </Fragment> : null }
      </div>
    ))

    return (
      <div>
        {postsJsx}
        {selected
          ? <PostUpdateForm post={selected} updatePost={this.updatePost} openingId={opening._id} />
          : null
        }
      </div>
    )
  }
}

export default withRouter(ShowPosts)
