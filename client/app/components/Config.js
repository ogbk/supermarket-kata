// @flow

import React, { useEffect, useState } from 'react';
// import { computeTotal } from '../util/functions';
// import type { CartType } from '../util/datatypes';
import { getOnlyNumber } from '../util/functions';

type Props = {
}

const Config = ({ }: Props) => {
  const [pricingMethod, setPricingMethod] = useState('PRICE_PER_ITEM');
  const [suffix, setSuffix] = useState('item');
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');

  const [hasDiscount, setHasDiscount] = useState('true');
  const [discountMethod, setDiscountMethod] = useState('DISCOUNT_PER_FRACTION');

  const [discountBuy, setDiscountBuy] = useState(1);
  const [discountPay, setDiscountPay] = useState(1);

  return (
    <div className="config">
      <span className="title">CONFIG</span>
      <div className="content">
        <span>PRODUCT NAME:</span>
        <input
          type="text"
          value={name}
          className="input-text config-field"
          onChange={({ target: { value } }) => { setName(value); }}
        /><br /><br />

        <span>PRICING METHOD:</span>
        <select
          value={pricingMethod}
          className="select-custom click config-select config-field"
          onChange={({ target: { value } }) => {
            setPricingMethod(value);
            setSuffix(
              value === 'PRICE_PER_ITEM' ? 'item' : 'gr',
            );
          }}
        >
          <option value="PRICE_PER_ITEM">PRICE PER ITEM</option>
          <option value="PRICE_PER_WEIGHT">PRICE PER WEIGHT</option>
        </select><br /><br />
        <span>PRICE:</span>
        <input
          type="text"
          value={price}
          className="input-text config-field"
          onChange={({ target: { value } }) => { setPrice(getOnlyNumber(value)); }}
        /><span>/{suffix}</span>
        <br /><br /><br /><br />

        <span>DISCOUNT:</span>
        <select
          value={hasDiscount}
          className="select-custom click config-select config-field"
          onChange={({ target: { value } }) => { setHasDiscount(value); }}
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
              onChange={({ target: { value } }) => { setDiscountMethod(value); }}
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
              onChange={({ target: { value } }) => { setDiscountBuy(value); }}
            />
            {suffix === 'gr' && suffix}<br /><br />

            <span>DISCOUNT PAY:</span>
            <input
              type="text"
              value={discountPay}
              className="input-text config-field"
              onChange={({ target: { value } }) => { setDiscountPay(value); }}
            />
            {discountMethod === 'DISCOUNT_PER_QUANTITY' ? '£' : 'item(s)'}
          </div>
        )}
      </div>

      <div className="config-actions">
        <button
          type="button"
          className="click button config-abort"
        > ABORT
        </button>

        <button
          type="button"
          className="click button config-save"
        > SAVE
        </button>
      </div>
    </div>
  );
};

export default Config;
