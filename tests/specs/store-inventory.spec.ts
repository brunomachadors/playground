import { test } from '../fixtures/test';
import { newProduct, paymentMethods } from '../data/products';
import { StorePage } from '../pages/StorePage';

test.describe(
  'Store inventory checkout flow',
  { tag: ['@store', '@regression', '@inventory', '@checkout-flow'] },
  () => {
    test('Store buy newly created product', { tag: '@happy-path' }, async ({
      page,
    }) => {
      const storePage = new StorePage(page);

      await storePage.goto();
      await storePage.openInventory();
      await storePage.expectInventoryVisible();
      await storePage.createProduct(
        newProduct.name,
        newProduct.price,
        newProduct.quantity,
      );

      await storePage.openCatalog();
      await storePage.expectCatalogProductVisibleByName(newProduct.name);
      await storePage.addProductToCartByName(newProduct.name);
      await storePage.expectCatalogProductQuantityByName(
        newProduct.name,
        newProduct.quantityAfterAddingOne,
      );

      await storePage.openCart();
      await storePage.expectProductInCart(0, newProduct.name, '1', newProduct.price);
      await storePage.expectCartTotal(newProduct.price);

      await storePage.goToPayment();
      await storePage.selectPaymentMethod(paymentMethods.visa);
      await storePage.confirmPayment();

      await storePage.expectOrdersVisible();
      await storePage.expectOrderCreated(
        0,
        [newProduct],
        paymentMethods.visa,
        newProduct.price,
      );
    });
  },
);
