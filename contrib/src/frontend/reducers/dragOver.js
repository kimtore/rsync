import * as types from '../constants/ActionTypes'

const initialState = false

export default function dragOver (state = initialState, action) {
  switch (action.type) {
    case types.DRAGOVER_STARTED:
      return true
    case types.DRAGOVER_ENDED:
      return false
    default:
      return state
  }
}
