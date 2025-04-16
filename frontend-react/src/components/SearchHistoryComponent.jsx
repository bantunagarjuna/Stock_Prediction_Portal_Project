import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchHistory = ({ onTickerSelect }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  
  // Load search history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem('tickerSearchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory).slice(0, 5)); // Limited to last 5 searches
    }
  }, []);
  
  // If there's no history yet, don't show this component
  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="card bg-dark text-light mb-4 shadow border-0">
      <div className="card-body p-4">
        <h3 className="mb-3">
          <FontAwesomeIcon icon={faHistory} className="me-2 text-info" />
          Recent Searches
        </h3>
        <div className="d-flex flex-wrap gap-2">
          {searchHistory.map((ticker, index) => (
            <button 
              key={index} 
              className="btn btn-outline-secondary"
              onClick={() => onTickerSelect(ticker)}
            >
              <FontAwesomeIcon icon={faSearch} className="me-2" />
              {ticker}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;