import React, { Component } from 'react';
import './App.css';
import OrderList from './components/orderList/OrderList';
import { Header, Image } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="ui container">
          <Header as='h4'>
              <Image circular src='/images/bluebottle.png' /> Blue Bottle Coffee
          </Header>
        <OrderList />
      </div>
    );
  }
}

export default App;
