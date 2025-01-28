import React from 'react';
import {
  FaStore,
  FaShoppingCart,
  FaTag,
  FaCreditCard,
  FaBoxOpen,
  FaWarehouse,
} from 'react-icons/fa';

export default function Instructions() {
  return (
    <div
      id="instructionsContainer"
      className="bg-gray-800 p-6 sm:p-0 text-gray-100 max-w-3xl sm:max-w-5xl mx-auto"
    >
      <h2
        id="instructionsHeader"
        className="text-4xl font-bold mb-8 text-center border-b border-gray-600 pb-4"
      >
        Instruções
      </h2>

      <p className="mb-8 text-lg text-gray-300 text-center">
        Descubra como aproveitar todos os recursos da nossa aplicação com estas
        instruções rápidas e fáceis de seguir. Cada seção foi projetada para
        tornar sua experiência ainda melhor!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Loja */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaStore className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">Loja</h3>
            <p className="text-gray-300">
              Explore os produtos disponíveis e visualize os detalhes antes de
              adicioná-los ao carrinho.
            </p>
          </div>
        </div>

        {/* Carrinho */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaShoppingCart className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Carrinho
            </h3>
            <p className="text-gray-300">
              Visualize, atualize ou remova itens do seu carrinho antes de
              prosseguir para o pagamento.
            </p>
          </div>
        </div>

        {/* Catálogo */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaTag className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Catálogo
            </h3>
            <p className="text-gray-300">
              Consulte todos os produtos disponíveis em nossa loja.
            </p>
          </div>
        </div>

        {/* Pagamento */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaCreditCard className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Pagamento
            </h3>
            <p className="text-gray-300">
              Finalize sua compra escolhendo o método de pagamento preferido.
            </p>
          </div>
        </div>

        {/* Cadastro de Produto */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaBoxOpen className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Cadastro de Produto
            </h3>
            <p className="text-gray-300">
              Adicione novos produtos, incluindo nome, preço e quantidade em
              estoque.
            </p>
          </div>
        </div>

        {/* Gerenciamento de Estoque */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaWarehouse className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Estoque
            </h3>
            <p className="text-gray-300">
              Ajuste as quantidades de produtos disponíveis no estoque da loja.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-700 rounded-lg">
        <p className="text-center text-gray-300 text-lg">
          Aproveite todas as funcionalidades da nossa Lojinha! Caso tenha
          dúvidas, estamos aqui para ajudar. ❤
        </p>
      </div>
    </div>
  );
}
