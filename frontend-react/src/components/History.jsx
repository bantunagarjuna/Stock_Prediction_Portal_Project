import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("History component mounting");
        const storedHistory = localStorage.getItem('tickerSearchHistory');
        console.log("Retrieved history:", storedHistory);
        
        if (storedHistory) {
            try {
                const parsedHistory = JSON.parse(storedHistory);
                console.log("Parsed history:", parsedHistory);
                setSearchHistory(parsedHistory.slice(0, 4));
            } catch (error) {
                console.error("Error parsing search history:", error);
            }
        }
    }, []);
    
    const handleTickerSelect = (ticker) => {
        navigate(`/dashboard?ticker=${ticker}`);
    };

    // If there's no history, don't render anything
    if (searchHistory.length === 0) {
        console.log("No search history to display");
        return null;
    }

    console.log("Rendering search history:", searchHistory);
    return (
        <div className="card bg-dark text-light mb-4 shadow border-0">
            <div className="card-body p-4">
                <h3 className="mb-3">
                    <FontAwesomeIcon icon={faHistory} className="me-2 text-info" />
                    Your Recent Searches
                </h3>
                <div className="row">
                    {searchHistory.map((ticker, index) => (
                        <div className="col-6 col-md-3 mb-2" key={index}>
                            <div 
                                className="card bg-secondary text-light border-0 shadow-sm"
                                role="button"
                                onClick={() => handleTickerSelect(ticker)}
                                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div className="card-body py-2 text-center">
                                    <FontAwesomeIcon icon={faSearch} className="me-2" />
                                    <strong>{ticker}</strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default History;