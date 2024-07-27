// components/UserProfile.tsx

'use client'; // Indica que este é um componente de cliente

import React, { useState } from 'react';

const UserProfile: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-md max-w-sm mx-auto">
      {loggedIn ? (
        <div>
          <p className="text-lg font-bold mb-4">Usuário Logado</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-gray-100 py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-center">
          Você foi desconectado. Por favor, faça login.
        </p>
      )}
    </div>
  );
};

export default UserProfile;
