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

const discountValidity = (
  dMethod, dBuy, dPay, normalPrice,
) => {
  if (dMethod === 'DISCOUNT_PER_FRACTION') {
    return (dBuy > dPay);
  }
  return ((dPay / dBuy) < normalPrice);
};

const computeCart = (store: StoreType, products: Array<ItemType>, index: number) => {
  const thisProduct = products[index];

  const {
    price, quantity, hasDiscount,
    discountDetails: { discountMethod, discountBuy, discountPay },
  } = thisProduct;

  const fullPrice = price * quantity;
  products[index].fullPrice = fullPrice;

  if (hasDiscount === 'false') {
    return {
      ...store,
      'products': products,
    };
  }

  const remainingQuantity = quantity % discountBuy;
  const remainingPrice = remainingQuantity * price;
  const discountQuantity = quantity - remainingQuantity;
  let reducedPrice = ((discountQuantity * discountPay) / discountBuy);

  if (discountMethod === 'DISCOUNT_PER_FRACTION') {
    reducedPrice *= price;
  }

  products[index] = {
    ...products[index],
    'discountDetails': {
      ...(products[index].discountDetails),
      remainingQuantity,
      remainingPrice,
      discountQuantity,
      reducedPrice,
    },
  };

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
  discountValidity,
  computeCart,
};
