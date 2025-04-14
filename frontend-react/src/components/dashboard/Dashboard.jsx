import React, {useEffect, useState} from 'react'
import axiosInstance from '../../axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

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
  
  const Token = localStorage.getItem('access')
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get('/protected-view/')
        console.log('Protected data fetched successfully')
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching protected data:', error)
      }
    }

    fetchProtectedData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await axiosInstance.post('/predict/', {
        ticker
      });

      setError("")

      console.log(response.data)
      setmse(response.data.mse)
      setrmse(response.data.rmse)
      setr2(response.data.r2)
      const backendroot = import.meta.env.VITE_BACKEND_ROOT
      const plotUrl = `${backendroot}${response.data.plot_img}`
      setPlot(plotUrl)

      const plot_100Url = `${backendroot}${response.data.plot_img_100dma}`
      setPlot_100(plot_100Url)

      const plot_200Url = `${backendroot}${response.data.plot_img_200dma}`
      setPlot_200(plot_200Url)

      const plot_predictionUrl = `${backendroot}${response.data.plot_prediction}`
      setprediction(plot_predictionUrl)
      
    } catch (error) {
      console.error(error)
      console.log("Data Error")
      setError("Data not found for the Specified Ticker")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <form onSubmit={handleSubmit}>
              <input type="text" className='form-control' placeholder='Enter Stock Ticker' 
              onChange={(e) => setTicker(e.target.value)} required/>
              <small>{error && <div className="text-danger">{error}</div>}</small>
            {loading ? (<button className='btn btn-info mt-2' disabled> <FontAwesomeIcon icon={faSpinner} spin />Predicting...</button>) :
                                (<button type='submit' className='btn btn-info mt-2'> See Prediction </button>)
                                }
            </form>
          </div>

          <div className="prediction">
            <div className="p-5">
              {plot && <img src={plot} alt="Prediction Plot" style={{ width: '100%' }}/>}
            </div>
          
            <div className="p-5">
              {plot_100 && <img src={plot_100} alt="Prediction Plot" style={{ width: '100%' }}/>}
            </div>
          
            <div className="p-5">
              {plot_200 && <img src={plot_200} alt="Prediction Plot" style={{ width: '100%' }}/>}
            </div>

            <div className="p-5">
              {prediction && <img src={prediction} alt="Prediction Plot" style={{ width: '100%' }}/>}
            </div>
          </div>
          <div className='text-light p-3'>
              <h4>Model Metrics</h4>
              <p>MSE: {mse}</p>
              <p>RMSE: {rmse}</p>
              <p>R2: {r2}</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
