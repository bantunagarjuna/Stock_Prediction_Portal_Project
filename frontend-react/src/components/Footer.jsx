import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faChartLine } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <>
            <footer className="mt-5 py-3 bg-dark text-light rounded-top shadow">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="mb-0">
                                <FontAwesomeIcon icon={faChartLine} className="me-2 text-info" />
                                Stock Prediction Portal &copy; {new Date().getFullYear()} - Built with {' '}
                                <FontAwesomeIcon icon={faHeart} className="text-danger mx-1" /> by Bantu Nagarjuna
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer