import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_LOGIN, SOCKET_EMIT_LOGOUT } from './socket.service'
const STORAGE_KEY_ORDER = 'order'
var gWatchedUser = null;

export const orderService = {

    getOrders,
    getById,
    remove,
    update,
    add
    
}

// To help debugging from console
window.orderService = orderService


function getOrders() {
    return storageService.query('orderDB')
    // return httpService.get(`order`)
}

async function getById(orderId) {
    const order = await storageService.get('orderDB', orderId)
    // const order = await httpService.get(`order/${orderId}`)
    // gWatchedUser = user;
    return order;
}
function remove(orderId) {
    return storageService.remove('orderDB', orderId)
    // return httpService.delete(`order/${orderId}`)
}

async function update(orderCred) {
    // userCred.score = 10000;
    const order = await storageService.put('orderDB', orderCred)
    // const user = await httpService.put('order/signup', orderCred)
    // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
    // if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return order;
}

async function add(orderCred) {
    // userCred.score = 10000;
    const order = await storageService.post('orderDB', orderCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
    return order
}