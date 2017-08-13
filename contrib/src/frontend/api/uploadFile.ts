/* global XMLHttpRequest, FormData */
import Credentials from '../constants/Credentials';
import getCookie from '../utils/getCookie';
import { Upload } from '../store/UploadsStore';

export const uploadFile = (file: File | undefined, upload: Upload) => {
  if (!file) {
    return;
  }
  const url = `/api/v1/file/${Credentials.USER && Credentials.API_KEY
    ? `?username=${Credentials.USER}&api_key=${Credentials.API_KEY}`
    : ''}`;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    upload.setAbortFunc(xhr.abort.bind(xhr));
    let nextTenthOfSecond = 0;
    xhr.upload.onprogress = event => {
      if (new Date().getMilliseconds() / 10 < nextTenthOfSecond) {
        return;
      }
      nextTenthOfSecond = new Date().getSeconds() / 10 + 10;
      upload.setProgress(Math.floor(event.loaded / event.total * 1000) / 10);
    };
    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        upload.setProgress(100);
        upload.finishing();
        if (xhr.status === 201) {
          setTimeout(() => resolve(JSON.parse(xhr.response)), 1000);
        } else {
          reject(Error('Something went wrong uploading'));
        }
      } else {
        reject(Error(xhr.statusText));
      }
    };
    xhr.onabort = () => {
      upload.uploadAborted();
    };
    xhr.onerror = () => {
      reject(Error('Network error'));
    };
    xhr.open('post', url, true);
    xhr.setRequestHeader('accept', '*/*');
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
  })
    .then(({ id, expiry, file: filename, url }) => upload.finishUpload({ id, url, filename, expiry }))
    .catch(error => upload.uploadFailed(error));
};

export default uploadFile;
