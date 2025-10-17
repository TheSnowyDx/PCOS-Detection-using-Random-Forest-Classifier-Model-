import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import backgroundImage from '../Image/background.jpg';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="wp-main-div"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="caption">
        <p>
          Welcome to the PCOS Prediction Tool – Take the first step towards
          understanding your health.....
        </p>
      </div>

      <div className="prediction-button">
        <button onClick={() => navigate('/pcospcodcard')} className='button-style'>
          Start Prediction
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
