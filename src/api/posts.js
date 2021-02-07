import apiUrl from '../apiConfig'
import axios from 'axios'

export const postIndex = user => {
  return axios({
    url: apiUrl + '/posts',
    method: 'GET'
  })
}

export const postCreate = (opening, user, id) => {
  return axios({
    url: apiUrl + '/openings/' + opening._id + '/posts',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { opening: opening }
  })
}

export const postShow = (id, user) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'GET'
  })
}
