// @flow

import React, { useEffect, useState } from 'react';
// import { computeTotal } from '../util/functions';
// import type { CartType } from '../util/datatypes';

type Props = {
}

const Cart = ({ }: Props) => {

  const PRODUCTS = [
    {
      name: 'Item 1',
      productSuffix: '',
      quantity: 10,
      addQuantity: 1,
      deleteQuantity: 1,
    },
    {
      name: 'Item 2',
      productSuffix: 'gr',
      quantity: 20,
      addQuantity: 10,
      deleteQuantity: 10,
    },
  ];

  return (
    <div className="cart">
      <span className="title">CART</span>
      <div className="content">
        {
          PRODUCTS.map(({
            name, productSuffix, quantity, addQuantity, deleteQuantity,
          }, idx) => (
            <div key={idx} className="cart-item">
              <span>{`${name}: ${quantity} ${productSuffix}`}</span>
              <div className="cart-item-actions">
                <div>
                  <button className="button-add button click" type="button">ADD</button>
                  <input type="text" className="input-text" />
                  {productSuffix}
                </div>
                <div>
                  <button className="button-delete button click" type="button">DELETE</button>
                  <input type="text" className="input-text" />
                  {productSuffix}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Cart;
