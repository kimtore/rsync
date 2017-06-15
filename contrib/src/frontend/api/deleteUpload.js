/* global XMLHttpRequest */
import Credentials from '../constants/Credentials'
import getCookie from '../utils/getCookie'

export const deleteUpload = id => {
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
}

export default deleteUpload
