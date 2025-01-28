'use client';

import React from 'react';
import { useProductContext } from './ProductContext';

export default function OrdersPage() {
  const { orders } = useProductContext();

  return (
    <div className="bg-gray-800 p-6 sm:p-8 text-gray-100 max-w-3xl sm:max-w-5xl mx-auto rounded-lg">
      <h2 className="text-4xl font-bold mb-8 text-center border-b border-gray-600 pb-4">
        Ordens de Compra
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-300 text-center">Nenhuma ordem registrada.</p>
      ) : (
        <ul className="space-y-8">
          {orders.map((order, index) => (
            <li
              key={index}
              className="bg-gray-700 p-4 rounded-lg border border-gray-100"
            >
              <p className="text-lg font-semibold mb-2">Data: {order.date}</p>
              <p className="text-gray-300 mb-4">
                Forma de Pagamento: {order.paymentMethod}
              </p>
              <ul className="space-y-2">
                {order.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {item.cartQuantity} x {item.name}
                    </span>
                    <span>€{(item.price * item.cartQuantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-right font-bold">
                Total: €{order.total.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
