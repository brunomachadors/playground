export default function Accounts() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
      <div className="bg-gray-100 border border-gray-800 p-4 rounded-lg flex-1 min-w-[200px] text-gray-800 text-center">
        <p className="font-semibold mb-2">Conta Regular:</p>
        <p>
          <strong>Login:</strong> <code>teste</code>
        </p>
        <p>
          <strong>Senha:</strong> <code>password123</code>
        </p>
      </div>
      <div className="bg-gray-100 border border-gray-800 p-4 rounded-lg flex-1 min-w-[200px] text-gray-800 text-center">
        <p className="font-semibold mb-2">Conta Bloqueada:</p>
        <p>
          <strong>Login:</strong> <code>testeblock</code>
        </p>
        <p>
          <strong>Senha:</strong> <code>password123</code>
        </p>
      </div>
    </div>
  );
}
