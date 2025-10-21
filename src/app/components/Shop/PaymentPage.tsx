'use client';

import React, { useState } from 'react';
import { useProductContext } from './ProductContext';

export default function PaymentPage({
  goToOrders,
}: {
  goToOrders: () => void;
}) {
  const { cart, completePurchase } = useProductContext();
  const [paymentMethod, setPaymentMethod] = useState('');

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method!');
      return;
    }
    completePurchase(paymentMethod); // Registers the payment method
    goToOrders(); // Redirects to orders
  };

  return (
    <div className="bg-gray-800 p-6 sm:p-8 text-gray-100 max-w-3xl sm:max-w-5xl mx-auto rounded-lg">
      <h2 className="text-4xl font-bold mb-8 text-center border-b border-gray-600 pb-4">
        Payment
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-300 text-center">No items to pay.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-lg border border-gray-100"
              >
                <div>
                  <span className="block font-semibold">{item.name}</span>
                  <span className="block text-gray-300">
                    {item.cartQuantity} x €{item.price.toFixed(2)}
                  </span>
                </div>
                <span className="font-bold text-lg text-gray-100">
                  €{(item.price * item.cartQuantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-xl text-center font-semibold">
              Total: €{totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 space-y-4 text-center">
            <label className="block text-gray-300 text-lg font-semibold">
              Payment Method:
            </label>
            <div className="inline-block text-left">
              {/* Aligns radio buttons to the left */}
              <div className="flex flex-col space-y-2">
                {['MBWay', 'Klarna', 'Multibanco', 'PayPal', 'Visa'].map(
                  (method) => (
                    <div key={method} className="flex items-center">
                      <input
                        type="radio"
                        id={method}
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={method} className="ml-2 text-gray-100">
                        {method}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-6 py-3 rounded-lg bg-indigo-600 text-gray-100 font-semibold hover:bg-indigo-700 transition"
          >
            Confirm Payment
          </button>
        </>
      )}
    </div>
  );
}
