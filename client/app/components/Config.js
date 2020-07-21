// @flow

import React, { useEffect, useState } from 'react';
// import { computeTotal } from '../util/functions';
// import type { CartType } from '../util/datatypes';

type Props = {
}

const Config = ({ }: Props) => {
  const [pricingMethod, setPricingMethod] = useState('PRICE_PER_ITEM');
  const [suffix, setSuffix] = useState('item');
  const [hasDiscount, setHasDiscount] = useState('true');
  const [discountMethod, setDiscountMethod] = useState('DISCOUNT_PER_FRACTION');

  const [discountBuy, setDiscountBuy] = useState(1);
  const [discountPay, setDiscountPay] = useState(1);

  return (
    <div className="config">
      <span className="title">CONFIG</span>
      <div className="content">
        <span>PRODUCT NAME:</span>
        <input type="text" className="input-text config-field" /><br /><br />
        <span>PRICING METHOD:</span>
        <select
          value={pricingMethod}
          className="select-custom click config-select config-field"
          onChange={(evt) => {
            setPricingMethod(evt.target.value);
            setSuffix(
              evt.target.value === 'PRICE_PER_ITEM' ? 'item' : 'gr',
            );
          }}
        >
          <option value="PRICE_PER_ITEM">PRICE PER ITEM</option>
          <option value="PRICE_PER_WEIGHT">PRICE PER WEIGHT</option>
        </select><br /><br />
        <span>PRICE:</span>
        <input type="text" className="input-text config-field" /><span>/{suffix}</span>
        <br /><br /><br /><br />

        <span>DISCOUNT:</span>
        <select
          value={hasDiscount}
          className="select-custom click config-select config-field"
          onChange={(evt) => { setHasDiscount(evt.target.value); }}
        >
          <option value="false">NO</option>
          <option value="true">YES</option>
        </select><br /><br />

        { hasDiscount === 'true' && (
          <div className="discount-optional">
            <span>DISCOUNT METHOD:</span>
            <select
              value={discountMethod}
              className="select-custom click config-select config-field"
              onChange={(evt) => { setDiscountMethod(evt.target.value); }}
            >
              <option value="DISCOUNT_PER_FRACTION">DISCOUNT PER FRACTION</option>
              <option value="DISCOUNT_PER_QUANTITY">DISCOUNT PER QUANTITY</option>
            </select>
            <br /><br />

            <span>DISCOUNT BUY QUANTITY:</span>
            <input
              type="text"
              value={discountBuy}
              className="input-text config-field"
              onChange={(evt) => { setDiscountBuy(evt.target.value); }}
            />
            {suffix === 'gr' && suffix}<br /><br />

            <span>DISCOUNT PAY:</span>
            <input
              type="text"
              value={discountPay}
              className="input-text config-field"
              onChange={(evt) => { setDiscountPay(evt.target.value); }}
            />
            {discountMethod === 'DISCOUNT_PER_QUANTITY' ? '£' : 'item(s)'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Config;
