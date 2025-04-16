import React, {useEffect, useState, useRef, useContext} from 'react'
import axiosInstance from '../../axiosInstance' // Adjust path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faChartLine, faSearch, faInfoCircle, faChartBar, faHistory } from '@fortawesome/free-solid-svg-icons'
import PopularTickers from '../PopularTickers'
import StockCategories from '../StockCategories'
import PredictionExplainer from '../PredictionExplainer'
import History from '../History'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider' // Adjust path as needed

const Dashboard = () => {
    const [ticker, setTicker] = useState('')
    const [error, setError] = useState('')
    const [plot, setPlot] = useState('')
    const [plot_100, setPlot_100] = useState('')
    const [plot_200, setPlot_200] = useState('')
    const [prediction, setprediction] = useState('')
    const [mse, setmse] = useState('')
    const [rmse, setrmse] = useState('')
    const [r2, setr2] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentTicker, setCurrentTicker] = useState('')
    
    // Get auth context
    const { isLoggedIn } = useContext(AuthContext);
    
    // Reference to the top of the dashboard
    const dashboardTopRef = useRef(null);
    
    // Get location and navigate from react-router
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
        // Skip if not logged in
        if (!isLoggedIn) return;
        
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/protected-view/')
                console.log('Protected data fetched successfully')
            } catch (error) {
                console.error('Error fetching protected data:', error)
            }
        }

        fetchProtectedData();
        
        // When the location changes to exactly "/dashboard" (no params), reset the ticker
        if (location.pathname === '/dashboard' && !location.search) {
            console.log("Resetting current ticker - clean dashboard URL");
            setCurrentTicker('');
            setTicker('');
        } 
        // Otherwise, check for ticker param
        else {
            const urlParams = new URLSearchParams(location.search);
            const tickerParam = urlParams.get('ticker');
            if (tickerParam) {
                console.log("Found ticker param:", tickerParam);
                // Set the ticker input value
                setTicker(tickerParam);
                // Submit the form with this ticker
                handleSubmitWithTicker(tickerParam);
            }
        }
    }, [location.pathname, location.search, isLoggedIn]);
    
    // Function to scroll to the top of the dashboard
    const scrollToTop = () => {
        if (dashboardTopRef.current) {
            dashboardTopRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // Fallback if ref isn't available
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Function to update URL with ticker
    const updateUrlWithTicker = (tickerSymbol) => {
        // Update the URL to reflect the current ticker without reloading the page
        const newUrl = `/dashboard?ticker=${tickerSymbol}`;
        navigate(newUrl, { replace: false });
    };

    // Function to handle ticker selection from components
    const handleTickerSelect = (selectedTicker) => {
        console.log("Dashboard: Ticker selected:", selectedTicker);
        setTicker(selectedTicker);
        
        // Update URL with ticker
        updateUrlWithTicker(selectedTicker);
        
        // Scroll to the top of the dashboard
        scrollToTop();
        
        // Directly trigger the form submission
        handleSubmitWithTicker(selectedTicker);
    };

    // Function to handle form submission (for manual entry)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Update URL when submitting the form
        updateUrlWithTicker(ticker);
        
        await handleSubmitWithTicker(ticker);
    };

    // Function to handle direct submissions with a ticker value
    const handleSubmitWithTicker = async (tickerValue) => {
        setLoading(true);

        try {
            const response = await axiosInstance.post('/predict/', {
                ticker: tickerValue
            });

            setError("");
            setCurrentTicker(tickerValue.toUpperCase());

            // Save search to history in localStorage
            console.log("Saving search to history:", tickerValue.toUpperCase());
            const storedHistory = localStorage.getItem('tickerSearchHistory');
            let searchHistory = storedHistory ? JSON.parse(storedHistory) : [];
            
            // Remove duplicate if exists
            searchHistory = searchHistory.filter(item => item !== tickerValue.toUpperCase());
            
            // Add to beginning
            searchHistory.unshift(tickerValue.toUpperCase());
            
            // Limit to 10 items
            if (searchHistory.length > 10) searchHistory.pop();
            
            console.log("New search history:", searchHistory);
            localStorage.setItem('tickerSearchHistory', JSON.stringify(searchHistory));

            console.log("Response data:", response.data);
            setmse(response.data.mse);
            setrmse(response.data.rmse);
            setr2(response.data.r2);
            
            // Construct image URLs correctly
            const backendroot = import.meta.env.VITE_BACKEND_ROOT || 'http://127.0.0.1:8000';
            console.log("Backend root:", backendroot);
            
            // Ensure proper URL construction
            const baseUrl = backendroot.endsWith('/') ? backendroot : `${backendroot}/`;
            
            // Handle paths with or without leading slashes
            const plotPath = response.data.plot_img.startsWith('/') ? response.data.plot_img.substring(1) : response.data.plot_img;
            const plotUrl = `${baseUrl}${plotPath}`;
            console.log("Plot URL:", plotUrl);
            setPlot(plotUrl);
            
            const plot100Path = response.data.plot_img_100dma.startsWith('/') ? response.data.plot_img_100dma.substring(1) : response.data.plot_img_100dma;
            const plot_100Url = `${baseUrl}${plot100Path}`;
            console.log("Plot 100 URL:", plot_100Url);
            setPlot_100(plot_100Url);
            
            const plot200Path = response.data.plot_img_200dma.startsWith('/') ? response.data.plot_img_200dma.substring(1) : response.data.plot_img_200dma;
            const plot_200Url = `${baseUrl}${plot200Path}`;
            console.log("Plot 200 URL:", plot_200Url);
            setPlot_200(plot_200Url);
            
            const predictionPath = response.data.plot_prediction.startsWith('/') ? response.data.plot_prediction.substring(1) : response.data.plot_prediction;
            const plot_predictionUrl = `${baseUrl}${predictionPath}`;
            console.log("Prediction URL:", plot_predictionUrl);
            setprediction(plot_predictionUrl);
            
        } catch (error) {
            console.error(error);
            console.log("Data Error");
            setError("Data not found for the specified ticker");
        } finally {
            setLoading(false);
        }
    };

    // Function to render search history for the dashboard
    const renderSearchHistory = () => {
        try {
            const storedHistory = localStorage.getItem('tickerSearchHistory');
            if (!storedHistory) return null;
            
            const searchHistory = JSON.parse(storedHistory).slice(0, 5);
            if (searchHistory.length === 0) return null;
            
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
                                    onClick={() => handleTickerSelect(ticker)}
                                >
                                    <FontAwesomeIcon icon={faSearch} className="me-2" />
                                    {ticker}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } catch (error) {
            console.error("Error rendering search history:", error);
            return null;
        }
    };

    return (
        <>
            <div className='container' id="dashboard-top" ref={dashboardTopRef}>
                <div className="card bg-dark text-light mb-4 shadow border-0">
                    <div className="card-body p-4">
                        <h2 className="text-center mb-4">
                            <FontAwesomeIcon icon={faChartLine} className="me-2 text-info" />
                            Stock Price Predictor
                        </h2>
                        
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <form onSubmit={handleSubmit} className="mb-4">
                                    <div className="input-group">
                                        <span className="input-group-text bg-secondary text-light border-0">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </span>
                                        <input 
                                            type="text" 
                                            className="form-control bg-light"
                                            placeholder="Enter Stock Ticker (e.g., AAPL, MSFT, GOOGL)" 
                                            value={ticker}
                                            onChange={(e) => setTicker(e.target.value)} 
                                            required
                                        />
                                        <button 
                                            type="submit" 
                                            className="btn btn-info"
                                            disabled={loading}
                                        > 
                                            {loading ? (
                                                <>
                                                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>Predict</>
                                            )}
                                        </button>
                                    </div>
                                    {error && (
                                        <div className="alert alert-danger mt-3">
                                            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                                            {error}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                {currentTicker ? (
                    <>
                        <div className="card bg-dark text-light mb-4 shadow border-0">
                            <div className="card-body p-4">
                                <h3 className="mb-4 text-info">
                                    <FontAwesomeIcon icon={faChartBar} className="me-2" />
                                    Analysis for {currentTicker}
                                </h3>
                                
                                <div className="row mb-4">
                                    <div className="col-md-4 mb-4">
                                        <div className="card bg-secondary text-light h-100 border-0">
                                            <div className="card-header bg-info text-dark">
                                                <h5 className="mb-0">Model Performance</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                    <strong>MSE:</strong>
                                                    <span>{mse}</span>
                                                </div>
                                                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                    <strong>RMSE:</strong>
                                                    <span>{rmse}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <strong>R² Score:</strong>
                                                    <span>{r2}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8 mb-4">
                                        <div className="card bg-secondary text-light h-100 border-0">
                                            <div className="card-header bg-info text-dark">
                                                <h5 className="mb-0">Price Prediction</h5>
                                            </div>
                                            <div className="card-body p-0">
                                                {prediction && (
                                                    <img 
                                                        src={prediction} 
                                                        alt="Price Prediction" 
                                                        className="img-fluid rounded" 
                                                        onError={(e) => {
                                                            console.error("Error loading prediction image:", prediction);
                                                            e.target.onerror = null;
                                                            e.target.alt = "Error loading prediction image";
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <div className="card bg-dark text-light h-100 shadow border-0">
                                    <div className="card-header bg-info text-dark">
                                        <h5 className="mb-0">Historical Price</h5>
                                    </div>
                                    <div className="card-body p-0">
                                        {plot && (
                                            <img 
                                                src={plot} 
                                                alt="Historical Plot" 
                                                className="img-fluid rounded"
                                                onError={(e) => {
                                                    console.error("Error loading historical image:", plot);
                                                    e.target.onerror = null;
                                                    e.target.alt = "Error loading historical image";
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="card bg-dark text-light h-100 shadow border-0">
                                    <div className="card-header bg-info text-dark">
                                        <h5 className="mb-0">100-Day Moving Average</h5>
                                    </div>
                                    <div className="card-body p-0">
                                        {plot_100 && (
                                            <img 
                                                src={plot_100} 
                                                alt="100-Day Moving Average" 
                                                className="img-fluid rounded"
                                                onError={(e) => {
                                                    console.error("Error loading 100-day image:", plot_100);
                                                    e.target.onerror = null;
                                                    e.target.alt = "Error loading 100-day image";
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="card bg-dark text-light h-100 shadow border-0">
                                    <div className="card-header bg-info text-dark">
                                        <h5 className="mb-0">200-Day Moving Average</h5>
                                    </div>
                                    <div className="card-body p-0">
                                        {plot_200 && (
                                            <img 
                                                src={plot_200} 
                                                alt="200-Day Moving Average" 
                                                className="img-fluid rounded"
                                                onError={(e) => {
                                                    console.error("Error loading 200-day image:", plot_200);
                                                    e.target.onerror = null;
                                                    e.target.alt = "Error loading 200-day image";
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Show these components when no ticker is being analyzed */}
                        {renderSearchHistory()}
                        <PopularTickers onTickerSelect={handleTickerSelect} />
                        <StockCategories onTickerSelect={handleTickerSelect} />
                        <PredictionExplainer />
                    </>
                )}
            </div>
        </>
    )
}

export default Dashboard