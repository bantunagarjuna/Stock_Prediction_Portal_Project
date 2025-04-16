import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry, faLaptop, faPills, faCreditCard, faShoppingCart, faOilCan } from '@fortawesome/free-solid-svg-icons';

const StockCategories = ({ onTickerSelect }) => {
  // Categories with sample tickers for each
  const categories = [
    {
      name: 'Technology',
      icon: faLaptop,
      color: 'info',
      tickers: ['AAPL', 'MSFT', 'GOOGL']
    },
    {
      name: 'Healthcare',
      icon: faPills,
      color: 'danger',
      tickers: ['JNJ', 'PFE', 'UNH']
    },
    {
      name: 'Financial',
      icon: faCreditCard,
      color: 'light',
      tickers: ['JPM', 'BAC', 'GS']
    },
    {
      name: 'Consumer',
      icon: faShoppingCart,
      color: 'warning',
      tickers: ['AMZN', 'WMT', 'PG']
    },
    {
      name: 'Energy',
      icon: faOilCan,
      color: 'primary',
      tickers: ['XOM', 'CVX', 'COP']
    }
  ];

  return (
    <div className="card bg-dark text-light mb-4 shadow border-0">
      <div className="card-body p-4">
        <h3 className="mb-4">
          <FontAwesomeIcon icon={faIndustry} className="me-2 text-info" />
          Market Sectors
        </h3>
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card bg-secondary text-light border-0 h-100">
                <div className="card-header bg-dark d-flex align-items-center">
                  <FontAwesomeIcon icon={category.icon} className={`text-${category.color} me-2`} />
                  <h5 className="mb-0">{category.name}</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    {category.tickers.map((ticker, i) => (
                      <button 
                        key={i} 
                        className={`btn btn-sm btn-outline-${category.color}`}
                        onClick={() => onTickerSelect(ticker)}
                      >
                        {ticker}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockCategories;