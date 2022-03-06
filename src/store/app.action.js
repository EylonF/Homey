
export function setHeaderSize(isFullHeader) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_HEADER_SIZE', isFullHeader })
    } catch (err) {
      console.error(err)
    }
  }
}

export function setCurrPage(page) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_PAGE', page })
    } catch (err) {
      console.error(err)
    }
  }
}

export function setAppState(state) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_APP_STATE', ...state })
    } catch (err) {
      console.error(err)
    }
  }
}