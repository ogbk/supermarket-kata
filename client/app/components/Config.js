// @flow

import React, { useEffect, useState } from 'react';
import { getOnlyNumber, productExists, discountValidity } from '../util/functions';
import type {
  DiscountType, ItemType, ProductsType, StoreType,
} from '../util/datatypes';
import { defaultItem } from '../util/reducer';

type Props = {
  store: StoreType,
  dispatch: any,
}

const Config = ({ store, dispatch }: Props) => {
  const { configNew, currentProduct } = store;
  const defaultProduct = configNew ? defaultItem : currentProduct;

  const {
    pricingMethod: _pricingMethod,
    suffix: _suffix,
    price: _price,
    name: _name,
    hasDiscount: _hasDiscount,
    discountDetails: {
      discountMethod: _discountMethod,
      discountBuy: _discountBuy,
      discountPay: _discountPay,
    },

  } = defaultProduct;

  const [pricingMethod, setPricingMethod] = useState(_pricingMethod);
  const [suffix, setSuffix] = useState(_suffix);
  const [price, setPrice] = useState(_price);
  const [name, setName] = useState(_name);
  const [duplicate, setDuplicate] = useState(false);

  const [hasDiscount, setHasDiscount] = useState(_hasDiscount);
  const [discountMethod, setDiscountMethod] = useState(_discountMethod);

  const [discountBuy, setDiscountBuy] = useState(_discountBuy);
  const [discountPay, setDiscountPay] = useState(_discountPay);

  const [discountInvalid, setDiscountInvalid] = useState(false);

  const handleSave = (
    _dMethod, _dBuy, _dPay, _normalPrice,
  ) => {
    const checkDiscountValidity = discountValidity(_dMethod, _dBuy, _dPay, _normalPrice);

    if (hasDiscount === 'true' && !checkDiscountValidity) {
      setDiscountInvalid(true);
    } else {
      const product = {
        ...defaultItem,
        pricingMethod,
        suffix,
        price,
        name,
        hasDiscount,
        discountDetails: {
          ...(defaultItem.discountDetails),
          discountMethod,
          discountBuy,
          discountPay,
        },
      };

      dispatch({
        type: (configNew ? 'SAVE_NEW' : 'SAVE_UPDATED'),
        product,
      });
    }
  };

  return (
    <div className="config">
      <span className="title">{configNew ? 'NEW PRODUCT' : 'UPDATE PRODUCT'}</span>
      <div className="content">
        <span className={name === '' ? 'required' : ''}>PRODUCT NAME:</span>
        <input
          type="text"
          value={name}
          className={
            duplicate ? 'input-error' : 'input-text config-field'
          }
          readOnly={!configNew}
          onChange={({ target: { value } }) => {
            const exists = productExists(store, value);
            setName(value);
            setDuplicate(exists);
          }}
        />
        { duplicate && <span className="error">[Product already exists]</span> }
        <br /><br />

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
        /><span>£/{suffix}</span>
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
              onChange={({ target: { value } }) => { setDiscountBuy(getOnlyNumber(value)); }}
            />
            {suffix}<br /><br />

            <span>DISCOUNT PAY:</span>
            <input
              type="text"
              value={discountPay}
              className="input-text config-field"
              onChange={({ target: { value } }) => { setDiscountPay(getOnlyNumber(value)); }}
            />
            {discountMethod === 'DISCOUNT_PER_QUANTITY' ? '£' : suffix}
          </div>
        )}
      </div>

      <div className="config-actions">
        <button
          type="button"
          className="click button config-abort"
          onClick={() => {
            dispatch({
              type: 'ABORT_CONFIG',
            });
          }}
        > ABORT
        </button>

        <button
          type="button"
          className={
            duplicate ? 'hide' : 'click button config-save'
          }
          onClick={() => {
            if (name !== '') {
              handleSave(discountMethod, discountBuy, discountPay, price);
            }
          }}
        > SAVE
        </button>
        {discountInvalid && <span className="error">[DISCOUNT INVALID - USER WOULD NOT PAY LESS]</span>}
      </div>
    </div>
  );
};

export default Config;
