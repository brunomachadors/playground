import React from 'react';
import { Status } from '../types/statusLogin';

export type StatusLoginProps = {
  status: Status;
};

export function StatusLogin({ status }: StatusLoginProps) {
  return (
    <>
      {status === 'logged_in' && (
        <div className="text-center text-green-500 mt-4">
          Usuário logado com sucesso! Redirecionando...
        </div>
      )}
      {status === 'blocked' && (
        <div className="text-center text-red-400 mt-4">Usuário bloqueado!</div>
      )}
      {status === 'not_found' && (
        <div className="text-center text-orange-300 mt-4">
          Usuário não encontrado!
        </div>
      )}
      {status === 'invalid_pass' && (
        <div className="text-center text-orange-300 mt-4">
          Usuário ou senha estão incorretos!
        </div>
      )}
      {status === 'temporary_block' && (
        <div className="text-center text-orange-300 mt-4">
          Usuário bloqueado temporariamente!
        </div>
      )}
    </>
  );
}
