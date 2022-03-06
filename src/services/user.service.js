import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_LOGIN, SOCKET_EMIT_LOGOUT } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
}

// To help debugging from console
window.userService = userService


function getUsers() {
    return storageService.query('userDB')
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    // gWatchedUser = user;
    return user;
}
function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(userCred) {
    const user = await storageService.put('userDB', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(userCred) {
    const users = await storageService.query('userDB')
    const user = users.find(user => user.username === userCred.username && user.password === userCred.password)
    return _saveLocalUser(user)
    
    // const user = await httpService.post('auth/login', userCred)
    // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
    // if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    // userCred.score = 10000;
    const user = await storageService.post('userDB', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
    return _saveLocalUser(user)
}
async function logout() {
    localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.emit(SOCKET_EMIT_LOGOUT);
    // return await httpService.post('auth/logout')
}


function _saveLocalUser(user) {
    localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null)
}


