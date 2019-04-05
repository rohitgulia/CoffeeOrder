import {combineReducers} from 'redux';
import {orderListReducer} from '../orderList/orderListReducer';

const rootReducer = combineReducers ({
    orderList: orderListReducer
})

export default rootReducer