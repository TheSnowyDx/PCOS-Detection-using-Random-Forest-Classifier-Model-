import React, { useState } from 'react';
import '../PCOS Form Page/PCOSForm.css'
// import './PCOSForm.css'; // You can rename if you like

const PCODForm = () => {
  const [formData, setFormData] = useState({
    bmi: '',
    cycle_length: '',
    irregular_periods: 'No',
    hair_growth: 'No',
    skin_darkening: 'No',
    amh_level: '',
    lh_fsh_ratio: '',
    follicle_no_r: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const convertToBinary = (value) => (value === 'Yes' ? 1 : 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedData = {
      bmi: parseFloat(formData.bmi),
      cycle_length: parseInt(formData.cycle_length),
      irregular_periods: convertToBinary(formData.irregular_periods),
      hair_growth: convertToBinary(formData.hair_growth),
      skin_darkening: convertToBinary(formData.skin_darkening),
      amh_level: parseFloat(formData.amh_level),
      lh_fsh_ratio: parseFloat(formData.lh_fsh_ratio),
      follicle_no_r: parseInt(formData.follicle_no_r),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/predict/pcod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPrediction('Error fetching prediction');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-white">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="outer-div">
          <div className="main-div">
            <div className="left-div">
              <h1>PCOD</h1>
              <p>
                Polycystic Ovarian Disease (PCOD) affects hormone levels and ovulation. Early diagnosis
                and lifestyle modifications can help manage symptoms like irregular periods, hair growth, and weight gain.
              </p>

              {prediction !== null && (
                <div
                  className="mt-4 text-center font-semibold"
                  style={{
                    color: 'black',
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                >
                  Prediction: {prediction}
                </div>
              )}
            </div>

            <div className="right-div">
              <div className="heading-div">
                <h1>PCOD Prediction</h1>
              </div>
              <div className="attributes">
                <div className="left-attributes">
                  <div className="f1">
                    <label className="f-b-label" htmlFor="bmi">BMI:</label>
                    <input
                      type="number"
                      name="bmi"
                      value={formData.bmi}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                  <div className="f1">
                    <label className="f-b-label" htmlFor="cycle_length">Cycle Length:</label>
                    <input
                      type="number"
                      name="cycle_length"
                      value={formData.cycle_length}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                  <div className="f1">
                    <label className="f-b-label" htmlFor="irregular_periods">Irregular Periods:</label>
                    <select
                      name="irregular_periods"
                      value={formData.irregular_periods}
                      onChange={handleChange}
                      className="f-b-attributes"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  <div className="f1">
                    <label className="f-b-label" htmlFor="hair_growth">Excess Hair Growth:</label>
                    <select
                      name="hair_growth"
                      value={formData.hair_growth}
                      onChange={handleChange}
                      className="f-b-attributes"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>

                <div className="right-attributes">
                  <div className="f1">
                    <label className="f-b-label" htmlFor="skin_darkening">Skin Darkening:</label>
                    <select
                      name="skin_darkening"
                      value={formData.skin_darkening}
                      onChange={handleChange}
                      className="f-b-attributes"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  <div className="f1">
                    <label className="f-b-label" htmlFor="amh_level">AMH Level:</label>
                    <input
                      type="number"
                      name="amh_level"
                      value={formData.amh_level}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                  <div className="f1">
                    <label className="f-b-label" htmlFor="lh_fsh_ratio">LH/FSH Ratio:</label>
                    <input
                      type="number"
                      name="lh_fsh_ratio"
                      value={formData.lh_fsh_ratio}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                  <div className="f1">
                    <label className="f-b-label" htmlFor="follicle_no_r">Follicle (Right):</label>
                    <input
                      type="number"
                      name="follicle_no_r"
                      value={formData.follicle_no_r}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                </div>
              </div>

              <div className="buttons-div">
                <button type="submit" className="button1">Predict</button>
                <button
                  type="button"
                  className="button2"
                  onClick={() =>
                    setFormData({
                      bmi: '',
                      cycle_length: '',
                      irregular_periods: 'No',
                      hair_growth: 'No',
                      skin_darkening: 'No',
                      amh_level: '',
                      lh_fsh_ratio: '',
                      follicle_no_r: '',
                    })
                  }
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PCODForm;
