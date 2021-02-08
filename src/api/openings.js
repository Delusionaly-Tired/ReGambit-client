import apiUrl from '../apiConfig'
import axios from 'axios'

export const openingIndex = user => {
  return axios({
    url: apiUrl + '/openings',
    method: 'GET'
  })
}

export const openingCreate = (opening, user, post) => {
  return axios({
    url: apiUrl + '/openings',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { opening: opening, post: post }
  })
}

export const openingShow = (id, user) => {
  return axios({
    url: apiUrl + '/openings/' + id,
    method: 'GET'
  })
}
