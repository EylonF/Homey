const initialState = {
  stays: null,
  // sort: {
  //   type: 'byName',
  //   order: 1,
  // },
}

export function stayReducer(state = initialState, action) {
  let newState = state

  switch (action.type) {
    case 'SET_STAYS':
      console.log('action',action.stays)
      newState = { ...state, stays: [...action.stays] }
      break
    // case 'SET_SORT':
    //   const newOrder = (state.sort.type === action.sort.type) ? state.sort.order * -1 : state.sort.order
    //   newState = { ...state, sort: { ...action.sort , order: newOrder} }
    //   break
    default:
  }
  return newState
}
