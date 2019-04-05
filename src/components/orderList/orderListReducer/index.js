
export const orderListReducer = (state = [], action) => {
    switch (action.type) {
        case "UPDATE_ORDER_LIST":
            return action.orderList;
        default:
            return state;
    }
}