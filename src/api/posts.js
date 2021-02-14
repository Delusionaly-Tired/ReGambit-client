import apiUrl from '../apiConfig'
import axios from 'axios'
// import { withRouter } from 'react-router-dom'

export const postIndex = user => {
  return axios({
    url: apiUrl + '/posts',
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

export const postShow = (id, user) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'GET'
  })
}
