"""
main.py
=======
FastAPI backend for the AI-Based Multiple Disease Prediction System.

Endpoints:
  GET  /                    → Health check
  POST /predict/diabetes    → Diabetes prediction
  POST /predict/heart       → Heart disease prediction
  POST /predict/parkinsons  → Parkinson's disease prediction
  POST /predict/breast-cancer → Breast cancer prediction
  POST /predict/liver       → Liver disease prediction
  POST /predict/kidney      → Kidney disease prediction
  POST /predict/stroke      → Stroke prediction
  POST /predict/pneumonia   → Pneumonia prediction
  POST /predict/anemia      → Anemia prediction
"""

import os
import pickle
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# ─── App Setup ────────────────────────────────────────────────────────────────
app = FastAPI(
    title="MediPredict AI — Multiple Disease Prediction API",
    description="Predict 9 diseases using trained Random Forest models",
    version="1.0.0",
)

# CORS: allow React frontend (Vite default port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Model Loading ───────────────────────────────────────────────────────────
MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")


def load_model(filename: str):
    """Load a model + scaler dict from a .pkl file."""
    path = os.path.join(MODELS_DIR, filename)
    if not os.path.exists(path):
        raise HTTPException(
            status_code=500,
            detail=f"Model file '{filename}' not found. Run train_models.py first.",
        )
    with open(path, "rb") as f:
        return pickle.load(f)


def predict_disease(model_file: str, features: list, disease_name: str, positive_msg: str, negative_msg: str):
    """Common prediction logic for all diseases."""
    bundle = load_model(model_file)
    model = bundle["model"]
    scaler = bundle["scaler"]

    # Scale features using the same scaler used during training
    X = np.array(features).reshape(1, -1)
    X_scaled = scaler.transform(X)

    # Get prediction and confidence
    prediction = int(model.predict(X_scaled)[0])
    probabilities = model.predict_proba(X_scaled)[0]
    confidence = float(max(probabilities))

    message = positive_msg if prediction == 1 else negative_msg

    return {
        "prediction": prediction,
        "confidence": round(confidence * 100, 2),
        "message": message,
        "disease": disease_name,
    }


# ─── Health Check ─────────────────────────────────────────────────────────────
@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "MediPredict AI — Multiple Disease Prediction API",
        "version": "1.0.0",
    }


# ══════════════════════════════════════════════════════════════════════════════
# INPUT SCHEMAS (Pydantic models)
# ══════════════════════════════════════════════════════════════════════════════

class DiabetesInput(BaseModel):
    Pregnancies: float
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: float

class TextInput(BaseModel):
    text: str
    optIn: bool


class HeartInput(BaseModel):
    age: float
    sex: float
    cp: float
    trestbps: float
    chol: float
    fbs: float
    restecg: float
    thalach: float
    exang: float
    oldpeak: float
    slope: float
    ca: float
    thal: float


class ParkinsonsInput(BaseModel):
    fo: float          # MDVP:Fo(Hz)
    fhi: float         # MDVP:Fhi(Hz)
    flo: float         # MDVP:Flo(Hz)
    jitter_pct: float  # MDVP:Jitter(%)
    jitter_abs: float  # MDVP:Jitter(Abs)
    rap: float         # MDVP:RAP
    ppq: float         # MDVP:PPQ
    ddp: float         # Jitter:DDP
    shimmer: float     # MDVP:Shimmer
    shimmer_db: float  # MDVP:Shimmer(dB)
    apq3: float        # Shimmer:APQ3
    apq5: float        # Shimmer:APQ5
    apq: float         # MDVP:APQ
    dda: float         # Shimmer:DDA
    nhr: float         # NHR
    hnr: float         # HNR
    rpde: float        # RPDE
    dfa: float         # DFA
    spread1: float
    spread2: float
    d2: float          # D2
    ppe: float         # PPE


class BreastCancerInput(BaseModel):
    mean_radius: float
    mean_texture: float
    mean_perimeter: float
    mean_area: float
    mean_smoothness: float
    mean_compactness: float
    mean_concavity: float
    mean_concave_points: float
    mean_symmetry: float
    mean_fractal_dimension: float
    se_radius: float
    se_texture: float
    se_perimeter: float
    se_area: float
    se_smoothness: float
    se_compactness: float
    se_concavity: float
    se_concave_points: float
    se_symmetry: float
    se_fractal_dimension: float
    worst_radius: float
    worst_texture: float
    worst_perimeter: float
    worst_area: float
    worst_smoothness: float
    worst_compactness: float
    worst_concavity: float
    worst_concave_points: float
    worst_symmetry: float
    worst_fractal_dimension: float


class LiverInput(BaseModel):
    Age: float
    Gender: float  # 0 = Female, 1 = Male
    Total_Bilirubin: float
    Direct_Bilirubin: float
    Alkaline_Phosphotase: float
    Alamine_Aminotransferase: float
    Aspartate_Aminotransferase: float
    Total_Proteins: float
    Albumin: float
    Albumin_and_Globulin_Ratio: float


