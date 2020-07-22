# Supermarket Kata test

## Tech stack

- React
- React hooks `useReducer` - state management tool (lightweight alternative to Redux)
- Sass - css preprocessor
- Eslint - code linter
- Jest - testing framework

- I did not use the following:
  - React Router - components were fairly simple, not too many pages to switch to

## App structure
- base component: `<App/>` contains:
  - component `<Cart/>`: shows all products registered in the business. 
  User makes transactions on this interface. For each product it shows the following:
    - name
    - quantity purchased (number of items or weight)
    - button `ADD`
    - quantity to add (default 1)
    - button `DELETE`
    - quantity to delete (default 1)

  - component `<Receipt/>`: real-time receipt of current user transation.
    Modelled after receipt picture provided in test description.
    It shows:
    - Subtotal (total price of all items - without any discount)
    - Savings: for each product with a discount, show the applied discount
    - Total savings: sum of applied discounts for all products
    - Total to pay: [Subtotal - total savings]

  - component `<Config />`: interface where business executive can store/update a particular product with their details. Products are stored/updated one at at time.

  When open, the action button in `<App/>` is blocked, so user can't add another action to the one currently being handled.
  It shows:
    - product name
    - pricing method: [per weight or per item]
    - price
    - discount details
      - discount method: [reduction per price or per fraction]
        - reduction per price [eg but 2 pay £1]
        - reduction per fraction [eg but 3 pay 2]
      - buyAmount: [eg in `but 2 pay £1` it's `2`]
      - payAmount: [eg in `but 2 pay £1` it's `1`]
    - button `ABORT`: close `<Config/>`, don't save
    - button `SAVE`: save and close `<Config/>`
      - Highights any error found:
        - discount costs more than normal price
    
   
  - button `ACTION`: open `<Config/>`. Select either:
    - add new product with details
    - update existing product
   

## Data structure
- Besides the data format shown on the components, the following data is used in the state management:
  - `products[index]`:
      - Product info saved in `<Config/>` 
      - `quantity` - [number or weight]
      - `fullPrice`: price for `quantity` without any discount
      - `discountQuantity`: number or weight to which discount will be applied on
      - `reducedPrice`: price for `discountQuantity` when discount is applied
      - `remainingQuantity`: number or weight to which discount is not applied on
      - `remainingPrice`: price for `remainingQuantity` without discount
      - `actualPrice`: what user actually pays [`reducedPrice + remainingPrice`] 
      - `savings`: what user actually pays [`fullPrice` - (`reducedPrice + remainingPrice`) ]
      - `suffix`: value to express quantity of items: `gr` or `item(s)`
 
## Business considerations
- Weight is shown in gr (grams not kilograms) everywhere except in receipt. This way users won't have to do much conversions.
- The name property `product[index].name` is used as an identifier of a product
- Block product addition & show error if product already exists.
- Block ACTION: `DELETE quantity: (x)`, if x is more than quantity purchased.
- When updating a product, user cannot update the name.
- Product name is mandatory, block user from saving product is it's missing.

## Coding techniques / styles
- In `<Config/>` when saving/ changing discount value from `<select/>`, the option values are  strings `'true'` | `'false'`, not booleans. This is deliberate as the discount details are shown only if `(hasDiscount === 'true')`, not `(hasDiscount)`

- `products.data.tempData = {addQuantity, deleteQuantity}`: fields used in the state management to store added, deleted quantity in `<Cart/>`, related to a particular product.

## Running

- If necessary, change the following default application port in `port_config.js`:
  - client [ 8080 ]

- Clone or download the application
- ```git clone``` or download this repository
- ```cd ____``` or ```cd ____-master```
- ```yarn install``` to download required packages (client-side)
- ```yarn start``` to run the application ==> it opens up a new browser


## Linting

- ESLint `yarn eslint`
- Sass lint `yarn sass-lint`


## Static typechecking with Flow

- Stop flow server `yarn flow stop`
- Start flow server `yarn flow start`
- Run flow `yarn flow status`


## Testing with jest

- test: `yarn test`
