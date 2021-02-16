import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { postUpdate, postShow } from '../../api/posts'
import { withRouter } from 'react-router-dom'

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

  deletePost = () => {
    const { user, match } = this.props
    console.log(user)
    console.log(match)
    console.log(this.state.opening.posts[1])
    axios({
      url: `${apiUrl}/posts/${this.state.opening}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(res => this.setState({ postId: res.data.opening.posts._id }))
      .then(res => this.setState({ deleted: true }))
      .catch(console.error)
  }

  updatePost = () => {
    console.log(postUpdate)
  }

  render () {
    const { opening } = this.state
    console.log('this is ', opening.posts)
    const postsJsx = opening.posts.map(post => (
      <div
        key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <button onClick={this.deletePost} className='submitBtn'>Delete Post</button>
        <button onClick={this.updatePost} className='submitBtn'>Update Post</button>
      </div>
    ))

    return (
      <div>
        {postsJsx}
      </div>
    )
  }
}

export default withRouter(ShowPosts)
