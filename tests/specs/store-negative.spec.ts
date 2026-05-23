import { test } from '../fixtures/test';
import { StorePage } from '../pages/StorePage';

test.describe('Store negative flows', { tag: ['@store', '@regression'] }, () => {
  test('Store cart empty', { tag: ['@negative', '@cart'] }, async ({
    page,
  }) => {
    const storePage = new StorePage(page);

    await storePage.goto();
    await storePage.openCart();

    await storePage.expectCartVisible();
    await storePage.expectCartEmptyMessage();
  });

  test('Store payment empty', { tag: ['@negative', '@payment'] }, async ({
    page,
  }) => {
    const storePage = new StorePage(page);

    await storePage.goto();
    await storePage.openPayments();

    await storePage.expectPaymentVisible();
    await storePage.expectPaymentEmptyMessage();
  });
});
