import React from 'react';

function SubmitedForm() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-white">
        <div className="text-center text-white">
          <strong className="font-bold text-2xl mb-4">Sucesso!</strong>
          <p className="text-lg">O formulário foi enviado com sucesso.</p>
        </div>
      </div>
    </div>
  );
}

export default SubmitedForm;
