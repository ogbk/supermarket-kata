/* eslint-disable */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../../client/app/components/App';
import Cart from '../../client/app/components/Cart';
import Config from '../../client/app/components/Config';
import Receipt from '../../client/app/components/Receipt';

let app;

describe('Create new product', () => {

  beforeEach(() => {
    app = mount(<App />);
  });

  test('cannot save unless product name is saved', () => {
    const select_option = app.find('.app-config > select');
    select_option.simulate('change', { target: { value:'' } });
    app.find('button.execute-action').simulate('click');
    expect(app.find(Config).exists()).toBe(true);
    expect(app.find(Cart).exists()).toBe(false);

    app.find('.config-save').simulate('click');
    expect(app.find(Config).exists()).toBe(true);
    expect(app.find(Cart).exists()).toBe(false);

    app.find('input[name="product-name"]').simulate('change', {target: {value: 'dummy product'}});
    app.find('.config-save').simulate('click');
    expect(app.find(Config).exists()).toBe(false);
    expect(app.find(Cart).exists()).toBe(true);
  });


  test('abort -> stops item creation', () => {
    const select_option = app.find('.app-config > select');
    select_option.simulate('change', { target: { value:'' } });
    app.find('button.execute-action').simulate('click');
    
    app.find('input[name="product-name"]').simulate('change', {target: {value: 'dummy product'}});
    app.find('.config-abort').simulate('click');
    expect(app.find(Config).exists()).toBe(false);
    expect(app.find(Cart).exists()).toBe(true);
  });

  test('create 2 products', () => {
    const PRODUCT_SUFFIX = ': 0 item'; // exactly what follows a product name when listed in cart

    const select_option = app.find('.app-config > select');

    expect(app.find('.cart-item').children()).toBeUndefined;

    select_option.simulate('change', { target: { value:'' } });
    app.find('button.execute-action').simulate('click');
    app.find('input[name="product-name"]').simulate('change', {target: {value: 'dummy1'}});
    app.find('.config-save').simulate('click');

    select_option.simulate('change', { target: { value:'' } });
    app.find('button.execute-action').simulate('click');
    app.find('input[name="product-name"]').simulate('change', {target: {value: 'dummy2'}});
    app.find('.config-save').simulate('click');

    expect(app.find(Config).exists()).toBe(false);
    expect(app.find(Cart).exists()).toBe(true);

    const cartItems = app.find('.cart .content .cart-item');
    expect(cartItems).toHaveLength(2);
    expect(cartItems.at(0).find('span').text()).toBe('dummy1'+PRODUCT_SUFFIX);
    expect(cartItems.at(1).find('span').text()).toBe('dummy2'+PRODUCT_SUFFIX);

  });




})
