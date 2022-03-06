import { userService } from '../services/user.service.js'

export function loadUsers() {
  return async dispatch => {
    try {
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
      // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) =>{
      //   dispatch({ type: 'ADD_REVIEW', review })
      // })

    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err)
    }
  }
}

export function signup(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(credentials)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.error('ERR',err)
    }
  }
}

export function login(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.login(credentials)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.error(err)
    }
  }
}
export function userUpdate(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.update(credentials)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.error(err)
    }
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout()
      dispatch({ type: 'SET_USER', user: null })
    } catch (err) {
      console.error(err)
    }
  }
}
