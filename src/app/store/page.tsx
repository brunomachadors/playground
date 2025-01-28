'use client';

import React, { useState } from 'react';
import Menu from '../components/Shop/Menu';
import Instructions from '../components/Shop/Instructions';
import StockManagement from '../components/Shop/StockManagement';
import CatalogPage from '../components/Shop/CatalogPage';
import CartPage from '../components/Shop/CartPage';
import PaymentPage from '../components/Shop/PaymentPage';
import { ProductProvider } from '../components/Shop/ProductContext';
import OrdersPage from '../components/Shop/OrdersPage';

export default function Store() {
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Instructions />;
      case 'Estoque':
        return <StockManagement />;
      case 'Catalogo':
        return <CatalogPage />;
      case 'Carrinho':
        return <CartPage />;
      case 'Pagamento':
        return <PaymentPage />;
      case 'Ordens':
        return <OrdersPage />;
      default:
        return <Instructions />;
    }
  };

  return (
    <ProductProvider>
      <div className="pt-8 flex flex-col items-center">
        {/* Menu de Navegação */}
        <Menu activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Conteúdo da Aba Ativa */}
        <div className="p-8 w-full max-w-4xl text-center">
          {renderContent()}
        </div>
      </div>
    </ProductProvider>
  );
}
