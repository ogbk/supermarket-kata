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


  test('update product', () => {
    const select_option = app.find('.app-config > select');

    // CREATE
    const PRODUCT_NAME = 'dummy1';
    select_option.simulate('change', { target: { value:'' } });
    app.find('button.execute-action').simulate('click');

    app.find('input[name="product-name"]').simulate('change', {target: { value: PRODUCT_NAME }});
    app.find('input[name="price"]').simulate('change', {target: {value: '10'}});
    app.find('.config-save').simulate('click');

    // UPDATE
    select_option.simulate('change', { target: { value: PRODUCT_NAME } });
    app.find('button.execute-action').simulate('click');
  
    expect(app.find('input[name="product-name"]').get(0).props.value).toBe(PRODUCT_NAME);
    expect(app.find('input[name="price"]').get(0).props.value).toBe(Number('10')); // string to int conversion

    app.find('input[name="price"]').simulate('change', {target: {value: '20'}});
    app.find('.config-save').simulate('click');

    // CHECK AGAIN
    select_option.simulate('change', { target: { value: PRODUCT_NAME } });
    app.find('button.execute-action').simulate('click');
  
    expect(app.find('input[name="product-name"]').get(0).props.value).toBe(PRODUCT_NAME);
    expect(app.find('input[name="price"]').get(0).props.value).toBe(Number('20'));
  });


  test('ADD, DELETE quantity', () => {
    const select_option = app.find('.app-config > select');
    
    const PRODUCT_NAME = 'dummy1';
    select_option.simulate('change', { target: { value:'' } });
    app.find('button.execute-action').simulate('click');

    app.find('input[name="product-name"]').simulate('change', {target: { value: PRODUCT_NAME }});
    app.find('input[name="price"]').simulate('change', {target: {value: '10'}});
    app.find('.config-save').simulate('click');

    const product_info = app.find('.cart-item span');
    expect (product_info.text()).toBe(PRODUCT_NAME + ': 0 item');

    app.find('.input-text').at(0).simulate('change', {target: {value: '12'}});
    app.find('.button-add').simulate('click');
    expect (product_info.text()).toBe(PRODUCT_NAME + ': 12 item');
    
    app.find('.input-text').at(1).simulate('change', {target: {value: '9'}});
    app.find('.button-delete').simulate('click');
    expect (product_info.text()).toBe(PRODUCT_NAME + ': 3 item');
  });

})
