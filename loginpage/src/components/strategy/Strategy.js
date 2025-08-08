import React, { useState } from 'react';

const Strategy = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [strategyName, setStrategyName] = useState('');
  const [slots, setSlots] = useState('');
  const [universe, setUniverse] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [entryCondition, setEntryCondition] = useState('');
  const [exitCondition, setExitCondition] = useState('');

  const handleSave = () => {
    if (!strategyName || !startDate || !endDate || !slots || !stopLoss || !universe || !takeProfit || !entryCondition || !exitCondition) {
      alert('Please fill in required fields');
      return;
    }
    const strategyData = {
      strategyName,
      slots,
      universe,
      startDate,
      endDate,
      stopLoss,
      takeProfit,
      entryCondition,
      exitCondition,
    };
    console.log('Saved Strategy:', strategyData);
  };

  const handleUpdate = () => {
    console.log('Updated Strategy');
  };

  const handleBacktest = () => {
    console.log('Running Backtest');
  };

  const handleOptimize = () => {
    console.log('Running Optimization');
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center p-4">
     

      <div className="w-full max-w-6xl text-left mb-6">
        <h1 className="text-3xl font-bold text-purple-800 mb-1">Strategy Dashboard</h1>
        <p className="text-sm text-gray-500">Monitor and manage your trading system easily</p>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8">
       
        <div className="flex justify-between mb-6 border-b">
          {['overview', 'equity', 'performance', 'upload'].map((tab) => (
            <button
              key={tab}
              className={`capitalize px-4 py-2 font-medium text-sm md:text-base transition duration-300 ${
                activeTab === tab
                  ? 'border-b-4 border-purple-600 text-purple-700'
                  : 'text-gray-500 hover:text-purple-600'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block font-semibold mb-1">Strategy Name</label>
                <input value={strategyName} onChange={(e) => setStrategyName(e.target.value)} placeholder="Enter strategy" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Slots</label>
                <input value={slots} onChange={(e) => setSlots(e.target.value)} placeholder="Enter slots" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Universe</label>
                <input value={universe} onChange={(e) => setUniverse(e.target.value)} placeholder="Enter universe" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div>
                <label className="block font-semibold mb-1">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block font-semibold mb-1">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Stop Loss</label>
                <input value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} placeholder="Enter stoploss" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Take Profit</label>
                <input value={takeProfit} onChange={(e) => setTakeProfit(e.target.value)} placeholder="Enter profit" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block font-semibold mb-1">Entry Condition</label>
                <textarea value={entryCondition} onChange={(e) => setEntryCondition(e.target.value)} rows={5} placeholder="Type entry condition here..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Exit Condition</label>
                <textarea value={exitCondition} onChange={(e) => setExitCondition(e.target.value)} rows={5} placeholder="Type exit condition here..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none" />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button onClick={handleSave} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Save Strategy</button>
              <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Update Strategy</button>
              <button onClick={handleBacktest} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Run Backtest</button>
              <button onClick={handleOptimize} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">Run Optimization</button>
            </div>
          </>
        )}

        {activeTab === 'equity' && (
          <div className="text-center text-gray-600 py-10">hiiii</div>
        )}

        {activeTab === 'performance' && (
          <div className="text-center text-gray-600 py-10">hiii</div>
        )}

        {activeTab === 'upload' && (
          <div className="text-center text-gray-600 py-10">hiii</div>
        )}
      </div>
    </div>
  );
};

export default Strategy;
