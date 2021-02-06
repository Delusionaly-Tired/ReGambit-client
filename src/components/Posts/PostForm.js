import React from 'react'
// import './postAll.scss'

const PostsForm = ({ post, handleSubmit, handleChange }) => (
  <form className="createForm" onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      required
      placeholder='Enter name of post'
      // this name should line up with the state we want to change
      name='title'
      defaultValue={post.title}
      onChange={handleChange}
    />
    <label>Content</label>
    <input
      required
      placeholder='Enter post type'
      // this name should line up with the state we want to change
      name='content'
      defaultValue={post.content}
      onChange={handleChange}
    />
    <div className='submitOpen'>
      <button type='submit' className='submitBtn'>Submit Post</button>
    </div>
  </form>
)

export default PostsForm
