import apiUrl from '../apiConfig'
import axios from 'axios'
// import { withRouter } from 'react-router-dom'

export const postIndex = user => {
  return axios({
    url: apiUrl + '/posts',
    method: 'GET'
  })
}

export const postShow = (id, user) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'GET'
  })
}
