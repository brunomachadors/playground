import { expect, test, type Locator, type Page } from '@playwright/test';

export class StorePage {
  readonly page: Page;

  // Fixed locators
  readonly storePage: Locator;
  readonly inventoryTab: Locator;
  readonly catalogTab: Locator;
  readonly cartTab: Locator;
  readonly paymentsTab: Locator;
  readonly ordersTab: Locator;
  readonly catalogTitle: Locator;
  readonly cartTitle: Locator;
  readonly paymentTitle: Locator;
  readonly ordersTitle: Locator;
  readonly inventoryTitle: Locator;
  readonly inventoryNameInput: Locator;
  readonly inventoryPriceInput: Locator;
  readonly inventoryQuantityInput: Locator;
  readonly inventorySubmitButton: Locator;
  readonly cartEmptyMessage: Locator;
  readonly paymentEmptyMessage: Locator;
  readonly cartTotalValue: Locator;
  readonly goToPaymentButton: Locator;
  readonly confirmPaymentButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.storePage = page.getByTestId('store-page');
    this.inventoryTab = page.getByTestId('store-tab-inventory');
    this.catalogTab = page.getByTestId('store-tab-catalog');
    this.cartTab = page.getByTestId('store-tab-cart');
    this.paymentsTab = page.getByTestId('store-tab-payments');
    this.ordersTab = page.getByTestId('store-tab-orders');
    this.catalogTitle = page.getByTestId('catalog-title');
    this.cartTitle = page.getByTestId('cart-title');
    this.paymentTitle = page.getByTestId('payment-title');
    this.ordersTitle = page.getByTestId('orders-title');
    this.inventoryTitle = page.getByTestId('inventory-title');
    this.inventoryNameInput = page.getByTestId('inventory-input-name');
    this.inventoryPriceInput = page.getByTestId('inventory-input-price');
    this.inventoryQuantityInput = page.getByTestId('inventory-input-quantity');
    this.inventorySubmitButton = page.getByTestId('inventory-submit-button');
    this.cartEmptyMessage = page.getByTestId('cart-empty-message');
    this.paymentEmptyMessage = page.getByTestId('payment-empty-message');
    this.cartTotalValue = page.getByTestId('cart-total-value');
    this.goToPaymentButton = page.getByTestId('cart-go-to-payment');
    this.confirmPaymentButton = page.getByTestId('payment-confirm-button');
  }

  // Dynamic locators
  catalogProductNameByIndex(index: number): Locator {
    return this.page.getByTestId(`catalog-item-name-${index}`);
  }

  catalogProductQuantityByIndex(index: number): Locator {
    return this.page.getByTestId(`catalog-item-quantity-${index}`);
  }

  catalogAddButtonByIndex(index: number): Locator {
    return this.page.getByTestId(`catalog-item-add-button-${index}`);
  }

  catalogProductNameByText(productName: string): Locator {
    return this.page.getByText(productName, { exact: true });
  }

  catalogProductItemByText(productName: string): Locator {
    return this.catalogProductNameByText(productName).locator('..').locator('..');
  }

  catalogProductQuantityByText(productName: string): Locator {
    return this.catalogProductItemByText(productName).locator(
      '[data-testid^="catalog-item-quantity-"]'
    );
  }

  catalogAddButtonByProductName(productName: string): Locator {
    return this.catalogProductItemByText(productName).getByRole('button', {
      name: 'Add to Cart',
    });
  }

  cartProductNameByIndex(index: number): Locator {
    return this.page.getByTestId(`cart-item-name-${index}`);
  }

  cartProductQuantityByIndex(index: number): Locator {
    return this.page.getByTestId(`cart-item-quantity-${index}`);
  }

  cartProductTotalByIndex(index: number): Locator {
    return this.page.getByTestId(`cart-item-total-value-${index}`);
  }

  paymentMethodByName(paymentMethod: string): Locator {
    return this.page.getByTestId(`payment-method-input-${paymentMethod}`);
  }

  orderByIndex(index: number): Locator {
    return this.page.getByTestId(`order-${index}`);
  }

  orderPaymentByIndex(index: number): Locator {
    return this.page.getByTestId(`order-payment-${index}`);
  }

  orderProductNameByIndex(orderIndex: number, productIndex: number): Locator {
    return this.page.getByTestId(
      `order-item-name-${orderIndex}-${productIndex}`
    );
  }

  orderTotalByIndex(index: number): Locator {
    return this.page.getByTestId(`order-total-value-${index}`);
  }

  // Actions
  async goto() {
    await test.step('Open the store page', async () => {
      await this.page.goto('/store');
    });
  }

  async openCatalog() {
    await test.step('Open the product catalog', async () => {
      await this.catalogTab.click();
    });
  }

  async openInventory() {
    await test.step('Open the inventory page', async () => {
      await this.inventoryTab.click();
    });
  }

  async openCart() {
    await test.step('Open the cart', async () => {
      await this.cartTab.click();
    });
  }

  async openPayments() {
    await test.step('Open the payments page', async () => {
      await this.paymentsTab.click();
    });
  }

  async openOrders() {
    await test.step('Open the orders page', async () => {
      await this.ordersTab.click();
    });
  }

  async addProductToCart(productIndex: number) {
    await test.step(`Add product ${productIndex} to cart`, async () => {
      await this.catalogAddButtonByIndex(productIndex).click();
    });
  }

  async addProductToCartByName(productName: string) {
    await test.step(`Add product "${productName}" to cart`, async () => {
      await this.catalogAddButtonByProductName(productName).click();
    });
  }

  async fillNewProduct(name: string, price: string, quantity: string) {
    await test.step(`Fill new product "${name}"`, async () => {
      await this.inventoryNameInput.fill(name);
      await this.inventoryPriceInput.fill(price);
      await this.inventoryQuantityInput.fill(quantity);
    });
  }

  async submitNewProduct() {
    await test.step('Submit new product', async () => {
      await this.inventorySubmitButton.click();
    });
  }

  async createProduct(name: string, price: string, quantity: string) {
    await test.step(`Create product "${name}"`, async () => {
      await this.fillNewProduct(name, price, quantity);
      await this.submitNewProduct();
    });
  }

  async goToPayment() {
    await test.step('Go from cart to payment', async () => {
      await this.goToPaymentButton.click();
    });
  }

  async selectPaymentMethod(paymentMethod: string) {
    await test.step(`Select payment method "${paymentMethod}"`, async () => {
      await this.paymentMethodByName(paymentMethod).check();
    });
  }

  async confirmPayment() {
    await test.step('Confirm payment', async () => {
      await this.confirmPaymentButton.click();
    });
  }

  // Asserts
  async expectStorePageVisible() {
    await test.step('Check that the store page is visible', async () => {
      await expect(this.storePage).toBeVisible();
    });
  }

  async expectCatalogVisible() {
    await test.step('Check that the catalog is visible', async () => {
      await expect(this.catalogTitle).toBeVisible();
    });
  }

  async expectInventoryVisible() {
    await test.step('Check that the inventory page is visible', async () => {
      await expect(this.inventoryTitle).toBeVisible();
      await expect(this.inventoryNameInput).toBeVisible();
      await expect(this.inventoryPriceInput).toBeVisible();
      await expect(this.inventoryQuantityInput).toBeVisible();
      await expect(this.inventorySubmitButton).toBeVisible();
    });
  }

  async expectCartVisible() {
    await test.step('Check that the cart is visible', async () => {
      await expect(this.cartTitle).toBeVisible();
    });
  }

  async expectPaymentVisible() {
    await test.step('Check that the payment page is visible', async () => {
      await expect(this.paymentTitle).toBeVisible();
    });
  }

  async expectOrdersVisible() {
    await test.step('Check that the orders page is visible', async () => {
      await expect(this.ordersTitle).toBeVisible();
    });
  }

  async expectCatalogProductVisible(index: number, productName: string) {
    await test.step(`Check that catalog product "${productName}" is visible`, async () => {
      await expect(this.catalogProductNameByIndex(index)).toHaveText(
        productName
      );
    });
  }

  async expectCatalogProductQuantity(index: number, quantityText: string) {
    await test.step(`Check product ${index} quantity in catalog`, async () => {
      await expect(this.catalogProductQuantityByIndex(index)).toHaveText(
        quantityText
      );
    });
  }

  async expectCatalogProductVisibleByName(productName: string) {
    await test.step(`Check that catalog product "${productName}" is visible`, async () => {
      await expect(this.catalogProductNameByText(productName)).toBeVisible();
    });
  }

  async expectCatalogProductQuantityByName(
    productName: string,
    quantityText: string
  ) {
    await test.step(`Check product "${productName}" quantity in catalog`, async () => {
      await expect(this.catalogProductQuantityByText(productName)).toHaveText(
        quantityText
      );
    });
  }

  async expectProductInCart(
    index: number,
    productName: string,
    quantity: string,
    total: string
  ) {
    await test.step(`Check that "${productName}" is in the cart`, async () => {
      await expect(this.cartProductNameByIndex(index)).toHaveText(productName);
      await expect(this.cartProductQuantityByIndex(index)).toHaveText(quantity);
      await expect(this.cartProductTotalByIndex(index)).toHaveText(total);
    });
  }

  async expectCartTotal(total: string) {
    await test.step(`Check cart total is "${total}"`, async () => {
      await expect(this.cartTotalValue).toHaveText(total);
    });
  }

  async expectCartEmptyMessage() {
    await test.step('Check that the cart empty message is visible', async () => {
      await expect(this.cartEmptyMessage).toBeVisible();
    });
  }

  async expectPaymentEmptyMessage() {
    await test.step('Check that the payment empty message is visible', async () => {
      await expect(this.paymentEmptyMessage).toBeVisible();
    });
  }

  async expectPaymentMethodSelected(paymentMethod: string) {
    await test.step(`Check payment method "${paymentMethod}" is selected`, async () => {
      await expect(this.paymentMethodByName(paymentMethod)).toBeChecked();
    });
  }

  async expectOrderCreated(
    orderIndex: number,
    products: Array<{ name: string }>,
    paymentMethod: string,
    total: string
  ) {
    await test.step('Check that the order was created', async () => {
      await expect(this.orderByIndex(orderIndex)).toBeVisible();

      for (let productIndex = 0; productIndex < products.length; productIndex++) {
        const product = products[productIndex];

        await expect(
          this.orderProductNameByIndex(orderIndex, productIndex)
        ).toContainText(product.name);
      }

      await expect(this.orderPaymentByIndex(orderIndex)).toContainText(
        paymentMethod
      );
      await expect(this.orderTotalByIndex(orderIndex)).toHaveText(total);
    });
  }
}
