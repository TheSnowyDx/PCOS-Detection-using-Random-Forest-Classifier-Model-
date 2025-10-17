import React, { useState } from 'react';
import './PCOSForm.css';

const PCOSForm = () => {
  const [formData, setFormData] = useState({
    bmi: '',
    cycle: '',
    fsh_lh: '',
    lh: '',
    amh: '',
    follicle_l: '',
    follicle_r: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedData = {
      bmi: parseFloat(formData.bmi),
      cycle: parseInt(formData.cycle),
      fsh_lh: parseFloat(formData.fsh_lh),
      lh: parseFloat(formData.lh),
      amh: parseFloat(formData.amh),
      follicle_l: parseInt(formData.follicle_l),
      follicle_r: parseInt(formData.follicle_r),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/predict/pcos', {
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
              <h1>PCOS</h1>
              <p>
                Polycystic ovary syndrome (PCOS) is a problem with hormones that
                happens during the reproductive years. If you have PCOS, you may
                not have periods very often. Or you may have periods that last
                many days. You may also have too much of a hormone called
                androgen in your body.
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
                <h1>PCOS Prediction</h1>
              </div>
              <div className="attributes">
                <div className="left-attributes">
                  <div className="f1">
                    <label className="f-b-label" htmlFor="cycle">
                      CYCLE:
                    </label>
                    <input
                      type="number"
                      name="cycle"
                      value={formData.cycle}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                  <div className="f1">
                    <label className="f-b-label" htmlFor="fsh_lh">
                      FSH/LH RATIO:
                    </label>
                    <input
                      type="number"
                      name="fsh_lh"
                      value={formData.fsh_lh}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                  <div className="f1">
                    <label className="block font-semibold mb-1" htmlFor="lh">
                      LH:
                    </label>
                    <input
                      type="number"
                      name="lh"
                      value={formData.lh}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                  <div className="f1">
                    <label className="block font-semibold mb-1" htmlFor="bmi">
                      BMI:
                    </label>
                    <input
                      type="number"
                      name="bmi"
                      value={formData.bmi}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                </div>

                <div className="right-attributes">
                  <div className="f1">
                    <label className="block font-semibold mb-1" htmlFor="amh">
                      AMH:
                    </label>
                    <input
                      type="number"
                      name="amh"
                      value={formData.amh}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                  <div className="f2">
                    <label
                      className="block font-semibold mb-1"
                      htmlFor="follicle_l"
                    >
                      FOLLICLE L:
                    </label>
                    <input
                      type="number"
                      name="follicle_l"
                      value={formData.follicle_l}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                  <div className="f2">
                    <label
                      className="block font-semibold mb-1"
                      htmlFor="follicle_r"
                    >
                      FOLLICLE R:
                    </label>
                    <input
                      type="number"
                      name="follicle_r"
                      value={formData.follicle_r}
                      onChange={handleChange}
                      className="f-b-attributes"
                    />
                  </div>
                </div>
              </div>

              <div className="buttons-div">
                <button type="submit" className="button1">
                  Predict
                </button>
                <button
                  type="button"
                  className="button2"
                  onClick={() =>
                    setFormData({
                      bmi: '',
                      cycle: '',
                      fsh_lh: '',
                      lh: '',
                      amh: '',
                      follicle_l: '',
                      follicle_r: '',
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

export default PCOSForm;
