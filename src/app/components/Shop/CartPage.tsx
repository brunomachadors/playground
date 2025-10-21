'use client';

import React from 'react';
import { useProductContext } from './ProductContext';

export default function CartPage({ goToPayment }: { goToPayment: () => void }) {
  const { cart } = useProductContext();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  return (
    <div className="bg-gray-800 p-6 sm:p-8 text-gray-100 max-w-3xl sm:max-w-5xl mx-auto rounded-lg">
      <h2 className="text-4xl font-bold mb-8 text-center border-b border-gray-600 pb-4">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-300 text-center">Your cart is empty.</p>
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
            <button
              onClick={goToPayment}
              className="w-full mt-4 py-3 rounded-lg bg-indigo-600 text-gray-100 font-semibold hover:bg-indigo-700 transition"
            >
              Go to Payments
            </button>
          </div>
        </>
      )}
    </div>
  );
}
