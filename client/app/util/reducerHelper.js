// @flow

import type { StoreType } from './datatypes';

// retrieve index of item in [ store.cart ] using id provided
const getItemCartIndexById = (store: StoreType, givenId: string) => (
  store.cart.findIndex(({ id }) => (id === givenId))
);

// retrieve product using given productType and id
const findProduct = (store: StoreType, givenType: string, givenId: string) => (
  store.products[givenType].find(
    ({ id }) => (id === givenId),
  )
);

// add | subtract item count in cart using given cart[index]
// increase: [add: true, subtract: false]
const updateCartQuantity = (
  store: StoreType, givenIndex: number, updateBy: number, increase: boolean,
) => {
  const newStore = { ...store };

  if (increase) {
    newStore.cart[givenIndex].quantity += updateBy;
  } else {
    newStore.cart[givenIndex].quantity -= updateBy;
  }

  return newStore;
};

export { getItemCartIndexById, findProduct, updateCartQuantity };
