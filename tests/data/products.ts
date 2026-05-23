export const products = {
  lightsaber: {
    index: 0,
    name: 'Lightsaber (Star Wars)',
    price: '9999.99',
    initialQuantity: 2,
    quantityAfterAddingOne: '1 units',
  },
  rubberDuck: {
    index: 1,
    name: 'Giant Rubber Duck',
    price: '49.99',
    initialQuantity: 15,
    quantityAfterAddingOne: '14 units',
  },
  sharkRepellent: {
    index: 2,
    name: 'Shark Repellent',
    price: '299.99',
    initialQuantity: 5,
    quantityAfterAddingOne: '4 units',
  },
  sonicScrewdriver: {
    index: 4,
    name: 'Sonic Screwdriver (Doctor Who)',
    price: '79.99',
    initialQuantity: 7,
    quantityAfterAddingOne: '6 units',
  },
  baconCandle: {
    index: 5,
    name: 'Bacon-Scented Candle',
    price: '14.99',
    initialQuantity: 20,
    quantityAfterAddingOne: '19 units',
  },
  dogSunglasses: {
    index: 7,
    name: 'Dog Sunglasses',
    price: '24.99',
    initialQuantity: 12,
    quantityAfterAddingOne: '11 units',
  },
};

export const paymentMethods = {
  mbWay: 'MBWay',
  klarna: 'Klarna',
  multibanco: 'Multibanco',
  paypal: 'PayPal',
  visa: 'Visa',
};

export const newProduct = {
  name: 'Automation Course Voucher',
  price: '149.90',
  quantity: '3',
  quantityAfterAddingOne: '2 units',
};

export const checkoutScenarios = [
  {
    scenario: 'MBWay payment with one product',
    products: [products.rubberDuck],
    paymentMethod: paymentMethods.mbWay,
    expectedTotal: '49.99',
  },
  {
    scenario: 'Klarna payment with two products',
    products: [products.rubberDuck, products.sharkRepellent],
    paymentMethod: paymentMethods.klarna,
    expectedTotal: '349.98',
  },
  {
    scenario: 'Multibanco payment with one product',
    products: [products.sonicScrewdriver],
    paymentMethod: paymentMethods.multibanco,
    expectedTotal: '79.99',
  },
  {
    scenario: 'PayPal payment with two products',
    products: [products.baconCandle, products.dogSunglasses],
    paymentMethod: paymentMethods.paypal,
    expectedTotal: '39.98',
  },
  {
    scenario: 'Visa payment with one product',
    products: [products.lightsaber],
    paymentMethod: paymentMethods.visa,
    expectedTotal: '9999.99',
  },
];
