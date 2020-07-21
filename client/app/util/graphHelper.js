// @flow

import type { ProductTypes_temp } from './datatypes';

const query: string = `
  query {
    products (first: 50){
      edges {
        node {
          id
          images (first: 2) {
            edges {
              node {
                originalSrc
              }
            }
          }
          productType
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          title
          tags
          updatedAt
        }
      }
    }
  }
`;

const groupProductsByType = (
  products: Array<any>, productTypes: Array<string>,
): ProductTypes_temp => {
  const ris = {};

  products.forEach((v) => {
    if (productTypes.includes(v.productType)) {
      const {
        id, images, priceRange, productType, tags, title, updatedAt,
      } = v;

      if (!ris[productType]) {
        ris[productType] = [];
      }

      ris[productType].push({
        id,
        images: images.edges.map(({ node: { originalSrc } }) => originalSrc),
        price: Number(priceRange.maxVariantPrice.amount),
        productType,
        tags,
        title,
        updatedAt,
      });
    }
  });

  return ris;
};

export { query, groupProductsByType };
