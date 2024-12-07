import React, { useState, useEffect } from 'react';

const Navbar = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/get-images', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch the images');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'stock_price_plots.zip';
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg' : 'bg-gradient-to-r from-blue-600 to-blue-800'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <span className={`text-2xl font-bold tracking-wider transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-white'}`}>
            Stock<span className="text-blue-100">Predict</span>
          </span>
          <div className="hidden md:flex space-x-6 items-center">
            <button 
              className={`transition-colors duration-300 hover:text-blue-400 ${isScrolled ? 'text-white' : 'text-white'}`}
              onClick={() => onNavigate('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isScrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading...
                </span>
              ) : (
                'Download Images'
              )}
            </button>
          </div>
          <button
            className="md:hidden text-3xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-56' : 'max-h-0'} overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800`}>
        <div className="container mx-auto px-4 py-2 space-y-2">
          <button 
            className="block w-full text-left py-2 text-white hover:text-blue-600 transition-colors duration-300"
            onClick={() => {
              onNavigate('dashboard');
              setIsMenuOpen(false);
            }}
          >
            Dashboard
          </button>
          <button
            className={`w-full px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            onClick={() => {
              handleDownload();
              setIsMenuOpen(false);
            }}
            disabled={loading}
          >
            {loading ? 'Downloading...' : 'Download Images'}
          </button>
        </div>
      </div>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 absolute bottom-0 left-0 right-0" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
