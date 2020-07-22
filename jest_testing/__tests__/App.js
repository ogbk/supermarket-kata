/* eslint-disable */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../../client/app/components/App';
import Cart from '../../client/app/components/Cart';
import Config from '../../client/app/components/Config';
import Receipt from '../../client/app/components/Receipt';

let app;

describe('<App/>', () => {

  beforeAll(() => {
    app = mount(<App />);
  });

  test('on mount, loaded components: <Cart/> & <Receipt/>, not loaded: <Config/>', () => {
    expect(app.find(Cart).exists()).toBe(true);
    expect(app.find(Receipt).exists()).toBe(true);
    expect(app.find(Config).exists()).not.toBe(true);
  });
  
  test('on mount, products array is empty, nothing stored in cart yet', () => {
    const receipt_product = app.find(Receipt).props().store.products;
    expect(receipt_product).toEqual([]);
    expect(app.find('.app-view .cart .content').text()).toBe('');
  });

  test('choose select option with value: "" to open <Config/> page[NEW ITEM]', () => {
    expect(app.find(Config).exists()).not.toBe(true);
    const select_option = app.find('.app-config > select');
    expect(select_option.children()).toHaveLength(1);
    expect(select_option.text()).toBe('CREATE NEW ITEM');

    select_option.simulate('change', { target: { value:'' } });
    app.find('button.execute-action').simulate('click');
    expect(app.find(Config).exists()).toBe(true);
  });


})
