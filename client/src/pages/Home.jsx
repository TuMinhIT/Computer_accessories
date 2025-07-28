import React from 'react';
import Product from './Product';

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
          Welcome to Our Store
        </h1>
        <Product />
      </div>
    </div>
  );
}

export default Home;
