import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { postShow } from '../../api/posts'
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
      // .then(res => this.setState({ openingId: match.params._id }))
      // .then(res => this.setState({ postId: res.data.opening.posts._id }))
      .then(res => this.setState({ opening: { ...this.state.opening, posts: this.state.opening.posts.filter((post) => post._id !== postId) } }
      ))
      .then(console.log(this.state))
      .catch(console.error)
  }

  updatePost = (postId, openingId, event) => {
    event.preventDefault()
    const { user, match } = this.props
    const { title, content } = this.state
    console.log(user)
    console.log(match)
    axios({
      url: `${apiUrl}/posts/${postId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { opening: this.state.opening }
    })
      .then(res => this.setState({ opening: { ...this.state.opening, posts: this.state.opening.posts.filter((post) => title !== postId) } }
      ))
      .then(console.log(content))
      .then(console.log(this.state))
      .catch(console.error)
  }

  render () {
    const { opening } = this.state
    console.log('this is ', opening.posts)
    const postsJsx = opening.posts.map(post => (
      <div
        key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <button onClick={() => this.deletePost(post._id)} className='submitBtn'>Delete Post</button>
        <button onClick={() => this.updatePost(post._id)} className='submitBtn'>Update Post</button>
      </div>
    ))

    return (
      <div>
        {postsJsx}
        <form className="createForm" onSubmit={(this.updatePost)}>
          <label>Title</label>
          <input
            required
            placeholder='Enter name of post'
            // this name should line up with the state we want to change
            name='title'
            defaultValue={this.state.opening.posts.title}
          />
          <label>Content</label>
          <input
            required
            placeholder='Enter post type'
            // this name should line up with the state we want to change
            name='content'
            defaultValue={this.state.opening.posts.content}
          />
          <div className='submitOpen'>
            <button type='submit' className='submitBtn'>Update Post</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(ShowPosts)
