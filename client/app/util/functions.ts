import type { ItemType, StoreType } from './datatypes.ts';

const getOnlyNumber = (value: string) => (
  Number(value) || 0
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

const rounded_two = (x: number) => {
  const fraction = (x - Math.trunc(x)) * 10;
  const rounded = (Math.trunc(fraction * 10));
  const ris = `${Math.trunc(x)}.${rounded}`;

  return (Number(ris));
};

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
  dMethod: string, dBuy: number, dPay: number, normalPrice: number,
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
    products[index] = {
      ...products[index],
      'savings': 0,
      'actualPrice': fullPrice,
    };

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
    actualPrice: (reducedPrice + remainingPrice),
    savings: fullPrice - (reducedPrice + remainingPrice),
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
  rounded_two,
};
