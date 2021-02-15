import apiUrl from '../apiConfig'
import axios from 'axios'
// import { withRouter } from 'react-router-dom'

export const postShow = (postId, openingId) => {
  return axios({
    url: apiUrl + '/openings/' + openingId + '/posts/' + postId,
    method: 'GET'
  })
}

export const postCreate = (post, user, openingId) => {
  return axios({
    url: apiUrl + '/posts',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { post }
  })
}

export const postUpdate = (post, user, openingId, postId) => {
  return axios({
    url: apiUrl + '/posts' + postId,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { post }
  })
}

export const postDestroy = (post, user, openingId, postId) => {
  return axios({
    url: apiUrl + '/posts' + postId,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { openingId }
  })
}

// export const postIndex = user => {
//   return axios({
//     url: apiUrl + '/posts',
//     method: 'GET'
//   })
// }
