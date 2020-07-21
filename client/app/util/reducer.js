// @flow

import type { StoreType } from './datatypes';
import { getItemCartIndexById, findProduct, updateCartQuantity } from './reducerHelper';

const defaultDiscount: DiscountType = {
  discountMethod: 'DISCOUNT_PER_FRACTION',
  discountBuy: 2,
  discountPay: 1,
  discountQuantity: 0,
  reducedPrice: 0,
  remainingQuantity: 0,
  remainingPrice: 0,
}

const defaultItem: ItemType = {
  id: '',
  name: '',
  suffix: '',
  quantity: 1,
  price: 1,
  pricingMethod: 'PRICE_PER_ITEM',
  hasDiscount: true,
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
  configOpen: true,
};

const reducer = (state: StoreType, action: any) => {
  switch (action.type) {
    case 'OPEN_CONFIG': {
      return {
        ...state,
        'configOpen': true,
      };
    }

    case 'CLOSE_CONFIG': {
      return {
        ...state,
        'configOpen': false,
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, reducer };
