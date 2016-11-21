import * as types from '../constants/ActionTypes'

export function startDragOver () {
  return (dispatch, getState) => {
    if (!getState().dragOver) {
      dispatch({
        type: types.DRAGOVER_STARTED
      })
    }
  }
}

export function endDragOver () {
  return (dispatch, getState) => {
    if (getState().dragOver) {
      dispatch({
        type: types.DRAGOVER_ENDED
      })
    }
  }
}
