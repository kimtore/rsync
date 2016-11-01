import * as types from '../constants/ActionTypes'

const initialState = []

export default function uploads (state = initialState, action) {
  switch (action.type) {
    case types.UPLOAD_ERROR:
      return state.filter(upload => upload.id !== action.payload.id)
    case types.UPLOAD_PROGRESS:
      return state.map(upload => upload.id === action.payload.id ? {
        ...upload,
        progress: action.payload.progress
      } : upload)
    case types.UPLOAD_STARTED:
      return [ ...state, { id: action.payload.id, file: action.payload.file, progress: 0 } ]
    case types.UPLOAD_SUCCESS:
      return state.filter(upload => upload.id !== action.payload.id)
    default:
      return state
  }
}
