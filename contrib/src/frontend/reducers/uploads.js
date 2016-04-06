import * as types from '../constants/ActionTypes'

const initialState = {
  finishedUploads: [],
  uploads: []
}

export default function search (state = initialState, action) {
  switch (action.type) {
    case types.UPLOAD_ERROR:
      return {
        ...state,
        uploads: state.uploads.filter(upload => upload.id !== action.payload.id)
      }
    case types.UPLOAD_PROGRESS:
      return {
        ...state,
        uploads: state.uploads.map(upload => {
          return upload.id === action.payload.id ? { ...upload, progress: action.payload.progress } : upload
        })
      }
    case types.UPLOAD_STARTED:
      return {
        ...state,
        uploads: [ ...state.uploads, { id: action.payload.id, file: action.payload.file, progress: 0 } ]
      }
    case types.UPLOAD_SUCCESS:
      return {
        ...state,
        uploads: state.uploads.filter(upload => upload.id !== action.payload.id),
        finishedUploads: [ action.payload.response, ...state.finishedUploads ]
      }
    case types.RECEIVE_FINISHED_UPLOADS:
      return {
        ...state,
        finishedUploads: action.payload.finishedUploads
      }
    default:
      return state
  }
}
