import React from 'react';
import { Link } from 'react-router-dom';

const Mainone = () => {
  return (
    <>
      
      <div className="p-6 bg-violet-500 flex justify-between items-center">
        <div className="text-white text-xl font-bold">Quantum Hit</div>

        
        <div className="flex space-x-6 font-bold">
          <Link to="/" className="text-white hover:underline">Home</Link>

          <div className="relative group">
            <button className="text-white hover:underline focus:outline-none">
              Trade
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black p-4 mt-2 rounded shadow-md z-10 w-40">
              <Link to="/trade/trade1" className="block px-2 py-1 hover:bg-gray-200">
                View TradeList
              </Link>
              <Link to="/trade/excelcsv" className="block px-2 py-1 hover:bg-gray-200">
                Excel and Csv Compare
              </Link>
              <Link to="/trade/trade3" className="block px-2 py-1 hover:bg-gray-200">
                Trade 
              </Link>
            </div>
          </div>

          <Link to="/place-order" className="text-white hover:underline">Place Order</Link>
          <Link to="/view-graph" className="text-white hover:underline">View Graph</Link>
          <Link to="/about" className="text-white hover:underline">About</Link>
        </div>
      </div>

      
      <div className="p-10 bg-white text-gray-800 text-center">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Quantum Hit</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Quantum Hit is a powerful trade analysis and comparison platform designed to give you accurate insights by comparing CSV and Excel data, placing smart orders, and visualizing your equity performance — all in one place.
        </p>
      </div>
    </>
  );
};

export default Mainone;
