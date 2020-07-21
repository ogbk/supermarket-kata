// @flow

import React, { useState, useEffect, useReducer } from 'react';
import Cart from './Cart';
import Config from './Config';
import Receipt from './Receipt';

// import { initialState, reducer } from '../util/reducer';
// import type { ProductTypes_temp } from '../util/datatypes';

const App = () => {
  const [configOpen, setConfigOpen] = useState(false);
  // const NO_ERROR: string = '';

  // const [store, dispatch] = useReducer(reducer, initialState);



/*
  const {
    products,
    cart,
    currentPage,
    selectedProductId,
    selectedProductType,
  } = store;
*/

  return (
    <div className="app">
      <div className="app-config">
        ACTION:
        <select className="click" value="123456">
          <option value="11">CREATE NEW ITEM</option>
          <option value="11">UPDATE - 11</option>
          <option value="12">UPDATE - 22</option>
          <option value="13">UPDATE - 33</option>
        </select>
      </div>
      <div className="app-view">
        {configOpen
          ? <Config />
          : <Cart />
        }
        <Receipt />
      </div>
    </div>
  );
};

export default App;
