/* eslint-disable */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../../client/app/components/App';
import Cart from '../../client/app/components/Cart';
import Config from '../../client/app/components/Config';
import Receipt from '../../client/app/components/Receipt';

let app;

describe('Create new product', () => {

  beforeAll(() => {
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




})
