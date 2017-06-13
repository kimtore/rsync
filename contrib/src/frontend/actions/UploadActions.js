/* global XMLHttpRequest FormData */
import Credentials from '../constants/Credentials'
import * as types from '../constants/ActionTypes'
import generateId from '../utils/generateId'
import getCookie from '../utils/getCookie'

export const startUpload = (id, file) => ({
  type: types.UPLOAD_STARTED,
  payload: { id, file }
})

export const uploadFinished = (id, finishedUpload) => ({
  type: types.UPLOAD_SUCCESS,
  payload: { id, finishedUpload }
})

export const uploadError = (id, error) => ({
  type: types.UPLOAD_ERROR,
  payload: { id, error },
  error: true
})

export const uploadProgress = (id, progress) => ({
  type: types.UPLOAD_PROGRESS,
  payload: { progress, id }
})

export const uploadFile = file => (dispatch, getState) => {
  const id = generateId()
  dispatch(startUpload(id, file.name))
  const url = `/api/v1/file/${Credentials.USER && Credentials.API_KEY
    ? `?username=${Credentials.USER}&api_key=${Credentials.API_KEY}`
    : ''}`

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const checkAborted = setInterval(() => {
      if (
        getState().uploads.find(upload => upload.id === id).status ===
        'Aborting'
      ) {
        xhr.abort()
      }
    })
    let nextTenthOfSecond = 0
    xhr.upload.onprogress = event => {
      if (new Date().getMilliseconds() / 10 < nextTenthOfSecond) return
      nextTenthOfSecond = new Date().getSeconds() / 10 + 10
      dispatch(
        uploadProgress(id, Math.floor(event.loaded / event.total * 1000) / 10)
      )
    }
    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        dispatch(uploadProgress(id, 100))
        clearInterval(checkAborted)
        if (xhr.status === 201) {
          setTimeout(() => resolve(JSON.parse(xhr.response)), 1000)
        } else {
          reject(Error('Something went wrong uploading'))
        }
      } else {
        clearInterval(checkAborted)
        reject(Error(xhr.statusText))
      }
    }
    xhr.onabort = () => {
      clearInterval(checkAborted)
      dispatch(uploadAborted(id))
    }
    xhr.onerror = () => {
      clearInterval(checkAborted)
      reject(Error('Network error'))
    }
    xhr.open('post', url, true)
    xhr.setRequestHeader('accept', '*/*')
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'))
    const formData = new FormData()
    formData.append('file', file)
    xhr.send(formData)
  })
    .then(response => dispatch(uploadFinished(id, response)))
    .catch(error => dispatch(uploadError(id, error)))
}

export const requestDeleteUpload = id => ({
  type: types.REQUEST_DELETE_UPLOAD,
  payload: {
    id
  }
})

export const uploadDeleted = id => ({
  type: types.UPLOAD_DELETED,
  payload: {
    id
  }
})

export const deleteUploadError = (id, error) => ({
  type: types.DELETE_UPLOAD_ERROR,
  payload: { id, error },
  error: true
})

export const deleteUpload = id => dispatch => {
  dispatch(requestDeleteUpload(id))
  const url = `/api/v1/file/${id}/${Credentials.USER && Credentials.API_KEY
    ? `?username=${Credentials.USER}&api_key=${Credentials.API_KEY}`
    : ''}`

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve()
      } else {
        reject(Error(xhr.statusText))
      }
    }
    xhr.onerror = () => {
      reject(Error('Network error'))
    }
    xhr.open('delete', url, true)
    xhr.setRequestHeader('accept', '*/*')
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'))
    xhr.send()
  })
    .then(() => dispatch(uploadDeleted(id)))
    .catch(error => dispatch(deleteUploadError(id, error)))
}

export const abortUpload = id => ({
  type: types.ABORT_UPLOAD,
  payload: {
    id
  }
})

export const uploadAborted = id => ({
  type: types.UPLOAD_ABORTED,
  payload: {
    id
  }
})

export const changeUploadStatus = (id, status) => ({
  type: types.CHANGE_UPLOAD_STATUS,
  payload: {
    id,
    status
  }
})

export const removeUpload = id => ({
  type: types.REMOVE_UPLOAD,
  payload: {
    id
  }
})
