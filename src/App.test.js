import React from 'react';
import OrderList from '../src/components/orderList/OrderList';
import App from '../src/App';
import { expect } from 'chai';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(OrderList)).to.have.length(1);
});
