// @flow

export type Product = {
  id: string,
  price: number,
  images: Array<string>,
  productType: string,
  title: string,
  tags: Array<string>,
  updatedAt: string,
};

export type ProductList = Array<Product>;

export type ProductTypes_temp = {
  'Heroes': ProductList,
  'Sharps': ProductList,
  'Polo': ProductList
};

export type ProductTypes = {
  'Heroes': ProductList,
  'Sharps': ProductList,
  'Polos': ProductList
};

export type CartItem = {
  id: string,
  price: number,
  images: Array<string>,
  productType: string,
  title: string,
  tags: Array<string>,
  updatedAt: string,
  quantity: number,
};

export type CartType = Array<CartItem>;

type PageType = 'PRODUCTS_LIST' | 'PRODUCT' | 'CART';

export type StoreType = {
  cart: CartType,
  products: ProductTypes,
  currentPage: PageType,
  selectedProductId: string,
  selectedProductType: string,
};
