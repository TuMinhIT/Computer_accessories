import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-indigo-700 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">POS Retail System</h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/product" className="hover:underline">Products</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;