import { orderService } from '../services/order.service.js'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service'


export function loadOrders() {
    return async dispatch => {
        try {
            const orders = await orderService.query()
            dispatch({ type: 'SET_ORDERS', orders })
            // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) =>{
            //   dispatch({ type: 'ADD_REVIEW', review })
            // })

        } catch (err) {
            console.log('OrderActions: err in loadOrders', err)
        }
    }
}

export function addOrder(order) {
    return async dispatch => {
        try {
            const addedOrder = await orderService.add(order)
            dispatch({ type: 'ADD_ORDER', order: addedOrder })

        } catch (err) {
            console.log('OrderActions: err in addOrder', err)
        }
    }
}

export function removeOrder(orderId) {
    return async dispatch => {
        try {
            await orderService.remove(orderId)
            dispatch({ type: 'REMOVE_ORDER', orderId })
        } catch (err) {
            console.log('OrderActions: err in removeOrder', err)
        }
    }
}

export function orderUpdate(credentials) {
    return async (dispatch) => {
        try {
            const order = await orderService.update(credentials)
            dispatch({ type: 'UPDATE_ORDER', order })
        } catch (err) {
            console.error(err)
        }
    }
}

export function getOrder(orderId) {
    return async dispatch => {
        try {
            await orderService.get(orderId)
            dispatch({ type: 'SET_ORDER', orderId })
        } catch (err) {
            console.log('OrderActions: err in getOrder', err)
        }
    }
}