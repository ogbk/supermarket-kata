// @flow

import React from 'react';
import type { StoreType } from '../util/datatypes';

type Props = {
  store: StoreType,
}

const Receipt = ({ store }: Props) => {
  const { products } = store;
  let subTotal = 0;
  let totalSavings = 0;
  let totalToPay = 0;

  products.forEach((thisProduct) => {
    const { fullPrice, savings } = thisProduct;
    subTotal += fullPrice;
    if (savings > 0) {
      totalSavings += savings;
    }
  });
  totalToPay = subTotal - totalSavings;

  const value = `
  Subtotal -------- ${subTotal}

  Total savings --- ${totalSavings}

  Total to pay ---- ${totalToPay}
  `;

  return (
    <div className="receipt">
      <span className="title">RECEIPT</span>
      <div className="content">
        <textarea
          readOnly
          value={value}
        />
      </div>
    </div>
  );
};

export default Receipt;
