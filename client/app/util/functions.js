// @flow

import type { DiscountType, ItemType, ProductsType, StoreType } from './datatypes';

const getOnlyNumber = (value) => (
  Number(value.replace(/[^0-9+]/g, ''))
);

const findProductByName = ({ products }: StoreType, productName: string) => (
  products.find(({ name }) => (name === productName))
);

const getProductIndex = ({ products }: StoreType, productName: string) => (
  products.findIndex(({ name }) => (name === productName))
);

const productExists = ({ products }: StoreType, productName: string) => (
  products.some(({ name }) => (name === productName))
);

const updateProductByName = (store: StoreType, newProduct: ItemType) => {
  const index = getProductIndex(store, newProduct.name);
  const products = [...(store.products)];
  products.splice(index, 1, newProduct);

  return {
    ...store,
    'products': products,
  };
};

export {
  getOnlyNumber,
  findProductByName,
  getProductIndex,
  productExists,
  updateProductByName,
};