class KidneyInput(BaseModel):
    age: float
    bp: float
    sg: float
    al: float
    su: float
    rbc: float
    pc: float
    ba: float
    bgr: float
    bu: float
    sc: float


class StrokeInput(BaseModel):
    gender: float
    age: float
    hypertension: float
    heart_disease: float
    ever_married: float
    work_type: float
    residence: float
    glucose: float
    bmi: float
    smoking: float


class PneumoniaInput(BaseModel):
    age: float
    fever: float
    cough: float
    chest_pain: float
    resp_rate: float
    spo2: float
    wbc: float
    fatigue: float
    headache: float


class AnemiaInput(BaseModel):
    gender: float
    hemoglobin: float
    mch: float
    mchc: float
    mcv: float
    dizziness: float
    pale_skin: float
    fatigue: float


# ══════════════════════════════════════════════════════════════════════════════
# PREDICTION ENDPOINTS
# ══════════════════════════════════════════════════════════════════════════════

@app.post("/predict/diabetes")
def predict_diabetes_endpoint(data: DiabetesInput):
    """Predict diabetes based on 8 clinical features."""
    features = [
        data.Pregnancies, data.Glucose, data.BloodPressure,
        data.SkinThickness, data.Insulin, data.BMI,
        data.DiabetesPedigreeFunction, data.Age,
    ]
    return predict_disease(
        "diabetes_model.pkl", features, "Diabetes",
        positive_msg="⚠️ The model indicates a HIGH risk of Diabetes. Please consult a healthcare professional for further evaluation. Maintain a balanced diet, exercise regularly, and monitor blood sugar levels.",
        negative_msg="✅ The model indicates a LOW risk of Diabetes. Continue maintaining a healthy lifestyle with regular exercise and a balanced diet.",
    )


