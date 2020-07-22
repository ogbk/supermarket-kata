// @flow

import React from 'react';
import { getOnlyNumber } from '../util/functions';
import type { StoreType } from '../util/datatypes';

type Props = {
  store: StoreType,
  dispatch: any,
}

const Cart = ({ store, dispatch }: Props) => {
  const handleChange = (value: string, index: number, field: string) => {
    const newValue = getOnlyNumber(value);
    const newStore = JSON.parse(JSON.stringify(store));
    newStore.products[index].tempData[field] = newValue;

    dispatch({
      type: 'SET_PRODUCTS',
      products: newStore.products,
    });
  };

  // increase = true(add) | false(subtract)
  const executeChange = (index: number, field: string, increase: boolean) => {
    const { products } = store;
    const newProds = [...(store.products)];

    if (increase) {
      newProds[index].quantity += products[index].tempData.addQuantity;
    } else {
      newProds[index].quantity -= products[index].tempData.deleteQuantity;
    }

    dispatch({
      type: 'SET_PRODUCTS_CART',
      products: newProds,
      productIndex: index,
    });
  };

  const { products } = store;

  return (
    <div className="cart">
      <span className="title">CART</span>
      <div className="content">
        {
          products.map((thisProduct, idx) => {
            const {
              name, suffix, quantity, tempData: { addQuantity, deleteQuantity },
            } = thisProduct;

            return (
              <div key={idx} className="cart-item">
                <span>{`${name}: ${quantity} ${suffix}`}</span>
                <div className="cart-item-actions">
                  <div>
                    <button
                      className="button-add button click"
                      type="button"
                      onClick={() => { executeChange(idx, 'addQuantity', true); }}
                    >ADD
                    </button>
                    <input
                      type="text"
                      className="input-text"
                      value={addQuantity}
                      onChange={({ target: { value } }) => { handleChange(value, idx, 'addQuantity'); }}
                    />
                    {suffix}
                  </div>
                  <div>
                    <button
                      className={
                        deleteQuantity > quantity ? 'button-delete button ' : 'button-delete button click'
                      }
                      type="button"
                      onClick={() => {
                        if (deleteQuantity <= quantity) {
                          executeChange(idx, 'deleteQuantity', false);
                        }
                      }}
                    >DELETE
                    </button>
                    <input
                      type="text"
                      className={
                        deleteQuantity > quantity ? 'input-error ' : 'input-text'
                      }
                      value={deleteQuantity}
                      onChange={({ target: { value } }) => { handleChange(value, idx, 'deleteQuantity'); }}
                    />
                    {suffix}
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Cart;
