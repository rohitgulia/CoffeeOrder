
export const orderListReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_ORDER_LIST":
            return action.orderList;
        case "MODIFY_ORDER":
            return state.map(order => order.orderId === action.orderDetails.orderId ? action.orderDetails : order);
        case "ADD_ORDER":
            return [...state, action.orderDetails];
        default:
            return state;
    }
}