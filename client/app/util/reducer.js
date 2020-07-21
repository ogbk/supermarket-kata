// @flow

import type { StoreType } from './datatypes';
import { getItemCartIndexById, findProduct, updateCartQuantity } from './reducerHelper';

const initialState: StoreType = {
  'cart': [],
  'products': {
    'Heroes': [],
    'Sharps': [],
    'Polos': [],
  },
  'currentPage': 'PRODUCTS_LIST',
  'selectedProductId': '',
  'selectedProductType': '',
};

const reducer = (state: StoreType, action: any) => {
  switch (action.type) {
    case 'SET_PRODUCTS': {
      return {
        ...state,
        'products': action.newProducts,
      };
    }

    case 'SET_PAGE': {
      if (action.page !== 'PRODUCT') {
        return {
          ...state,
          'currentPage': action.page,
        };
      }
      return {
        ...state,
        'currentPage': action.page,
        'selectedProductId': action.productId,
        'selectedProductType': action.productType,
      };
    }

    case 'DELETE': {
      const newState = { ...state };
      const foundIndex = getItemCartIndexById(newState, action.productId);
      newState.cart.splice(foundIndex, 1);
      return newState;
    }

    case 'ADD': {
      const foundIndex = getItemCartIndexById(state, action.productId);
      if (foundIndex >= 0) {
        return (
          updateCartQuantity(state, foundIndex, action.quantity, true)
        );
      }

      const foundProduct = findProduct(state, action.productType, action.productId);
      const newState = { ...state };
      newState.cart.push({
        ...foundProduct,
        quantity: action.quantity,
      });

      return newState;
    }

    default: {
      return state;
    }
  }
};

export { initialState, reducer };
