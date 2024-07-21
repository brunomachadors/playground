import React from 'react';

export function InstructionsLogin() {
  return (
    <div className="bg-white p-8 w-full text-gray-800 rounded-3xl">
      <p className="text-center  mb-6 font-bold">
        Esta é a página de login e deve seguir as seguintes regras:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>
          Quando utilizar username e senha corretos, deve retornar{' '}
          <strong>usuário logado</strong>.
        </li>
        <li>Login ou senha incorretos devem retornar uma mensagem de erro.</li>
        <li>Três senhas incorretas bloqueiam a conta temporariamente.</li>
      </ul>
    </div>
  );
}
