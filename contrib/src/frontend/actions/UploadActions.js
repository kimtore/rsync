/* global XMLHttpRequest FormData */
import * as types from '../constants/ActionTypes'
import generateId from '../utils/generateId'
import getCookie from '../utils/getCookie'

export function startUpload (id, file) {
  return {
    type: types.UPLOAD_STARTED,
    payload: { id, file }
  }
}

export function uploadFinished (id, finishedUpload) {
  return {
    type: types.UPLOAD_SUCCESS,
    payload: { id, finishedUpload }
  }
}

export function uploadError (id, error) {
  return {
    type: types.UPLOAD_ERROR,
    payload: { id, error },
    error: true
  }
}

export function uploadProgress (id, progress) {
  return {
    type: types.UPLOAD_PROGRESS,
    payload: {
      progress: progress,
      id: id
    }
  }
}

export function uploadFile (file) {
  return dispatch => {
    const id = generateId()
    dispatch(startUpload(id, file))
    const url = '/api/v1/file/'

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      let nextTenthOfSecond = 0
      xhr.upload.onprogress = event => {
        if (new Date().getMilliseconds() / 10 < nextTenthOfSecond) return
        nextTenthOfSecond = new Date().getSeconds() / 10 + 10
        dispatch(uploadProgress(id, (Math.floor(event.loaded / event.total * 1000) / 10)))
      }
      xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          dispatch(uploadProgress(id, 100))
          setTimeout(() => resolve(JSON.parse(xhr.response)), 1000)
        } else {
          reject(Error(xhr.statusText))
        }
      }
      xhr.onerror = function () {
        reject(Error('Network error'))
      }
      xhr.open('post', url, true)
      xhr.setRequestHeader('accept', '*/*')
      xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'))
      const formData = new FormData()
      formData.append('file', file)
      xhr.send(formData)
    }).then((response) => dispatch(uploadFinished(id, response),
      (error) => dispatch(uploadError(id, error)))
    ).catch((error) => dispatch(uploadError(error)))
  }
}
