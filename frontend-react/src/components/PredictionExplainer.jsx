import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faChartLine, faCalendarAlt, faRobot } from '@fortawesome/free-solid-svg-icons';

const PredictionExplainer = () => {
  return (
    <div className="card bg-dark text-light mb-4 shadow border-0">
      <div className="card-body p-4">
        <h3 className="mb-4">
          <FontAwesomeIcon icon={faBrain} className="me-2 text-info" />
          How Our Predictions Work
        </h3>
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card bg-secondary h-100 border-0 text-center p-3">
              <FontAwesomeIcon icon={faChartLine} className="text-info mb-3" style={{fontSize: '2.5rem'}} />
              <h5>Historical Analysis</h5>
              <p className="small">We analyze historical stock data from reliable sources to identify patterns and trends.</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-secondary h-100 border-0 text-center p-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-warning mb-3" style={{fontSize: '2.5rem'}} />
              <h5>Moving Averages</h5>
              <p className="small">Our system calculates 100-day and 200-day moving averages to identify support and resistance levels.</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-secondary h-100 border-0 text-center p-3">
              <FontAwesomeIcon icon={faRobot} className="text-danger mb-3" style={{fontSize: '2.5rem'}} />
              <h5>Machine Learning</h5>
              <p className="small">Advanced algorithms process this data to generate predictive models with high accuracy.</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-secondary h-100 border-0 text-center p-3">
              <FontAwesomeIcon icon={faBrain} className="text-success mb-3" style={{fontSize: '2.5rem'}} />
              <h5>Model Evaluation</h5>
              <p className="small">We evaluate our predictions using MSE, RMSE, and R2 metrics to ensure quality.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionExplainer;