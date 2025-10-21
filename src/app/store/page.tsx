'use client';

import React, { useState } from 'react';
import Menu from '../components/Shop/Menu';
import Instructions from '../components/Shop/Instructions';
import InventoryManagement from '../components/Shop/InventoryManagement';
import CatalogPage from '../components/Shop/CatalogPage';
import CartPage from '../components/Shop/CartPage';
import PaymentPage from '../components/Shop/PaymentPage';
import { ProductProvider } from '../components/Shop/ProductContext';
import OrdersPage from '../components/Shop/OrdersPage';

export default function Store() {
  const [activeTab, setActiveTab] = useState('Home');

  // Função para navegar para a aba de Pagamento
  const goToPayment = () => {
    setActiveTab('Payments');
  };

  // Função para navegar para a aba de Ordens
  const goToOrders = () => {
    setActiveTab('Orders');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Instructions />;
      case 'Inventory':
        return <InventoryManagement />;
      case 'Catalog':
        return <CatalogPage />;
      case 'Cart':
        return <CartPage goToPayment={goToPayment} />;
      case 'Payments':
        return <PaymentPage goToOrders={goToOrders} />;
      case 'Orders':
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
