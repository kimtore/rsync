/* global XMLHttpRequest */
import Credentials from '../constants/Credentials';
import { Upload, UploadsStore } from '../store/UploadsStore';

export const getFinishedUploads = (store: UploadsStore) => {
  const url = `/api/v1/file/${Credentials.USER && Credentials.API_KEY
    ? `?username=${Credentials.USER}&api_key=${Credentials.API_KEY}&limit=10000000000`
    : ''}`;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(
          JSON.parse(xhr.response).objects.reverse().filter(({ file: filename }: { file: string }) => filename).map(
            ({ expiry, file: filename, url, id }: { expiry: string; file: string; url: string; id: string }) =>
              new Upload({
                id,
                url,
                expiry,
                filename,
                status: 'Finished',
                store,
              })
          )
        );
      } else {
        reject(Error(xhr.statusText));
      }
    };
    xhr.onerror = () => {
      reject(Error('Network error'));
    };
    xhr.open('get', url, true);
    xhr.setRequestHeader('accept', '*/*');
    xhr.send();
  });
};

export default getFinishedUploads;
