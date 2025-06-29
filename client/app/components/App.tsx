import React, { useState, useReducer } from 'react';
import Cart from './Cart.tsx';
import Config from './Config.tsx';
import Receipt from './Receipt.tsx';

import { initialState, reducer } from '../util/reducer.ts';
import { findProductByName } from '../util/functions.ts';

const App = () => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const [productName, setProductName] = useState('');

  const executeAction = () => {
    const foundProduct = findProductByName(store, productName);

    if (foundProduct) {
      dispatch({
        type: 'UPDATE_ITEM',
        product: foundProduct,
      });
    } else {
      dispatch({
        type: 'NEW_ITEM',
      });
    }
  };

  const {
    configOpen,
    products,
  } = store;

  return (
    <div className="app">
      <div className={configOpen ? 'hide' : 'app-config'}>
        SELECT ACTION:
        <select
          className="select-custom click"
          value={productName}
          onChange={({ target: { value } }) => { setProductName(value); }}
        >
          <option value="">CREATE NEW ITEM</option>
          {
            products.map(({ name }, idx) => (
              <option key={idx} value={name}>UPDATE: {name}</option>
            ))
          }
        </select>
        <button
          type="button"
          className="click button execute-action"
          onClick={executeAction}
        >
          EXECUTE
        </button>
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
