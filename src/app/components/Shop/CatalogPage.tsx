'use client';

import React from 'react';
import { useProductContext } from './ProductContext';

export default function CatalogPage() {
  const { products, addToCart } = useProductContext();

  return (
    <div className="bg-gray-800 p-6 sm:p-8 text-gray-100 max-w-3xl sm:max-w-5xl mx-auto rounded-lg">
      <h2 className="text-4xl font-bold mb-8 text-center border-b border-gray-600 pb-4">
        Catálogo de Produtos
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-300 text-center">
          Nenhum produto disponível no momento.
        </p>
      ) : (
        <ul className="space-y-4">
          {products.map((product, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row justify-between items-center bg-gray-700 p-4 rounded-lg border border-gray-100"
            >
              {/* Informações do Produto */}
              <div className="text-center sm:text-left">
                <span className="block font-semibold text-lg">
                  {product.name}
                </span>
                <span className="block text-gray-300">
                  Preço: €{product.price.toFixed(2)}
                </span>
              </div>

              {/* Quantidade e Botão */}
              <div className="flex flex-col items-center mt-4 sm:mt-0 space-y-2">
                {/* Destaque para a Quantidade */}
                <span className="text-2xl font-bold text-gray-100">
                  {product.quantity} unidades
                </span>

                {/* Botão Adicionar ao Carrinho */}
                <button
                  onClick={() => addToCart(product.name)}
                  disabled={product.quantity === 0}
                  className={`px-4 py-2 rounded-lg transition min-w-[12rem] text-center ${
                    product.quantity > 0
                      ? 'bg-indigo-600 text-gray-100 hover:bg-indigo-700'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {product.quantity > 0
                    ? 'Adicionar ao Carrinho'
                    : 'Sem Estoque'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
