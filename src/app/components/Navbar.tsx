import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="text-gray-300 hover:bg-gray-800 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium"
            >
              HOME
            </Link>
            <Link
              href="/login"
              className="text-gray-300 hover:bg-gray-800 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium"
            >
              LOGIN
            </Link>
            <Link
              href="/form"
              className="text-gray-300 hover:bg-gray-800 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium"
            >
              FORM
            </Link>
            <Link
              href="/table"
              className="text-gray-300 hover:bg-gray-800 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium"
            >
              TABLE
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:bg-gray-800 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium"
            >
              SOBRE
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
