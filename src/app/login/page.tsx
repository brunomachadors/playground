'use client';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const handleLogin = (username: string, password: string) => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="bg-gray-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
