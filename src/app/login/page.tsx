'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importar useRouter do Next.js
import { LoginForm } from '../components/LoginForm';
import { USERS } from '../data/users';
import { InstructionsLogin } from '../components/Instructions';
import { StatusLogin } from '../components/Status';
import { Status } from '../types/statusLogin';

export default function LoginPage() {
  const [status, setStatus] = useState<Status>(null);
  const [tentative, setTentative] = useState(0);

  const router = useRouter();

  const handleLogin = (username: string, password: string) => {
    setTentative((prevTentative) => {
      if (username === USERS.regular.login && password !== USERS.regular.pass) {
        const newTentative = prevTentative + 1;

        if (newTentative >= 3) {
          setStatus('temporary_block');
        } else {
          setStatus('invalid_pass');
        }

        return newTentative; // Atualiza o estado com o novo valor
      } else if (
        username === USERS.regular.login &&
        password === USERS.regular.pass
      ) {
        setStatus('logged_in');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
        return 0;
      } else if (
        username === USERS.bloqueado.login &&
        password === USERS.bloqueado.pass
      ) {
        setStatus('blocked');
        return 0;
      } else {
        setStatus('not_found');
        return prevTentative;
      }
    });
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-start pt-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto">
        <InstructionsLogin />
        <div className="flex justify-center mt-4">
          <LoginForm onSubmit={handleLogin} />
        </div>
        <StatusLogin status={status}></StatusLogin>
      </div>
    </div>
  );
}
