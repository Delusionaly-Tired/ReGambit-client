import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { postDestroy, postUpdate } from '../../api/posts'

const ShowPosts = props => {
  const { opening } = props
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const [postId] = useState(null)
  const [postsList] = useState(opening.posts)

  const handleChange = event => {
    event.persist()
    // handle the change here!
  }

  const postsJsx = postsListing.map(post => (
    {post.title}
    {post.content}
  ))

  return (
    <div>
        {postsJsx}
    </div>
  )
}

export default ShowPosts
