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
        Instruções
      </h2>

      <p className="mb-8 text-lg text-gray-300 text-center">
        Descubra como aproveitar todos os recursos da nossa aplicação com estas
        instruções rápidas e fáceis de seguir. Cada seção foi projetada para
        tornar sua experiência ainda melhor!
      </p>

      <div className="flex flex-col space-y-8">
        {/* Estoque */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaWarehouse className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Estoque
            </h3>
            <p className="text-gray-300">
              Gerencie o estoque da loja e cadastre novos produtos, definindo o
              nome, preço e quantidade inicial.
            </p>
          </div>
        </div>

        {/* Catálogo */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaStore className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Catálogo
            </h3>
            <p className="text-gray-300">
              Navegue pelos produtos disponíveis, veja os detalhes e adicione-os
              ao seu carrinho para compra.
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
              Visualize os itens adicionados, atualize suas quantidades ou
              remova-os. Quando estiver pronto, siga para o pagamento.
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
              Você verá um resumo dos itens no carrinho antes de concluir.
            </p>
          </div>
        </div>

        {/* Ordens */}
        <div className="flex items-center space-x-6 border border-gray-100 p-6 rounded-lg">
          <FaClipboardList className="text-7xl text-gray-100" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Ordens
            </h3>
            <p className="text-gray-300">
              Consulte o histórico de compras, com detalhes sobre os itens
              adquiridos, o total pago e a data do pedido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
