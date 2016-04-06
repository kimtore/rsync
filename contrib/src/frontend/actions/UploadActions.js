/* global XMLHttpRequest FormData */
import * as types from '../constants/ActionTypes'

export function startUpload (id, file) {
  return {
    type: types.UPLOAD_STARTED,
    payload: {
      id: id,
      file: file
    }
  }
}

export function uploadFinished (id, response) {
  return {
    type: types.UPLOAD_SUCCESS,
    payload: {
      id: id,
      response: response
    }
  }
}

export function uploadError (id, error) {
  return {
    type: types.UPLOAD_ERROR,
    payload: {
      id: id,
      error: error
    },
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
    let id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
    dispatch(startUpload(id, file))
    let url = '/api/v1/file/'

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()

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
      let formData = new FormData()
      formData.append('file', file)
      xhr.send(formData)
    }).then(
      (response) => dispatch(uploadFinished(id, response),
        (error) => dispatch(uploadError(id, error))
      ).catch((error) => dispatch(finishedUploadsError(error)))
    )
  }
}
