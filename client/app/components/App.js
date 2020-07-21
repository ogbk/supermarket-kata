// @flow

import React, { useState, useEffect, useReducer } from 'react';
import Cart from './Cart';
import Config from './Config';
import Receipt from './Receipt';

import type { DiscountType, ItemType, ProductsType } from '../util/datatypes';
import { initialState, reducer } from '../util/reducer';

const App = () => {
  const [store, dispatch] = useReducer(reducer, initialState);

  const {
    configOpen,
  } = store;

  return (
    <div className="app">
      <div className={configOpen ? 'hide' : 'app-config'}>
        ACTION:
        <select className="select-custom click" value="123456">
          <option value="11">CREATE NEW ITEM</option>
          <option value="11">UPDATE - 11</option>
          <option value="12">UPDATE - 22</option>
          <option value="13">UPDATE - 33</option>
        </select>
      </div>
      <div className="app-view">
        {
          configOpen
            ? <Config store={store} dispatch={dispatch} />
            : <Cart store={store} dispatch={dispatch} />
        }
        <Receipt store={store} />
      </div>
    </div>
  );
};

export default App;
