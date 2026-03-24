# MediPredict AI — AI-Based Multiple Disease Prediction System

An AI-powered web application that predicts 5 major diseases using Random Forest machine learning models.

## Diseases Supported

| Disease | Features | Model |
|---------|----------|-------|
| Diabetes | 8 clinical parameters | Random Forest |
| Heart Disease | 13 cardiovascular indicators | Random Forest |
| Parkinson's | 22 voice measurements | Random Forest |
| Breast Cancer | 30 cell nuclei features | Random Forest |
| Liver Disease | 10 biochemical markers | Random Forest |

## Tech Stack

- **Backend**: Python + FastAPI
- **Frontend**: React (Vite) + Tailwind CSS
- **ML**: Scikit-learn (Random Forest Classifier)
- **Model Storage**: Pickle (.pkl)
- **HTTP Client**: Axios

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd multiple-disease-prediction/backend

# Install Python dependencies
pip install -r requirements.txt

# Train all 5 ML models (creates .pkl files in /models)
python train_models.py

# Start the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`. Visit `http://localhost:8000/docs` for interactive Swagger documentation.

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd multiple-disease-prediction/frontend

# Install npm dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/predict/diabetes` | Diabetes prediction |
| POST | `/predict/heart` | Heart disease prediction |
| POST | `/predict/parkinsons` | Parkinson's prediction |
| POST | `/predict/breast-cancer` | Breast cancer prediction |
| POST | `/predict/liver` | Liver disease prediction |

### Response Format

```json
{
  "prediction": 0,
  "confidence": 85.5,
  "message": "Health advice...",
  "disease": "Disease Name"
}
```

## Project Structure

```
multiple-disease-prediction/
├── backend/
│   ├── main.py              # FastAPI app with prediction endpoints
│   ├── train_models.py       # ML model training script
│   ├── models/               # Saved .pkl model files
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx    # Navigation bar
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Landing page
│   │   │   ├── Diabetes.jsx  # Diabetes prediction
│   │   │   ├── Heart.jsx     # Heart disease prediction
│   │   │   ├── Parkinsons.jsx # Parkinson's prediction
│   │   │   ├── BreastCancer.jsx # Breast cancer prediction
│   │   │   └── Liver.jsx     # Liver disease prediction
│   │   ├── App.jsx           # Root component with routing
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles + Tailwind
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
└── README.md
```

## Disclaimer

⚠️ This application is built for **educational purposes only**. It is not a substitute for professional medical diagnosis or advice. Always consult a qualified healthcare provider.
