// @flow

export type DiscountType = {
  discountMethod: 'DISCOUNT_PER_FRACTION' | 'DISCOUNT_PER_QUANTITY',
  discountBuy: number,
  discountPay: number,
  discountQuantity: number,
  reducedPrice: number,
  remainingQuantity: number,
  remainingPrice: number,
}

export type ItemType = {
  id: string,
  name: string,
  suffix: string,
  quantity: number,
  price: number,
  pricingMethod: 'PRICE_PER_ITEM' | 'PRICE_PER_WEIGHT',
  hasDiscount: 'true' | 'false',
  discountDetails: DiscountType,
  fullPrice: number,
  actualPrice: number,
  savings: number,
  tempData: {
    addQuantity: number,
    deleteQuantity: number,
  }
};

export type StoreType = {
  products: Array<ItemType>,
  configOpen: boolean,
  configNew: boolean,
  currentProduct: ItemType,
};
