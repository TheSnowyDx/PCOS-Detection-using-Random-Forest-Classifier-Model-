from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

model = joblib.load("pcos_model.pkl")
scaler = joblib.load("scaler.pkl")

model2 = joblib.load("pcod_model.pkl")
scaler2 = joblib.load("pcod_scaler.pkl")

# Allow CORS (Cross-Origin Requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from all origins (frontend)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

class InputData(BaseModel):
    bmi: float
    cycle: int
    fsh_lh: float
    lh: float
    amh: float
    follicle_l: int
    follicle_r: int

@app.post("/predict/pcos")
def predict(data: InputData):
    # Convert input data to numpy array
    input_values = np.array([[data.bmi, data.cycle, data.fsh_lh,
                              data.lh, data.amh,
                              data.follicle_l, data.follicle_r,]])

    input_values = scaler.transform(input_values)  # Apply scaling

    # Make prediction
    prediction = model.predict(input_values)
    result = "PCOS Detected" if prediction[0] == 1 else "No PCOS"

    return {"prediction": result}



# This is for PCOD prediciton

class InputDataPCOD(BaseModel):
    bmi: float
    cycle_length: int
    irregular_periods: int
    hair_growth: int
    skin_darkening: int
    amh_level: float
    lh_fsh_ratio: float
    follicle_no_r: int

@app.post("/predict/pcod")
def predict_pcod(data: InputDataPCOD):
    input_values = np.array([[data.bmi, data.cycle_length, data.irregular_periods,
                              data.hair_growth, data.skin_darkening,
                              data.amh_level, data.lh_fsh_ratio, data.follicle_no_r]])
    input_values = scaler2.transform(input_values)
    prediction = model2.predict(input_values)
    result = "PCOD Detected" if prediction[0] == 1 else "No PCOD"
    return {"prediction": result}



print('Program Succesfully Executed')
