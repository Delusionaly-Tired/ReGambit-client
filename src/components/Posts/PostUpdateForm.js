import React from 'react'
// import './postAll.scss'

class PostUpdateForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      title: props.post.title,
      content: props.post.content
    }
  }

  handleChange = event => {
    event.persist()
    this.setState(state => {
      return { [event.target.name]: event.target.value }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const newPost = this.props.post
    const postId = this.props.post._id

    newPost.openingId = this.props.openingId
    newPost.title = this.state.title
    newPost.content = this.state.content

    this.props.updatePost(postId, newPost)
  }

  render () {
    return (
      <form className="createForm" onSubmit={this.handleSubmit}>
        <label>Title</label>
        <input
          required
          placeholder='Enter name of post'
          // this name should line up with the state we want to change
          name='title'
          value={this.state.title}
          onChange={this.handleChange}
        />
        <label>Content</label>
        <input
          required
          placeholder='Enter post type'
          // this name should line up with the state we want to change
          name='content'
          value={this.state.content}
          onChange={this.handleChange}
        />
        <div className='submitOpen'>
          <button type='submit' className='submitBtn'>Update Post</button>
        </div>
      </form>
    )
  }
}

export default PostUpdateForm
