import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { postDestroy, postUpdate, postShow } from '../../api/posts'
import { withRouter } from 'react-router-dom'

class ShowPosts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: [],
      updated: false,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    console.log(user)
    console.log(match)
    // make a request for a single opening
    postShow(match.params._id, user)
    // set the opening state to the opening we got back in the resopnse's data
      .then(res => this.setState({ posts: res.data.posts }))
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
    console.log(postDestroy)
    axios({
      url: `${apiUrl}/posts/${match.params.id}`,
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

  updatePost = () => {
    console.log(postUpdate)
  }

  render () {
    // let postsJsx
    const { posts } = this.state
    console.log(posts)
    const postsJsx = posts.map(post => (
      <div
        key={post._id}>
        {post.title}
        {post.content}
      </div>
    ))

    return (
      <div>
        {postsJsx}
        <button onClick={this.deletePost} className='submitBtn'>Delete Post</button>
        <button className='submitBtn'>Update Post</button>
      </div>
    )
  }
}

export default withRouter(ShowPosts)
