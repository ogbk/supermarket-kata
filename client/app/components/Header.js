// @flow

import React from 'react';

import { openCart, openProductsList } from '../util/actions';

const BACK = 'img/back.png';
const CART = 'img/cart.png';

type Props = {
  currentPage: string,
  dispatch: any,
}

const Header = ({ currentPage, dispatch }: Props) => (
  <div className="page-header">
    {
      currentPage === 'PRODUCTS_LIST'
        ? <div className="page-main">ALL PRODUCTS</div>
        : (
          <img
            className="page-back click"
            src={BACK}
            alt="BACK"
            onClick={() => { dispatch(openProductsList); }}
          />
        )
    }

    {
      currentPage !== 'CART'
      && (
        <img
          className="page-cart click"
          src={CART}
          alt="CART"
          onClick={() => { dispatch(openCart); }}
        />
      )
    }
  </div>
);

export default Header;
