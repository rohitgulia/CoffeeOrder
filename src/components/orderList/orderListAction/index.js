import blueBottleApi from '../../api/coffeeOrder';


export const getOrderList = () => {
    return async function(dispatch, getState) {
        // make api call
        const result = await blueBottleApi.get('/orders/orderList').then(
            res => {
             return res;
            }).catch(error => {throw error});
        dispatch({type:"GET_ORDER_LIST", orderList: result.data});
    }
}

export const submitOrderDetails = (orderDetails) => {
    return async function (dispatch, getState) {
        const errorObj = {"error":"Failed"};
        //make api call
        if(orderDetails.orderId) {
            const result = await blueBottleApi.put('/orders/updateOrder', orderDetails).then(
                res => {
                    return res;
                }).catch( error => {throw error});
            if(result.data.result === "success")
                dispatch({type:"MODIFY_ORDER", orderDetails});
            else
                throw errorObj;

        } else {
            const result = await blueBottleApi.post('/orders/addOrder', orderDetails).then(
                res => {
                    return res;
                }).catch( error => {throw error});
            if(result.data.result !== "error") {
                const newOrderDtls = result.data.result;
                dispatch({type:"ADD_ORDER", orderDetails:newOrderDtls});
            }
            else
                throw errorObj;
        }

    }
}