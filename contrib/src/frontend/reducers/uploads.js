import * as types from '../constants/ActionTypes'

const initialState = []

export default function uploads(state = initialState, action) {
  switch (action.type) {
    case types.UPLOAD_PROGRESS:
      return state.map(
        upload =>
          upload.id === action.payload.id
            ? {
                ...upload,
                progress: action.payload.progress
              }
            : upload
      )
    case types.UPLOAD_STARTED:
      return [
        ...state,
        {
          id: action.payload.id,
          file: action.payload.file,
          progress: 0,
          status: 'Uploading'
        }
      ]
    case types.UPLOAD_SUCCESS:
      return state.filter(upload => upload.id !== action.payload.id)
    case types.UPLOAD_ERROR:
      return changeUploadStatus(state, action.payload.id, 'Error')
    case types.ABORT_UPLOAD:
      return changeUploadStatus(state, action.payload.id, 'Aborting')
    case types.UPLOAD_ABORTED:
      return changeUploadStatus(state, action.payload.id, 'Aborted')
    case types.REMOVE_UPLOAD:
      return state.filter(upload => upload.id !== action.payload.id)
    default:
      return state
  }
}

function changeUploadStatus(uploads, id, status) {
  return uploads.map(upload => {
    if (upload.id === id) {
      return {
        ...upload,
        status: status
      }
    } else {
      return upload
    }
  })
}
