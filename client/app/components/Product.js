// @flow

import React, { useState } from 'react';

import type { ProductTypes } from '../util/datatypes';

type Props = {
  products: ProductTypes,
  id: string,
  type: string,
  dispatch: any,
}

const NO_IMAGE = 'img/image_missing.png';

const Product = ({
  products, id, type, dispatch,
}: Props) => {
  const [itemsQuantity, setItemsQuantity] = useState({});

  const {
    images, tags, title, price,
  } = products[type].find(
    ({ id: prodId }) => (id === prodId),
  );

  return (
    <div className="product">
      <div key={id} className="product-entry">
        <div className="image-container">
          <img
            src={images[1] || NO_IMAGE}
            alt={title}
          />
        </div>

        <div className="product-details">
          <div className={tags.some((x) => (x.toLowerCase() === 'new')) ? 'is-new' : 'not-new'}>[NEW]</div>
          <div>{type}</div>
          <div>{title}</div>
          <div>£{price.toFixed(2)}</div>
          <div className="detail-add">
            <button
              type="button"
              className="click add-cart"
              onClick={() => {
                dispatch({
                  type: 'ADD',
                  productId: id,
                  productType: type,
                  quantity: itemsQuantity[id] || 1,
                });
              }}
            >ADD TO BASKET
            </button>
            Quantity:
            <input
              className="input-quantity"
              type="text"
              value={itemsQuantity[id] || 1}
              onChange={(e) => {
                setItemsQuantity({
                  ...itemsQuantity,
                  [id]: Number(e.target.value.replace(/[^0-9]/g, '')),
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
