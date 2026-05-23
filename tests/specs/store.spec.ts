import type { BrowserContext, Page } from '@playwright/test';
import { test } from '../fixtures/test';
import { checkoutScenarios } from '../data/products';
import { StorePage } from '../pages/StorePage';

test.describe(
  'Store checkout flow',
  { tag: ['@store', '@regression', '@checkout-flow'] },
  () => {
    for (const checkoutScenario of checkoutScenarios) {
      test.describe(checkoutScenario.scenario, () => {
        test.describe.configure({ mode: 'serial' });

        let context: BrowserContext;
        let page: Page;
        let storePage: StorePage;

        test.beforeAll(async ({ browser }) => {
          context = await browser.newContext();
          page = await context.newPage();
          storePage = new StorePage(page);
        });

        test.afterAll(async () => {
          await context.close();
        });

        test('Store flow open catalog', { tag: '@smoke' }, async () => {
          await storePage.goto();
          await storePage.expectStorePageVisible();
          await storePage.openCatalog();

          await storePage.expectCatalogVisible();

          for (const product of checkoutScenario.products) {
            await storePage.expectCatalogProductVisible(
              product.index,
              product.name,
            );
          }
        });

        test('Store flow add products', { tag: '@stock' }, async () => {
          for (const product of checkoutScenario.products) {
            await storePage.addProductToCart(product.index);

            await storePage.expectCatalogProductQuantity(
              product.index,
              product.quantityAfterAddingOne,
            );
          }
        });

        test('Store flow validate cart', { tag: '@cart' }, async () => {
          await storePage.openCart();

          await storePage.expectCartVisible();

          for (const [cartIndex, product] of checkoutScenario.products.entries()) {
            await storePage.expectProductInCart(
              cartIndex,
              product.name,
              '1',
              product.price,
            );
          }

          await storePage.expectCartTotal(checkoutScenario.expectedTotal);
        });

        test('Store flow go to payment', { tag: '@payment' }, async () => {
          await storePage.goToPayment();

          await storePage.expectPaymentVisible();
        });

        test('Store flow select payment method', { tag: '@payment' }, async () => {
          await storePage.selectPaymentMethod(checkoutScenario.paymentMethod);

          await storePage.expectPaymentMethodSelected(
            checkoutScenario.paymentMethod,
          );
        });

        test(
          'Store flow confirm order',
          { tag: ['@happy-path', '@payment'] },
          async () => {
            await storePage.confirmPayment();

            await storePage.expectOrdersVisible();
            await storePage.expectOrderCreated(
              0,
              checkoutScenario.products,
              checkoutScenario.paymentMethod,
              checkoutScenario.expectedTotal,
            );
          },
        );
      });
    }
  },
);
