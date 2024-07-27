import React from 'react';

export function InstructionsLogin() {
  return (
    <div className="bg-gray-800 p-6 max-w-2xl mx-auto text-gray-100 rounded-3xl">
      <p className="text-center mb-6 font-bold text-l">Instruções Login</p>
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

export function InstructionsForm() {
  return (
    <div className="bg-gray-800 p-6 max-w-2xl mx-auto text-gray-100 rounded-3xl mb-6">
      <p className="text-center mb-6 font-bold text-l">
        Instruções do Cadastro
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>
          Preencha todos os campos obrigatórios: nome, email, senha, país e
          gênero.
        </li>
        <li>
          Escolha suas preferências de lazer marcando as opções correspondentes.
        </li>
        <li>
          Após o envio do formulário, você receberá uma mensagem de confirmação
          indicando se o cadastro foi realizado com sucesso.
        </li>
      </ul>
    </div>
  );
}

export function InstructionsTable() {
  return (
    <div className="bg-gray-800 p-6 max-w-2xl mx-auto text-gray-100 rounded-3xl mb-6">
      <p className="text-center mb-6 font-bold text-l">
        Instruções tabela dinâmica
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Veja a tabela de personagens do Harry Potter abaixo.</li>
        <li>A ordem dos personagens muda a cada carregamento da página.</li>
        <li>São exibidas imagem, nome, casa, data de nascimento e ator.</li>
      </ul>
    </div>
  );
}
