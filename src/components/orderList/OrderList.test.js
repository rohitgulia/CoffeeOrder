import React from 'react';
import OrderList from './OrderList';
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
it("renders order details component", () => {
    const wrapper = shallow(
    <Provider store={store}>
        <OrderList />
    </Provider>
    );
    expect(wrapper.find(OrderList)).to.have.length(1);
});

it("renders dateMonth details", () => {
    const wrapper = shallow(<OrderList />);
    expect(wrapper.find('.currentDateMonth')).to.have.length(1);
});

    it('passes dialog open prop to the order details', ()=> {
        const wrapper = shallow(<OrderList />);
        wrapper.setState({openDialog:false});
        wrapper.setState({orderDetailObj: orderDetailObj});
        wrapper.find('button').simulate('click');
        expect(wrapper.find(OrderDetails)).to.have.length(1);
    })
});