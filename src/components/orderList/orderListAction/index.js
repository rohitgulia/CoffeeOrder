import blueBottleApi from '../../api/coffeeOrder';


export const getOrderList = () => {
    return async function(dispatch, getState) {
        // make api call
        // const result = await blueBottleApi.get('/listOfOrders').then(
        //     res => {
        //      return res;
        //     }).catch(error => {throw error});

        let result = [
            {
                "coffeeName": 'bellaDonovan',
                "brewMethod": 'coldBrew',
                "shipDate": '2019-12-10',
                "numberOfCases": '4',
                "packetsPerCase": '25',
                "notes": 'take care please',
                "priority": 'true',
                "orderId": '1',
            },
            {
                "coffeeName": 'giantSteps',
                "brewMethod": 'frenchPress',
                "shipDate": '2019-12-20',
                "numberOfCases": '5',
                "packetsPerCase": '50',
                "orderId": '2'
            }
        ];
        dispatch({type:"UPDATE_ORDER_LIST", orderList: result});
    }
}

export const submitOrderDetails = (orderDetails) => {
    return async function (dispatch, getState) {
        // make api call
        // const result = await blueBottleApi.post('/newOrder', orderDetails).then(
        //     res => {
        //         return res;
        //     }).catch( error => {throw error});

        let result = [
            {
                "coffeeName": 'bellaDonovan',
                "brewMethod": 'coldBrew',
                "shipDate": '2019-12-10',
                "numberOfCases": '4',
                "packetsPerCase": '25',
                "notes": 'take care please',
                "priority": 'true',
                "orderId": '1'
            },
            {
                "coffeeName": 'giantSteps',
                "brewMethod": 'frenchPress',
                "shipDate": '2019-12-20',
                "numberOfCases": '6',
                "packetsPerCase": '50',
                "orderId": '2'
            },
            {
                "coffeeName": 'bellaDonovan',
                "brewMethod": 'pourOver',
                "shipDate": '2019-11-10',
                "numberOfCases": '4',
                "packetsPerCase": '25',
                "priority": 'true',
                "orderId": '3'
            }
        ];

        dispatch({type:"UPDATE_ORDER_LIST", orderList: result});

    }
}