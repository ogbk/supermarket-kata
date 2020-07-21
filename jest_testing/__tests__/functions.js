/* eslint-disable */

import { computeTotal } from '../../client/app/util/functions';

describe('compute total', () => {

  test('compute total price', () => {
    const store = [
      {price: 12, quantity: 10},
      {price: 12, quantity: 11},
      {price: 12, quantity: 12},
    ];

    const ANSWER = 396; // (12 * 10)+(12*11)+(12*12)
    expect(computeTotal(store)).toBe(ANSWER);
    
  });

})
