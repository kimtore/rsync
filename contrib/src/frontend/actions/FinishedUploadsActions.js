/* global XMLHttpRequest */
import * as types from '../constants/ActionTypes'

export function requestFinishedUploads () {
  return {
    type: types.REQUEST_FINISHED_UPLOADS
  }
}

export function receiveFinishedUploads (finishedUploads) {
  return {
    type: types.RECEIVE_FINISHED_UPLOADS,
    payload: {
      finishedUploads: finishedUploads
    }
  }
}

export function finishedUploadsError (error) {
  return {
    type: types.FINISHED_UPLOADS_ERROR,
    payload: {
      error: error
    },
    error: true
  }
}

export function getFinishedUploads () {
  return dispatch => {
    dispatch(requestFinishedUploads())
    let url = '/api/v1/file/'

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()

      xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          resolve(JSON.parse(xhr.response).objects.reverse())
        } else {
          reject(Error(xhr.statusText))
        }
      }
      xhr.onerror = function () {
        reject(Error('Network error'))
      }
      xhr.open('get', url, true)
      xhr.setRequestHeader('accept', '*/*')
      xhr.send()
    }).then(
      (response) => dispatch(receiveFinishedUploads(response),
        (error) => dispatch(finishedUploadsError(error))
      ).catch((error) => dispatch(finishedUploadsError(error)))
    )
  }
}
