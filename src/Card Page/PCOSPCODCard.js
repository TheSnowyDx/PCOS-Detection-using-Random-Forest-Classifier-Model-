import React from 'react';
import './PCOSPCODCards.css';
import { useNavigate } from 'react-router-dom';
import '../PCOS Form Page/PCOSForm';
import '../PCOD Form Page/PCODForm'

const PCOSPCODCards = () => {

    const navigate = useNavigate();

  return (
    <div className="card-container">
      <div className="card">
        <h2 className="card-title">PCOS</h2>
        <p className="card-description">
          PCOS (Polycystic Ovary Syndrome) is a hormonal disorder causing enlarged ovaries with small cysts on the outer edges.
        </p>
        <button onClick={() => navigate('/pcos-form')} className="card-button">Click</button>
      </div>

      <div className="card">
        <h2 className="card-title">PCOD</h2>
        <p className="card-description">
          PCOD (Polycystic Ovarian Disease) affects the ovaries and causes hormonal imbalances, irregular periods, and weight gain.
        </p>
        <button onClick={() => navigate('/pcod-form')} className="card-button">Click</button>
      </div>
    </div>
  );
};

export default PCOSPCODCards;