@app.post("/predict/text")
def predict_text_endpoint(data: TextInput):
    """Predict risk based on free-form text input using Gemini AI."""
    if not data.optIn:
        raise HTTPException(status_code=400, detail="You must opt-in to use the AI text predictor.")
    
    if not data.text or len(data.text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Please provide more details about your symptoms.")
    
    if not GEMINI_API_KEY:
        return {
            "prediction": "Notice: Please add your GEMINI_API_KEY to the backend .env file to enable real-time Gemini predictions. \n\nSimulated AI Response: Based on your symptoms, we recommend getting plenty of rest and staying hydrated. Please consult a qualified doctor if symptoms persist."
        }
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        prompt = f"You are a professional medical AI assistant. Analyze the following health complaint/symptoms: '{data.text}'. Provide a very brief, professional, and cautious risk assessment (max 3 sentences). Always include a disclaimer stating you are an AI and they must see a doctor."
        response = model.generate_content(prompt)
        return {"prediction": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM Error: {str(e)}")


@app.post("/predict/heart")
def predict_heart_endpoint(data: HeartInput):
    """Predict heart disease based on 13 clinical features."""
    features = [
        data.age, data.sex, data.cp, data.trestbps, data.chol,
        data.fbs, data.restecg, data.thalach, data.exang,
        data.oldpeak, data.slope, data.ca, data.thal,
    ]
    return predict_disease(
        "heart_model.pkl", features, "Heart Disease",
        positive_msg="⚠️ The model indicates a HIGH risk of Heart Disease. Seek immediate medical attention. Monitor blood pressure, cholesterol, and adopt a heart-healthy diet.",
        negative_msg="✅ The model indicates a LOW risk of Heart Disease. Keep up your healthy habits — stay active, eat well, and manage stress.",
    )


@app.post("/predict/parkinsons")
def predict_parkinsons_endpoint(data: ParkinsonsInput):
    """Predict Parkinson's disease based on 22 voice measurement features."""
    features = [
        data.fo, data.fhi, data.flo, data.jitter_pct, data.jitter_abs,
        data.rap, data.ppq, data.ddp, data.shimmer, data.shimmer_db,
        data.apq3, data.apq5, data.apq, data.dda, data.nhr, data.hnr,
        data.rpde, data.dfa, data.spread1, data.spread2, data.d2, data.ppe,
    ]
    return predict_disease(
        "parkinsons_model.pkl", features, "Parkinson's Disease",
        positive_msg="⚠️ The model indicates signs consistent with Parkinson's Disease. Please consult a neurologist for a comprehensive evaluation.",
        negative_msg="✅ The model indicates no significant signs of Parkinson's Disease. Continue regular health check-ups.",
    )


@app.post("/predict/breast-cancer")
def predict_breast_cancer_endpoint(data: BreastCancerInput):
    """Predict breast cancer based on 30 features from cell nucleus measurements."""
    features = [
        data.mean_radius, data.mean_texture, data.mean_perimeter, data.mean_area,
        data.mean_smoothness, data.mean_compactness, data.mean_concavity,
        data.mean_concave_points, data.mean_symmetry, data.mean_fractal_dimension,
        data.se_radius, data.se_texture, data.se_perimeter, data.se_area,
        data.se_smoothness, data.se_compactness, data.se_concavity,
        data.se_concave_points, data.se_symmetry, data.se_fractal_dimension,
        data.worst_radius, data.worst_texture, data.worst_perimeter, data.worst_area,
        data.worst_smoothness, data.worst_compactness, data.worst_concavity,
        data.worst_concave_points, data.worst_symmetry, data.worst_fractal_dimension,
    ]
    return predict_disease(
        "breast_cancer_model.pkl", features, "Breast Cancer",
        positive_msg="⚠️ The model indicates a HIGH risk of Malignant Breast Cancer. Please schedule a mammogram and consult an oncologist immediately.",
        negative_msg="✅ The model indicates the tumor is likely Benign. Continue with regular breast self-examinations and scheduled screenings.",
    )


@app.post("/predict/liver")
def predict_liver_endpoint(data: LiverInput):
    """Predict liver disease based on 10 clinical features."""
    features = [
        data.Age, data.Gender, data.Total_Bilirubin, data.Direct_Bilirubin,
        data.Alkaline_Phosphotase, data.Alamine_Aminotransferase,
        data.Aspartate_Aminotransferase, data.Total_Proteins,
        data.Albumin, data.Albumin_and_Globulin_Ratio,
    ]
    return predict_disease(
        "liver_model.pkl", features, "Liver Disease",
        positive_msg="⚠️ The model indicates a HIGH risk of Liver Disease. Consult a hepatologist. Avoid alcohol, maintain a healthy weight, and get liver function tests.",
        negative_msg="✅ The model indicates a LOW risk of Liver Disease. Maintain a balanced diet, limit alcohol intake, and stay hydrated.",
    )


@app.post("/predict/kidney")
def predict_kidney_endpoint(data: KidneyInput):
    """Predict chronic kidney disease based on 11 clinical features."""
    features = [
        data.age, data.bp, data.sg, data.al, data.su, data.rbc,
        data.pc, data.ba, data.bgr, data.bu, data.sc,
    ]
    return predict_disease(
        "kidney_model.pkl", features, "Kidney Disease",
        positive_msg="⚠️ The model indicates a HIGH risk of Chronic Kidney Disease. Consult a nephrologist. Control blood pressure and manage blood sugar.",
        negative_msg="✅ The model indicates a LOW risk of Kidney Disease. Drink plenty of water and maintain a healthy diet.",
    )


@app.post("/predict/stroke")
def predict_stroke_endpoint(data: StrokeInput):
    """Predict stroke risk based on 10 demographic and clinical features."""
    features = [
        data.gender, data.age, data.hypertension, data.heart_disease,
        data.ever_married, data.work_type, data.residence,
        data.glucose, data.bmi, data.smoking,
    ]
    return predict_disease(
        "stroke_model.pkl", features, "Stroke",
        positive_msg="⚠️ The model indicates a HIGH risk of Stroke. Seek medical consultation. Manage hypertension and cholesterol levels.",
        negative_msg="✅ The model indicates a LOW risk of Stroke. Keep an active lifestyle and monitor your blood pressure regularly.",
    )


@app.post("/predict/pneumonia")
def predict_pneumonia_endpoint(data: PneumoniaInput):
    """Predict pneumonia risk based on 9 clinical and respiratory features."""
    features = [
        data.age, data.fever, data.cough, data.chest_pain,
        data.resp_rate, data.spo2, data.wbc, data.fatigue, data.headache,
    ]
    return predict_disease(
        "pneumonia_model.pkl", features, "Pneumonia",
        positive_msg="⚠️ The model indicates a HIGH risk of Pneumonia. Please consult a doctor immediately for a chest X-ray and clinical assessment. Rest and hydration are vital.",
        negative_msg="✅ The model indicates a LOW risk of Pneumonia. However, if symptoms persist, please consult a healthcare professional.",
    )


@app.post("/predict/anemia")
def predict_anemia_endpoint(data: AnemiaInput):
    """Predict anemia risk based on 8 hematological and physical indicators."""
    features = [
        data.gender, data.hemoglobin, data.mch, data.mchc,
        data.mcv, data.dizziness, data.pale_skin, data.fatigue,
    ]
    return predict_disease(
        "anemia_model.pkl", features, "Anemia",
        positive_msg="⚠️ The model indicates a HIGH risk of Anemia. Increase iron-rich foods and consult a doctor for blood tests and potential supplements.",
        negative_msg="✅ The model indicates a LOW risk of Anemia. Maintain a balanced diet rich in iron and vitamins.",
    )
