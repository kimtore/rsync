/* global XMLHttpRequest */
import Credentials from '../constants/Credentials'
import { Upload } from '../store/UploadsStore'

export const getFinishedUploads = store => {
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
            .map(
              finishedUpload =>
                new Upload({
                  ...finishedUpload,
                  filename: finishedUpload.file,
                  status: 'Finished',
                  store
                })
            )
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
}

export default getFinishedUploads
