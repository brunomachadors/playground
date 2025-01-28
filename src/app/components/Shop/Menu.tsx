import React from 'react';

interface MenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Menu({ activeTab, setActiveTab }: MenuProps) {
  const tabs = [
    'Home',
    'Estoque',
    'Catalogo',
    'Carrinho',
    'Pagamento',
    'Ordens',
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4  rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 text-base font-semibold rounded-md transition ${
            activeTab === tab
              ? 'bg-gray-100 text-gray-700 shadow-md'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Menu;
