// @flow

import React, { useState } from 'react';

import { openProduct } from '../util/actions';
import type { ProductTypes } from '../util/datatypes';

type Props = {
  products: ProductTypes,
  dispatch: any,
}

const NO_IMAGE = 'img/image_missing.png';

const ProductList = ({ products, dispatch }: Props) => {
  const productTypes = Object.keys(products);
  const DEFAULT_TYPE = 'Heroes';

  const [selectedType, setSelectedType] = useState(DEFAULT_TYPE);
  const [itemsQuantity, setItemsQuantity] = useState({});

  return (
    <div className="products">
      <div className="products-header">
        {productTypes.map((thisProductType, idx) => (
          <span
            className={thisProductType === selectedType ? 'click selected-type' : 'click'}
            onClick={() => { setSelectedType(thisProductType); }}
            key={`${thisProductType}-${idx}`}
          >
            {thisProductType}
          </span>
        ))}
      </div>

      <div>
        {
          products[selectedType]
          && products[selectedType].map(({
            id, images, tags, title,
          }) => (
            <div key={id} className="productslist-entry">
              <div className="image-container">
                <img
                  src={images[0] || NO_IMAGE}
                  alt={title}
                  className="click"
                  onClick={() => {
                    dispatch({
                      ...openProduct,
                      productId: id,
                      productType: selectedType,
                    });
                  }}
                />
              </div>

              <div className="productslist-details">
                <div className={tags.some((x) => (x.toLowerCase() === 'new')) ? 'is-new' : 'not-new'}>[NEW]</div>
                <div>{selectedType}</div>
                <div>{title}</div>
                <div className="detail-add">
                  <button
                    type="button"
                    className="click add-cart"
                    onClick={() => {
                      dispatch({
                        type: 'ADD',
                        productId: id,
                        productType: selectedType,
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
          ))
        }
      </div>
    </div>
  );
};

export default ProductList;
