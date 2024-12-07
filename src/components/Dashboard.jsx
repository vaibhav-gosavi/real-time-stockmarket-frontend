'use client'

import React, { useState } from 'react';
import { fetchPrediction } from '../services/api';

const Dashboard = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStockSearch = async () => {
    if (!stockSymbol) return;
    setLoading(true);
    try {
      const data = await fetchPrediction(stockSymbol);
      setPredictions(data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions(null);
    } finally {
      setLoading(false);
    }
  };

  const getDecisionIcon = (decision) => {
    switch (decision.toLowerCase()) {
      case 'buy':
        return <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
      case 'sell':
        return <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;
      default:
        return <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Stock Prediction Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Stock Search</h2>
          <p className="text-gray-600 mb-4">Enter a stock symbol to get predictions</p>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter stock symbol (e.g., AAPL)"
              value={stockSymbol}
              onChange={(e) => setStockSymbol(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleStockSearch}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Prediction'}
            </button>
          </div>
        </div>

        {/* Prediction Results Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Predictions</h2>
          <div className="space-y-4">
            {loading && (
              <div className="flex justify-center items-center h-48">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              </div>
            )}
            {predictions && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Current Price</h3>
                    <p className="text-2xl font-bold text-blue-600">${predictions.current_price.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800">Average Prediction</h3>
                    <p className="text-2xl font-bold text-green-600">${predictions.average.toFixed(2)}</p>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Model Predictions</h3>
                  <ul className="space-y-2">
                    {Object.entries(predictions.predictions).map(([model, value]) => (
                      <li key={model} className="flex justify-between items-center">
                        <span>{model}</span>
                        <span className="font-semibold">${value.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-100 p-4 rounded-lg flex items-center justify-between">
                  <h3 className="font-semibold text-purple-800">Decision</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-purple-600">{predictions.decision}</span>
                    {getDecisionIcon(predictions.decision)}
                  </div>
                </div>
              </>
            )}
            {!predictions && !loading && <div className="text-center text-gray-500">No predictions available</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
