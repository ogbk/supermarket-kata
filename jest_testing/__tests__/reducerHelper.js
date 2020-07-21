/* eslint-disable */

import { getItemCartIndexById, findProduct, updateCartQuantity } from '../../client/app/util/reducerHelper';

describe('reducerHelper functions', () => {

  test('getItemCartIndexById -> fetch index of item in cart', () => {
    const idx1 = '1234';
    const idx2 = '2345';
    const idx3 = '3456';
    const idx4 = '4567';

    const store = {
      products: {},
      cart: [
        {id: idx1, price: 12, quantity: 10},
        {id: idx2, price: 12, quantity: 11},
        {id: idx3, price: 12, quantity: 12},
      ]
    };

    const found1 = getItemCartIndexById(store, idx1);
    const found2 = getItemCartIndexById(store, idx2);
    const found3 = getItemCartIndexById(store, idx3);
    const notFound = getItemCartIndexById(store, idx4);

    expect(found1).toBe(0);
    expect(found2).toBe(1);
    expect(found3).toBe(2);
    expect(notFound).toBe(-1);
    
  });

  test('findProduct -> find a product ', () => {

    const store = {
      products: {
        'typeA': [
          {id: 'A1', price: 12},
          {id: 'A2', price: 12},
        ],
        'typeB': [
          {id: 'B1', price: 12},
          {id: 'B2', price: 12},
        ],
      },
      cart: []
    };

    expect(findProduct(store, 'typeA', 'A2')).toEqual ({id: 'A2', price: 12});
    expect(findProduct(store, 'typeB', 'B1')).toEqual ({id: 'B1', price: 12});
    expect(findProduct(store, 'typeA', 'B1')).toEqual (undefined);
    expect(findProduct(store, 'typeA', 'B1')).not.toBeDefined;

  });

  test('updateCartQuantity -> add / subtract product quantity', () => {
    
    const store1 = {
      products: {},
      cart: [
        {id: '111', price: 12, quantity: 10},
        {id: '222', price: 12, quantity: 11},
      ]
    };
    const ADD_THREE = updateCartQuantity(store1, 0, 3, true); // augment quantity at index[0] by 3
    expect (ADD_THREE).toEqual({
      products: {},
      cart: [
        {id: '111', price: 12, quantity: 13},
        {id: '222', price: 12, quantity: 11},
      ]  
    });


    const store2 = {
      products: {},
      cart: [
        {id: '222', price: 12, quantity: 11},
        {id: '333', price: 12, quantity: 18},
      ]
    };
    
    const SUBTRACT_FOUR = updateCartQuantity(store2, 1, 4, false); // decrease quantity at index[1] by 4
    expect (SUBTRACT_FOUR).toEqual({
      products: {},
      cart: [
        {id: '222', price: 12, quantity: 11},
        {id: '333', price: 12, quantity: 14},
      ]  
    });

  });

})

