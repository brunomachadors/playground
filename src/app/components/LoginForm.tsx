'use client'; // Indica que é um componente do cliente

import React, { useState } from 'react';
import Button from './Buttons';

type LoginFormProps = {
  onSubmit: (username: string, password: string) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="flex justify-center items-center bg-gray-800 w-full mt-10">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div className="flex justify-center w-full">
            <Button
              type="submit"
              color="white"
              textColor="gray-800"
              borderColor="gray-300"
              hoverColor="gray-100"
              focusColor="gray-500"
            >
              Logar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
