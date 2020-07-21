import type { CartType } from './datatypes';

const computeTotal = (cart: CartType) => {
  let ris = 0;
  cart.forEach(({ quantity, price }) => {
    ris += (quantity * price);
  });

  return (ris);
};

export { computeTotal };
