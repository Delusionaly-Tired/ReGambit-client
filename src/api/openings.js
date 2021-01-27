import apiUrl from '../apiConfig'
import axios from 'axios'
export const openingsIndex = user => {
  return axios({
    url: apiUrl + '/openings',
    method: 'GET',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}
export const movieCreate = (opening, user) => {
  return axios({
    url: apiUrl + '/openings',
    method: 'POST',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    },
    // send the movie object as our data for creating a movie
    data: { opening }
  })
}
// get a single opening
export const openingsShow = (id, user) => {
  return axios({
    url: apiUrl + '/openings/' + id,
    method: 'GET',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}
