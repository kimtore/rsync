import * as types from '../constants/ActionTypes'

const initialState = []

export default function finishedUploads(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_FINISHED_UPLOADS:
      return action.payload.finishedUploads
    case types.UPLOAD_SUCCESS:
      return [action.payload.finishedUpload, ...state]
    case types.UPLOAD_DELETED:
      return state.filter(
        finishedUpload => finishedUpload.id !== action.payload.id
      )
    default:
      return state
  }
}
