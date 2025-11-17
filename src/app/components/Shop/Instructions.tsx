import React from 'react';
import {
  FaStore,
  FaShoppingCart,
  FaCreditCard,
  FaWarehouse,
  FaClipboardList,
} from 'react-icons/fa';

export default function Instructions() {
  return (
    <div
      id="instructionsContainer"
      className="bg-gray-800 p-6 text-gray-100 max-w-3xl sm:max-w-5xl mx-auto"
    >
      <h2
        id="instructionsHeader"
        className="text-4xl font-bold mb-8 text-center border-b border-gray-600 pb-4"
      >
        Instructions
      </h2>

      <p className="mb-8 text-lg text-gray-300 text-center">
        Learn how to make the most of all the features in our application with
        these quick and easy-to-follow instructions. Each section is designed to
        make your experience even better!
      </p>

      <div className="flex flex-col space-y-8">
        {/* Inventory */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaWarehouse className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Inventory
            </h3>
            <p className="text-gray-300">
              Manage the store’s inventory and register new products by defining
              their name, price, and initial quantity.
            </p>
          </div>
        </div>

        {/* Catalog */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaStore className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Catalog
            </h3>
            <p className="text-gray-300">
              Browse the available products, view details, and add them to your
              cart for purchase.
            </p>
          </div>
        </div>

        {/* Cart */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaShoppingCart className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">Cart</h3>
            <p className="text-gray-300">
              View the items you’ve added, and updated quantities. When ready,
              proceed to checkout.
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaCreditCard className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Payment
            </h3>
            <p className="text-gray-300">
              You’ll see a summary of the cart items before finalizing. Complete
              your purchase by selecting your preferred payment method.
            </p>
          </div>
        </div>

        {/* Orders */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaClipboardList className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Orders
            </h3>
            <p className="text-gray-300">
              Review your purchase history, including details the order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
