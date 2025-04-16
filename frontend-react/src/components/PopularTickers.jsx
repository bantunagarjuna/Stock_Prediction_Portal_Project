import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const PopularTickers = ({ onTickerSelect }) => {
  // Popular stock tickers that work with yfinance
  const tickers = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'GOOGL', name: 'Alphabet' },
    { symbol: 'AMZN', name: 'Amazon' },
    { symbol: 'META', name: 'Meta Platforms' },
    { symbol: 'TSLA', name: 'Tesla' },
    { symbol: 'NVDA', name: 'NVIDIA' },
    { symbol: 'JPM', name: 'JPMorgan Chase' }
  ];

  return (
    <div className="card bg-dark text-light mb-4 shadow border-0">
      <div className="card-body p-4">
        <h3 className="mb-4">
          <FontAwesomeIcon icon={faChartLine} className="me-2 text-info" />
          Popular Tickers
        </h3>
        <div className="row">
          {tickers.map((ticker, index) => (
            <div className="col-6 col-md-3 mb-3" key={index}>
              <div 
                className="card bg-secondary text-light border-0 h-100 shadow-sm"
                role="button"
                onClick={() => onTickerSelect(ticker.symbol)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="card-body p-3 text-center">
                  <h5 className="card-title text-info mb-1">{ticker.symbol}</h5>
                  <p className="card-text small mb-0">{ticker.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTickers;