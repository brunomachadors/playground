'use client';

import React, { useState } from 'react';
import { useProductContext } from './ProductContext';

export default function StockManagement() {
  const { products, addProduct, updateProduct } = useProductContext();

  // Estados para gerenciar os campos do formulário
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  // Função para adicionar um novo produto
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !productPrice || !productQuantity) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const newProduct = {
      name: productName,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
    };

    addProduct(newProduct);

    // Limpar os campos do formulário
    setProductName('');
    setProductPrice('');
    setProductQuantity('');
  };

  // Função para ajustar a quantidade de um produto no estoque
  const handleAdjustQuantity = (productName: string, adjustment: number) => {
    const product = products.find((p) => p.name === productName);
    if (product) {
      const newQuantity = Math.max(product.quantity + adjustment, 0);
      updateProduct(productName, newQuantity); // Atualiza a quantidade globalmente
    }
  };

  return (
    <div className="bg-gray-800 p-6 sm:p-8 text-gray-100 max-w-3xl sm:max-w-5xl mx-auto rounded-lg">
      <h2 className="text-4xl font-bold mb-8 text-center border-b border-gray-600 pb-4">
        Gerenciamento de Estoque
      </h2>

      {/* Formulário para adicionar produtos */}
      <form onSubmit={handleAddProduct} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="p-4 bg-gray-700 text-gray-100 rounded-lg border border-gray-100"
          />
          <input
            type="number"
            placeholder="Preço (€)"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="p-4 bg-gray-700 text-gray-100 rounded-lg border border-gray-100"
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            className="p-4 bg-gray-700 text-gray-100 rounded-lg border border-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-gray-100 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Adicionar Produto
        </button>
      </form>

      {/* Lista de Produtos no Estoque */}
      {products.length === 0 ? (
        <p className="text-gray-300 text-center">Nenhum produto no estoque.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row justify-between items-center bg-gray-700 p-4 rounded-lg border border-gray-100"
            >
              {/* Informações do Produto */}
              <div className="w-full sm:w-auto text-center sm:text-left">
                <span className="block font-semibold text-lg text-gray-100">
                  {product.name}
                </span>
                <span className="block text-gray-300">
                  Preço: €{product.price.toFixed(2)}
                </span>
              </div>

              {/* Quantidade e Botões */}
              <div className="flex items-center mt-4 sm:mt-0 space-x-4">
                {/* Quantidade */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAdjustQuantity(product.name, -1)}
                    className="px-4 py-2 bg-red-600 text-gray-100 rounded-lg hover:bg-red-700 transition"
                  >
                    -
                  </button>
                  <span
                    className="text-2xl font-bold text-gray-100 text-center"
                    style={{ minWidth: '2rem' }} // Define uma largura mínima fixa
                  >
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => handleAdjustQuantity(product.name, 1)}
                    className="px-4 py-2 bg-green-600 text-gray-100 rounded-lg hover:bg-green-700 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
