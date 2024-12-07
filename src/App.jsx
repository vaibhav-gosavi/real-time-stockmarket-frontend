// src/App.js
// import './index.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import PredictionChart from './components/PredictionChart';

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [predictions, setPredictions] = useState({});

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  return (
    <div className="bg-gray-100">
      <Navbar onNavigate={handleNavigation} />
      {activePage === 'dashboard' && <Dashboard setPredictions={setPredictions} />}
      {activePage === 'analysis' && <div>Analysis Page</div>}
      {activePage === 'historical' && <div>Historical Page</div>}
      <PredictionChart predictions={predictions} />
      <Footer />
    </div>
  );
};

export default App;
