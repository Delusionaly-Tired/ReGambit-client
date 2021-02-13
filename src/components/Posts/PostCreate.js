// import React, { Fragment, useState } from 'react'
// // import PostForm from './PostForm'
// import { withRouter } from 'react-router-dom'
// // import axios from 'axios'
// // import apiUrl from '../../apiConfig'
// import { postCreate } from '../../api/posts'
// // import './PostsAll.scss'

// function PostCreate (props) {
//   const [title, content] = useState('')

//   // when an input changes, update the state that corresponds with the input's name
//   const handleChange = event => {
//     event.persist()
//     // setContent(lastPost => {
//     //   const updateContentFieldHandler = { [event.target.name]: event.target.value }
//     //   const updatedContent = Object.assign({}, lastPost, updateContentFieldHandler)
//     //   return updatedContent
//     // })
//   }

//   async function handleSubmit (event) {
//     event.preventDefault()
//     event.target.reset()

//     const { user, msgAlert, opening, createNewPost } = props
//     const openingID = opening.id

//     try {
//       const res = await postCreate(title, content, user, openingID)
//       await createNewPost(res.data.newPost)
//         .then(res => {
//           this.setState({ postID: res.data.post.id })
//           console.log(res)
//         })
//       // .then(res => console.log(this))
//       // .then(() => console.log('THIS Printed Above'))
//       // .then(() => console.log('Opening Printed Above'))
//       // .then(res => console.log(openingID))
//       // .then(() => console.log('OpeningID Printed Above'))
//       msgAlert({
//         heading: 'Created post successfully',
//         message: 'Nice.',
//         variant: 'success'
//       })
//     } catch (error) {
//       console.log(this.state)
//       msgAlert({
//         heading: 'Failed to create comment',
//         message: `Failed because: ${error.message}`,
//         variant: 'danger'
//       })
//     }
//   }

//   return (
//     <Fragment>
//       <div id='postsDiv1'>
//         <h3 className='posth3'>Create post</h3>
//         <form className="createForm" onSubmit={handleSubmit}>
//           <label>Title</label>
//           <input
//             required
//             placeholder='Put the title of your comment here'
//             // this name should line up with the state we want to change
//             name='title'
//             onChange={handleChange}
//           />
//           <label>Content</label>
//           <input
//             required
//             placeholder='Put your message here'
//             // this name should line up with the state we want to change
//             name='content'
//             onChange={handleChange}
//           />
//           <div className='submitOpen'>
//             <button type='submit' className='submitBtn'>Submit Post</button>
//           </div>
//         </form>
//       </div>
//     </Fragment>
//   )
// }

// export default withRouter(PostCreate)
