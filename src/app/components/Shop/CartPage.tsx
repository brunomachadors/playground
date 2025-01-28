'use client';

import React from 'react';
import { useProductContext } from './ProductContext';

export default function CartPage() {
  const { cart } = useProductContext();

  return (
    <div className="bg-gray-800 p-6 sm:p-8 text-gray-100 max-w-3xl sm:max-w-5xl mx-auto rounded-lg">
      <h2 className="text-4xl font-bold mb-8 text-center border-b border-gray-600 pb-4">
        Seu Carrinho
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-300 text-center">Seu carrinho está vazio.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-700 p-4 rounded-lg border border-gray-100"
            >
              <div>
                <span className="block font-semibold">{item.name}</span>
                <span className="block text-gray-300">
                  €{item.price.toFixed(2)} - {item.cartQuantity} no carrinho
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
