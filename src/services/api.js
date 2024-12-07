// src/services/api.js

export const fetchPrediction = async (stockSymbol) => {
    const response = await fetch(`http://localhost:8000/predict/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock_symbol: stockSymbol }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch predictions');
    }
    return response.json();
  };
  