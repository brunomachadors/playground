import React from 'react';

export function InstructionsLogin() {
  return (
    <div
      id="instructionsLogin"
      className="bg-gray-800 p-6 max-w-2xl mx-auto text-gray-100 rounded-3xl"
    >
      <p
        id="instructionsLoginHeader"
        className="text-center mb-6 font-bold text-l"
      >
        Instruções Login
      </p>
      <ul id="instructionsLoginList" className="list-disc list-inside mb-6">
        <li id="instructionsLoginItem1">
          Quando utilizar username e senha corretos, deve retornar{' '}
          <strong>usuário logado</strong>.
        </li>
        <li id="instructionsLoginItem2">
          Login ou senha incorretos devem retornar uma mensagem de erro.
        </li>
        <li id="instructionsLoginItem3">
          Três senhas incorretas bloqueiam a conta temporariamente.
        </li>
      </ul>
    </div>
  );
}

export function InstructionsForm() {
  return (
    <div
      id="instructionsForm"
      className="bg-gray-800 p-6 max-w-2xl mx-auto text-gray-100 rounded-3xl mb-6"
    >
      <p
        id="instructionsFormHeader"
        className="text-center mb-6 font-bold text-l"
      >
        Instruções do Cadastro
      </p>
      <ul id="instructionsFormList" className="list-disc list-inside mb-6">
        <li id="instructionsFormItem1">
          Preencha todos os campos obrigatórios: nome, email, senha, país e
          gênero.
        </li>
        <li id="instructionsFormItem2">
          Escolha suas preferências de lazer marcando as opções correspondentes.
        </li>
        <li id="instructionsFormItem3">
          Após o envio do formulário, você receberá uma mensagem de confirmação
          indicando se o cadastro foi realizado com sucesso.
        </li>
      </ul>
    </div>
  );
}

export function InstructionsTable() {
  return (
    <div
      id="instructionsTable"
      className="bg-gray-800 p-6 max-w-2xl mx-auto text-gray-100 rounded-3xl mb-6"
    >
      <p
        id="instructionsTableHeader"
        className="text-center mb-6 font-bold text-l"
      >
        Instruções tabela dinâmica
      </p>
      <ul id="instructionsTableList" className="list-disc list-inside mb-6">
        <li id="instructionsTableItem1">
          Veja a tabela de personagens do Harry Potter abaixo.
        </li>
        <li id="instructionsTableItem2">
          A ordem dos personagens muda a cada carregamento da página.
        </li>
        <li id="instructionsTableItem3">
          São exibidas imagem, nome, casa, data de nascimento e ator.
        </li>
      </ul>
    </div>
  );
}

export function InstructionsTasks() {
  return (
    <div
      id="instructionsToDo"
      className="bg-gray-800 p-6 max-w-2xl mx-auto text-gray-100 rounded-3xl mb-6"
    >
      <p
        id="instructionsToDoHeader"
        className="text-center mb-6 font-bold text-l"
      >
        Instruções das Tarefas
      </p>
      <ul id="instructionsToDoList" className="list-disc list-inside mb-6">
        <li id="instructionsToDoItem1">
          Adicione uma tarefa no campo de input e clique em &quot;Adicionar
          Tarefa&quot;.
        </li>
        <li id="instructionsToDoItem2">
          A tarefa será listada abaixo na seção &quot;Tarefas para fazer&quot;.
        </li>
        <li id="instructionsToDoItem3">
          Clique no botão &quot;Completar&quot; ao lado da tarefa para movê-la
          para a seção de tarefas completas.
        </li>
      </ul>
    </div>
  );
}
