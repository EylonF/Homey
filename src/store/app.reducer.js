const initialState = {
  isFullHeader: false,
  currPage: '',
  isHomePageTop:true

}

export function appReducer(state = initialState, action) {
  let newState = state
  switch (action.type) {
    case 'SET_HEADER_SIZE':
      newState = { ...state, isFullHeader: action.isFullHeader }
      break
    case 'SET_PAGE':
      newState = { ...state, currPage: action.page }
      break
    case 'SET_APP_STATE':
      newState = { ...state, 
        currPage: action.currPage || state.currPage, 
        isFullHeader: (typeof action.isFullHeader === 'boolean') ? action.isFullHeader : state.isFullHeader,
        isHomePageTop: (typeof action.isHomePageTop  === 'boolean') ? action.isHomePageTop : state.isHomePageTop,
      }
      break
    
    default:
  }
  return newState
}
