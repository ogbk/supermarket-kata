/* eslint-disable */

import { computeCart, rounded_two } from '../../client/app/util/functions';

describe('computeCart', () => {

  test('updates the product entry via the index', () => {

    const products = [ // index of interest : 1
      {},
      {
        hasDiscount: 'true',
        pricingMethod: 'PRICE_PER_ITEM',
        quantity: 10,
        price: 2,
        fullPrice: 0,
        actualPrice: 0,
        savings: 0,
        discountDetails: {
          discountMethod: 'DISCOUNT_PER_FRACTION',
          discountBuy: 3, // DISCOUNT: buy 3 pay 2
          discountPay: 2,
          remainingQuantity: 0,
          remainingPrice: 0,
          discountQuantity: 0,
          reducedPrice: 0
        },
      },
      {}
    ];

    /* EXPLAINATION OF DESIRED RESULT */
    /*
      NORMAL PRICE
        (will be saved as fullPrice) = 20 [price * quantity]
      
      DISCOUNT - DISCOUNT_PER_FRACTION [ 3 for 2 ]
        discountQuantity: discount will be applied to only 9 items : 
          [3*3 = 9], [ quantity_10 - ( quantity_10 % discountBuy_3) = 9]
        reducedprice for discounted items = 12 = [ 9 * discountPay_2 / discountBuy_3 * price_2 ]

      remainingQuantity = ITEMS NOT DISCOUNTED = 1 [10 - 9]
      remainingPrice = price of items not discounted =  1 * price_2 = 2

      actualPrice = what you really pay = [12 + 2] = 14
      
      savings: 20 - 14 = 6
    */

    // Let's assume store is empty

    const computedCart = computeCart({}, products, 1);
    const result = computedCart.products[1];

    expect(result.fullPrice).toBe(20);
    expect(result.discountDetails.discountQuantity).toBe(9);
    expect(result.discountDetails.reducedPrice).toBe(12);
    expect(result.discountDetails.remainingQuantity).toBe(1);
    expect(result.discountDetails.remainingPrice).toBe(2);
    expect(result.actualPrice).toBe(14);
    expect(result.savings).toBe(6);

  });

})

describe('rounded_two()', () => {

  test('rounding fraction up to 2 decimals', () => {
    const wholeNumber = 1234;
    const fraction1 = 1234.1234;
    const fraction2 = 1234.5678;
    
    expect(rounded_two(wholeNumber)).toEqual(1234);
    expect(rounded_two(fraction1)).toEqual(1234.12);
    expect(rounded_two(fraction2)).toEqual(1234.56);
  })
})
