import apiUrl from '../apiConfig'
import axios from 'axios'

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

export const postUpdate = (content, user, openingID, postID) => {
  return axios({
    url: apiUrl + '/posts/' + postID,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      post: {
        content: content.content,
        openingID: openingID
      }
    }
  })
}

export const postDelete = (openingID, user, postID) => {
  return axios({
    url: apiUrl + '/posts/' + postID,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      post: {
        openingID: openingID
      }
    }
  })
}
