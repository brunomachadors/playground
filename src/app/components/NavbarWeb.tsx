import React from 'react';
import Link from 'next/link';

const NavbarWeb = () => {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        <Link
          href="/"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
        >
          HOME
        </Link>
        <Link
          href="/login"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
        >
          LOGIN
        </Link>
        <Link
          href="/form"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
        >
          FORM
        </Link>
        <Link
          href="/table"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
        >
          TABLE
        </Link>
        <Link
          href="/about"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
        >
          SOBRE
        </Link>
      </div>
    </div>
  );
};

export default NavbarWeb;
