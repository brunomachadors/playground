import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Playground page',
  description: 'Página gerada para testes de automação',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen font-mono`}
      >
        <header className="py-2 w-full text-center bg-gray-800">
          <h1 className="text-3xl font-bold">Automation Test Playground</h1>
        </header>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="py-4 bg-gray-900 w-full text-center mt-auto">
          <p>&copy; 2024 Bug Buster Mentoria. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
