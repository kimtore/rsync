/* global XMLHttpRequest */
import Credentials from '../constants/Credentials'
import * as types from '../constants/ActionTypes'

export const requestFinishedUploads = () => ({
  type: types.REQUEST_FINISHED_UPLOADS
})

export const receiveFinishedUploads = finishedUploads => ({
  type: types.RECEIVE_FINISHED_UPLOADS,
  payload: { finishedUploads }
})

export const finishedUploadsError = error => ({
  type: types.FINISHED_UPLOADS_ERROR,
  payload: error,
  error: true
})

export const getFinishedUploads = () => dispatch => {
  dispatch(requestFinishedUploads())
  const url = `/api/v1/file/${Credentials.USER && Credentials.API_KEY
    ? `?username=${Credentials.USER}&api_key=${Credentials.API_KEY}`
    : ''}`

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(
          JSON.parse(xhr.response)
            .objects.reverse()
            .filter(finishedUpload => finishedUpload.file)
        )
      } else {
        reject(Error(xhr.statusText))
      }
    }
    xhr.onerror = () => {
      reject(Error('Network error'))
    }
    xhr.open('get', url, true)
    xhr.setRequestHeader('accept', '*/*')
    xhr.send()
  })
    .then(response => dispatch(receiveFinishedUploads(response)))
    .catch(error => dispatch(finishedUploadsError(error)))
}
