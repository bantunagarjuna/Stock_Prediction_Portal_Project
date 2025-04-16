import React from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faArrowRight, faChartBar, faLightbulb, faSearch } from '@fortawesome/free-solid-svg-icons';
import PredictionExplainer from './PredictionExplainer';
import { useNavigate } from 'react-router-dom';
import History from './History';  // Adjust path if needed

const Main = () => {
    const navigate = useNavigate();
    
    // Popular stock tickers for quick access
    const popularTickers = [
        { symbol: 'AAPL', name: 'Apple' },
        { symbol: 'MSFT', name: 'Microsoft' },
        { symbol: 'GOOGL', name: 'Alphabet' },
        { symbol: 'AMZN', name: 'Amazon' }
    ];
    
    const handleTickerSelect = (ticker) => {
        navigate(`/dashboard?ticker=${ticker}`);
    };

    return (
        <>
            <div className='container'>
                <div className='p-5 mb-4 bg-dark text-light text-center rounded shadow'>
                    <h1 className='display-4 fw-bold mb-3'>
                        <FontAwesomeIcon icon={faChartLine} className="me-2" />
                        Stock Prediction Portal
                    </h1>
                    <p className='lead mb-4'>
                        Harness the power of advanced machine learning to predict stock market trends and make informed investment decisions. Our platform provides accurate forecasts based on historical data analysis.
                    </p>
                    <Button 
                        text={<>
                            <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                            Get Started
                        </>} 
                        class='btn-info btn-lg' 
                        url="/dashboard" 
                    />
                </div>
                
                {/* Search History Section */}
                <History />
                
                {/* Quick Ticker Access */}
                <div className="card bg-dark text-light mb-4 shadow border-0">
                    <div className="card-body p-4">
                        <h3 className="mb-3">
                            <FontAwesomeIcon icon={faSearch} className="me-2 text-info" />
                            Popular Tickers
                        </h3>
                        <div className="row">
                            {popularTickers.map((ticker, index) => (
                                <div className="col-6 col-md-3 mb-3" key={index}>
                                    <div 
                                        className="card bg-secondary text-light border-0 shadow-sm h-100"
                                        role="button"
                                        onClick={() => handleTickerSelect(ticker.symbol)}
                                        style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <div className="card-body p-3 text-center">
                                            <h5 className="text-info mb-0">{ticker.symbol}</h5>
                                            <small>{ticker.name}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-2">
                            <Button 
                                text="View All Tickers" 
                                class='btn-link text-info' 
                                url="/dashboard" 
                            />
                        </div>
                    </div>
                </div>
                
                {/* Features Section */}
                <div className="row mb-4">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 bg-dark text-light border-0 shadow">
                            <div className="card-body text-center">
                                <FontAwesomeIcon icon={faChartBar} className="text-info mb-3" style={{fontSize: '3rem'}} />
                                <h3 className="card-title">Data Visualization</h3>
                                <p className="card-text">View interactive charts and visualizations of stock performance and price trends over time.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 bg-dark text-light border-0 shadow">
                            <div className="card-body text-center">
                                <FontAwesomeIcon icon={faLightbulb} className="text-warning mb-3" style={{fontSize: '3rem'}} />
                                <h3 className="card-title">Predictive Analysis</h3>
                                <p className="card-text">Access machine learning predictions for future stock price movements based on historical patterns.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 bg-dark text-light border-0 shadow">
                            <div className="card-body text-center">
                                <FontAwesomeIcon icon={faSearch} className="text-info mb-3" style={{fontSize: '3rem'}} />
                                <h3 className="card-title">Stock Lookup</h3>
                                <p className="card-text">Search any ticker to instantly get performance metrics and prediction analysis.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* How it works section */}
                <PredictionExplainer />
            </div>
        </>
    );
};

export default Main;