import { userService } from '../services/user.service'

const initialState = {
  loggedinUser: null,
  users:null
}

export function userReducer(state = initialState, action) {
  let newState = state

  switch (action.type) {
    case 'SET_USER':
      newState = { ...state, loggedinUser: action.user }
      break
    case 'SET_USERS':
      newState = { ...state, users: action.users }
      break
    default:
      break
  }

  return newState
}
