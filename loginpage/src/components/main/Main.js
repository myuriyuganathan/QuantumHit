import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {FiSun, FiMoon } from 'react-icons/fi';
import logo from 'C:/Myuri/Learning/JWT/loginpage/src/assets/components/logo.png';
import tradeimage from 'C:/Myuri/Learning/JWT/loginpage/src/components/main/tradeimage1.jpg';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const Mainone = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <div
        className={`p-6 flex justify-between items-center shadow-md ${
          darkMode ? 'bg-black text-white' : 'bg-white text-violet-700'
        }`}
      >
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <div className="text-xl font-bold">QuantMT</div>
        </div>

        <div className="flex items-center space-x-6 font-bold">
          <Link to="/" className={`hover:underline ${darkMode ? 'text-white' : 'text-violet-700'}`}>
            Home
          </Link>
          <Link to="/about" className={`hover:underline ${darkMode ? 'text-white' : 'text-violet-700'}`}>
            About
          </Link>
          <Link to="/logout" className={`hover:underline ${darkMode ? 'text-white' : 'text-violet-700'}`}>
            Logout
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className={`ml-4 p-2 rounded-full transition ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            {darkMode ? (
              <FiSun className="text-yellow-400 w-6 h-6" />
            ) : (
              <FiMoon className="text-gray-700 w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div className={`flex min-h-screen w-full ${darkMode ? 'bg-black text-white' : 'bg-white text-violet-700'}`}>
        <aside className={`w-64 p-6 overflow-y-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-violet-700'}`}>
          <h1 className="text-2xl font-bold mb-6 border-b border-violet-700 pb-4">Menu</h1>
          <nav className="flex flex-col space-y-3 text-sm font-semibold">
            <Link to="/place-order" className={`hover:bg-violet-100 px-3 py-2 rounded ${darkMode ? '' : 'text-violet-700'}`}>
              Place Order
            </Link>
            <Link to="/view-graph" className={`hover:bg-violet-100 px-3 py-2 rounded ${darkMode ? '' : 'text-violet-700'}`}>
              View Equity Graph
            </Link>
            <Link to="/trade-list" className={`hover:bg-violet-100 px-3 py-2 rounded ${darkMode ? '' : 'text-violet-700'}`}>
              Trade List
            </Link>
            <Link to="/excelcsv" className={`hover:bg-violet-100 px-3 py-2 rounded ${darkMode ? '' : 'text-violet-700'}`}>
              Excel & CSV Check
            </Link>
            <Link to="/strategy" className={`hover:bg-violet-100 px-3 py-2 rounded ${darkMode ? '' : 'text-violet-700'}`}>
              Strategy
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-10 overflow-y-auto">
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-violet-400' : 'text-violet-700'}`}>
            Dashboard Overview
          </h2>

          {/* Big Image with theme-based border */}
          <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className={`rounded-xl overflow-hidden max-w-full max-h-[50vh] mx-auto ${
    darkMode ? 'shadow-[0_4px_20px_rgba(255,255,255,0.3)]' : 'shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
  }`}
>
  <img
    src={tradeimage}
    alt="tradeimage"
    className="w-full h-[50vh] object-cover"
  />
</motion.div>

        </main>
      </div>
    </>
  );
};

export default Mainone;
