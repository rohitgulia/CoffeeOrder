import React from 'react';
import {OrderListOrig} from './OrderList';
import OrderDetails from '../orderDetails/OrderDetails';
import { expect } from 'chai';
import { mount, render, shallow, configure} from 'enzyme';
import configureMockStore from "redux-mock-store";
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import {orderDetailObj} from "../orderDetails/util/orderDetailObj";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({orderList:[]});

describe('Order list component', ()=> {
it("renders Order list component", () => {
    const wrapper = mount(<Provider store={store}>
            <OrderListOrig />
        </Provider>
    );
    expect(wrapper.find(OrderListOrig)).to.have.length(1);
});

it("renders header details with date, title and a button", () => {
    const wrapper = mount(<Provider store={store}><OrderListOrig /></Provider>);
    expect(wrapper.find('.appHeader')).to.have.length(3);
});

it('should pass openDialog prop to orderDetails component when clicking on createNewOrder button', ()=> {
        let wrapper = mount(<Provider store={store}><OrderListOrig /></Provider>);
        let orderDetails = wrapper.find(OrderDetails);
        expect(orderDetails.props().openDialog).to.equal(false);
        wrapper.find('button.createNewOrder').simulate('click');
        orderDetails = wrapper.find(OrderDetails);
        expect(orderDetails.props().openDialog).to.equal(true);
});

it('should pass openDialog prop to orderDetails component when clicking on view icon to view order', ()=>{
    const orderListData = [
        {
            "coffeeName": 'coldBrew',
            "brewMethod": 'bellaDonovan',
            "shipDate": '2019-12-10',
            "numberOfCases": 4,
            "packetsPerCase": 25,
            "notes": '',
            "priority": false,
            "orderId": 1
        }
    ]
    const wrapper = mount(<Provider store={store}><OrderListOrig orderList={orderListData} /> </Provider>);
    let orderDetailsComp = wrapper.find(OrderDetails);
    expect(orderDetailsComp.props().openDialog).to.equal(false);
    wrapper.find('.viewOrder').at(0).simulate('click');
    orderDetailsComp = wrapper.find(OrderDetails);
    expect(orderDetailsComp.props().openDialog).to.equal(true);
    debugger;
    expect(orderDetailsComp.props().orderDetails).to.deep.equal(orderListData[0]);
});

});