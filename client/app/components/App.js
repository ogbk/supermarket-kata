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
      {configOpen
        ? <Config/>
        : <Cart/>
      }
      <Receipt/>
    </div>
  );
};

export default App;
