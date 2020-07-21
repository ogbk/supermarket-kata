// @flow

import React, { useState, useEffect, useReducer } from 'react';
import ProductList from './ProductList';
import Product from './Product';
import Cart from './Cart';
import Header from './Header';
import Loading from './Loading';
import FetchError from './FetchError';

import { query, groupProductsByType } from '../util/graphHelper';
import { initialState, reducer } from '../util/reducer';
// $FlowFixMe
import { API_TOKEN, API_URL } from '../../../.env.js'; // eslint-disable-line
import type { ProductTypes_temp } from '../util/datatypes';

const App = () => {
  const NO_ERROR: string = '';

  const [fetchError, setFetchError]: [string, any] = useState(NO_ERROR);
  const [loading, setLoading]: [boolean, any] = useState(true);
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () => {
      const fetchProducts = async () => {
        try {
          const res = await fetch(
            API_URL,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': API_TOKEN,
              },
              body: JSON.stringify({ query }),
            },
          );
          setLoading(false);

          if (res.ok && res.status === 200) {
            setFetchError(NO_ERROR);

            const json = await res.json();
            const { Heroes, Polo: Polos, Sharps }: ProductTypes_temp = groupProductsByType(
              json.data.products.edges.map(({ node }) => node),
              ['Heroes', 'Sharps', 'Polo'],
            );
            dispatch({
              type: 'SET_PRODUCTS',
              newProducts: { Heroes, Polos, Sharps },
            });
          } else {
            setFetchError('Server issue');
          }
        } catch (err) {
          setLoading(false);
          setFetchError(err);
        }
      };
      fetchProducts();
    },
    [],
  );

  if (loading) {
    return (<Loading />);
  }

  if (fetchError) {
    return (<FetchError error={fetchError} />);
  }

  const {
    products,
    cart,
    currentPage,
    selectedProductId,
    selectedProductType,
  } = store;

  return (
    <div className="app">
      <Header currentPage={currentPage} dispatch={dispatch} />
      {currentPage === 'PRODUCTS_LIST' && <ProductList products={products} dispatch={dispatch} /> }
      {currentPage === 'CART' && <Cart cart={cart} dispatch={dispatch} /> }
      {currentPage === 'PRODUCT' && (
        <Product
          products={products} id={selectedProductId} type={selectedProductType} dispatch={dispatch}
        />
      ) }
    </div>
  );
};

export default App;
