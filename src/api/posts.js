import apiUrl from '../apiConfig'
import axios from 'axios'
// import { withRouter } from 'react-router-dom'

export const postIndex = user => {
  return axios({
    url: apiUrl + '/posts',
    method: 'GET'
  })
}

export const postCreate = async (content, title, user, openingID) => {
  return axios({
    url: apiUrl + '/posts',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      post: {
        title: title.title,
        content: content.content,
        openingID: openingID
      }
    }
  })
}

export const postShow = (id, user) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'GET'
  })
}
