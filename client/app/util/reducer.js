// @flow

import type { DiscountType, ItemType, StoreType } from './datatypes';
import { getOnlyNumber, updateProductByName, computeCart } from '../util/functions';

const defaultDiscount: DiscountType = {
  discountMethod: 'DISCOUNT_PER_FRACTION',
  discountBuy: 1,
  discountPay: 1,
  discountQuantity: 0,
  reducedPrice: 0,
  remainingQuantity: 0,
  remainingPrice: 0,
};

const defaultItem: ItemType = {
  name: '',
  suffix: 'item',
  quantity: 1,
  price: 1,
  pricingMethod: 'PRICE_PER_ITEM',
  hasDiscount: 'true',
  discountDetails: defaultDiscount,
  fullPrice: 0,
  actualPrice: 0,
  savings: 0,
  tempData: {
    addQuantity: 1,
    deleteQuantity: 1,
  },
};

const initialState = {
  products: [],
  configOpen: false,
  configNew: false,
  currentProduct: defaultItem,
};

const reducer = (state: StoreType, action: any) => {
  switch (action.type) {
    case 'NEW_ITEM': {
      return {
        ...state,
        'configOpen': true,
        'configNew': true,
      };
    }

    case 'UPDATE_ITEM': {
      return {
        ...state,
        'configOpen': true,
        'configNew': false,
        'currentProduct': action.product,
      };
    }

    case 'ABORT_CONFIG': {
      return {
        ...state,
        'configOpen': false,
      };
    }

    case 'SAVE_NEW': {
      return {
        ...state,
        products: [
          ...state.products,
          action.product,
        ],
        'configOpen': false,
      };
    }

    case 'SAVE_UPDATED': {
      const updatedStore = updateProductByName(state, action.product);
      return {
        ...updatedStore,
        'configOpen': false,
        'currentProduct': action.product,
      };
    }

    case 'SET_PRODUCTS': {
      return {
        ...state,
        'products': action.products,
      };
    }
    case 'SET_PRODUCTS_CART': {
      return computeCart(state, action.products, action.productIndex);
    }

    default: {
      return state;
    }
  }
};

export { initialState, reducer, defaultItem };
