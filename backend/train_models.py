"""
train_models.py
===============
Trains Random Forest classifiers for 5 diseases and saves each model as a .pkl file.

Diseases: Diabetes, Heart Disease, Parkinson's, Breast Cancer, Liver Disease
"""

import os
import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import load_breast_cancer

# ─── Ensure models directory exists ───────────────────────────────────────────
MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
os.makedirs(MODELS_DIR, exist_ok=True)


def save_model(model, scaler, filename):
    """Save trained model and its scaler together as a dict."""
    path = os.path.join(MODELS_DIR, filename)
    with open(path, "wb") as f:
        pickle.dump({"model": model, "scaler": scaler}, f)
    print(f"  ✓ Saved → {path}")


# ══════════════════════════════════════════════════════════════════════════════
# 1. DIABETES MODEL
# ══════════════════════════════════════════════════════════════════════════════
def train_diabetes():
    """
    Features: Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,
              BMI, DiabetesPedigreeFunction, Age
    Uses synthetic data mimicking the Pima Indians Diabetes dataset.
    """
    print("\n[1/5] Training Diabetes model...")
    np.random.seed(42)
    n = 800

    # Generate realistic feature distributions
    pregnancies = np.random.randint(0, 17, n)
    glucose = np.random.normal(120, 30, n).clip(0, 200)
    blood_pressure = np.random.normal(70, 15, n).clip(0, 130)
    skin_thickness = np.random.normal(25, 10, n).clip(0, 100)
    insulin = np.random.normal(140, 80, n).clip(0, 850)
    bmi = np.random.normal(32, 7, n).clip(0, 70)
    dpf = np.random.exponential(0.5, n).clip(0, 2.5)
    age = np.random.randint(21, 81, n)

    X = np.column_stack([pregnancies, glucose, blood_pressure, skin_thickness,
                         insulin, bmi, dpf, age])

    # Create target: higher glucose, BMI, and age increase diabetes probability
    prob = 1 / (1 + np.exp(-(0.03 * glucose + 0.05 * bmi + 0.02 * age - 8)))
    y = (np.random.random(n) < prob).astype(int)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    print(f"  Accuracy: {accuracy:.4f}")

    save_model(model, scaler, "diabetes_model.pkl")


# ══════════════════════════════════════════════════════════════════════════════
# 2. HEART DISEASE MODEL
# ══════════════════════════════════════════════════════════════════════════════
def train_heart():
    """
    Features: age, sex, cp, trestbps, chol, fbs, restecg, thalach,
              exang, oldpeak, slope, ca, thal
    Uses synthetic data mimicking the Cleveland Heart Disease dataset.
    """
    print("\n[2/5] Training Heart Disease model...")
    np.random.seed(43)
    n = 900

    age = np.random.randint(29, 78, n)
    sex = np.random.randint(0, 2, n)
    cp = np.random.randint(0, 4, n)
    trestbps = np.random.normal(130, 17, n).clip(90, 200)
    chol = np.random.normal(245, 50, n).clip(120, 570)
    fbs = np.random.randint(0, 2, n)
    restecg = np.random.randint(0, 3, n)
    thalach = np.random.normal(150, 22, n).clip(70, 210)
    exang = np.random.randint(0, 2, n)
    oldpeak = np.random.exponential(1.0, n).clip(0, 6.2)
    slope = np.random.randint(0, 3, n)
    ca = np.random.randint(0, 4, n)
    thal = np.random.randint(0, 3, n)

    X = np.column_stack([age, sex, cp, trestbps, chol, fbs, restecg,
                         thalach, exang, oldpeak, slope, ca, thal])

    # Target: influenced by age, cp, thalach, oldpeak, ca
    prob = 1 / (1 + np.exp(-(0.04 * age + 0.5 * cp - 0.03 * thalach +
                              0.5 * oldpeak + 0.8 * ca - 5)))
    y = (np.random.random(n) < prob).astype(int)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    print(f"  Accuracy: {accuracy:.4f}")

    save_model(model, scaler, "heart_model.pkl")


# ══════════════════════════════════════════════════════════════════════════════
# 3. PARKINSON'S DISEASE MODEL
# ══════════════════════════════════════════════════════════════════════════════
def train_parkinsons():
    """
    22 voice measurement features from UCI Parkinson's dataset.
    Features: MDVP:Fo(Hz), MDVP:Fhi(Hz), MDVP:Flo(Hz), MDVP:Jitter(%),
              MDVP:Jitter(Abs), MDVP:RAP, MDVP:PPQ, Jitter:DDP,
              MDVP:Shimmer, MDVP:Shimmer(dB), Shimmer:APQ3, Shimmer:APQ5,
              MDVP:APQ, Shimmer:DDA, NHR, HNR, RPDE, DFA, spread1, spread2,
              D2, PPE
    """
    print("\n[3/5] Training Parkinson's Disease model...")
    np.random.seed(44)
    n = 800

    # Generate 22 voice measurement features
    fo = np.random.normal(150, 40, n).clip(80, 270)
    fhi = np.random.normal(200, 50, n).clip(100, 600)
    flo = np.random.normal(100, 30, n).clip(60, 240)
    jitter_pct = np.random.exponential(0.006, n).clip(0, 0.04)
    jitter_abs = np.random.exponential(0.00004, n).clip(0, 0.0003)
    rap = np.random.exponential(0.003, n).clip(0, 0.02)
    ppq = np.random.exponential(0.003, n).clip(0, 0.02)
    ddp = rap * 3
    shimmer = np.random.exponential(0.03, n).clip(0, 0.12)
    shimmer_db = np.random.exponential(0.3, n).clip(0, 1.3)
    apq3 = np.random.exponential(0.015, n).clip(0, 0.06)
    apq5 = np.random.exponential(0.02, n).clip(0, 0.08)
    apq = np.random.exponential(0.025, n).clip(0, 0.14)
    dda = apq3 * 3
    nhr = np.random.exponential(0.02, n).clip(0, 0.3)
    hnr = np.random.normal(22, 4, n).clip(8, 34)
    rpde = np.random.normal(0.5, 0.1, n).clip(0.2, 0.8)
    dfa = np.random.normal(0.7, 0.05, n).clip(0.5, 0.9)
    spread1 = np.random.normal(-5, 1, n).clip(-8, -2)
    spread2 = np.random.normal(0.2, 0.07, n).clip(0.05, 0.5)
    d2 = np.random.normal(2.5, 0.3, n).clip(1.5, 3.7)
    ppe = np.random.normal(0.2, 0.08, n).clip(0.04, 0.6)

    X = np.column_stack([fo, fhi, flo, jitter_pct, jitter_abs, rap, ppq, ddp,
                         shimmer, shimmer_db, apq3, apq5, apq, dda, nhr, hnr,
                         rpde, dfa, spread1, spread2, d2, ppe])

    # Target: influenced by jitter, shimmer, spread1, ppe
    prob = 1 / (1 + np.exp(-(100 * jitter_pct + 10 * shimmer + 0.5 * spread1 +
                              5 * ppe - 2)))
    y = (np.random.random(n) < prob).astype(int)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    print(f"  Accuracy: {accuracy:.4f}")

    save_model(model, scaler, "parkinsons_model.pkl")


# ══════════════════════════════════════════════════════════════════════════════
# 4. BREAST CANCER MODEL
# ══════════════════════════════════════════════════════════════════════════════
def train_breast_cancer():
    """
    Uses sklearn's built-in Wisconsin Breast Cancer dataset (30 features).
    Target: 0 = malignant (positive), 1 = benign (negative)
    We flip labels so 1 = malignant for consistent "disease = 1" convention.
    """
    print("\n[4/5] Training Breast Cancer model...")
    data = load_breast_cancer()
    X = data.data
    # Flip: in sklearn 0=malignant, 1=benign → we want 1=malignant
    y = 1 - data.target

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    print(f"  Accuracy: {accuracy:.4f}")

    save_model(model, scaler, "breast_cancer_model.pkl")


# ══════════════════════════════════════════════════════════════════════════════
# 5. LIVER DISEASE MODEL
# ══════════════════════════════════════════════════════════════════════════════
def train_liver():
    """
    Features: Age, Gender, Total_Bilirubin, Direct_Bilirubin,
              Alkaline_Phosphotase, Alamine_Aminotransferase,
              Aspartate_Aminotransferase, Total_Proteins, Albumin,
              Albumin_and_Globulin_Ratio
    Uses synthetic data mimicking the ILPD dataset.
    """
    print("\n[5/5] Training Liver Disease model...")
    np.random.seed(45)
    n = 800

    age = np.random.randint(18, 90, n)
    gender = np.random.randint(0, 2, n)  # 0 = Female, 1 = Male
    total_bilirubin = np.random.exponential(2, n).clip(0.1, 75)
    direct_bilirubin = (total_bilirubin * np.random.uniform(0.1, 0.6, n)).clip(0.1, 20)
    alk_phos = np.random.normal(250, 100, n).clip(60, 2110)
    alamine = np.random.exponential(50, n).clip(10, 2000)
    aspartate = np.random.exponential(50, n).clip(10, 4930)
    total_proteins = np.random.normal(6.5, 1, n).clip(2.7, 10)
    albumin = np.random.normal(3.1, 0.8, n).clip(0.9, 5.5)
    ag_ratio = (albumin / (total_proteins - albumin + 0.1)).clip(0.3, 2.8)

    X = np.column_stack([age, gender, total_bilirubin, direct_bilirubin,
                         alk_phos, alamine, aspartate, total_proteins,
                         albumin, ag_ratio])

    # Target: influenced by bilirubin, aminotransferases, albumin
    prob = 1 / (1 + np.exp(-(0.1 * total_bilirubin + 0.005 * alamine +
                              0.005 * aspartate - 0.5 * albumin - 0.5)))
    y = (np.random.random(n) < prob).astype(int)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    print(f"  Accuracy: {accuracy:.4f}")

    save_model(model, scaler, "liver_model.pkl")


# ══════════════════════════════════════════════════════════════════════════════
# 6. KIDNEY DISEASE MODEL
# ══════════════════════════════════════════════════════════════════════════════
def train_kidney():
    """
    Features: Age, Blood Pressure, Specific Gravity, Albumin, Sugar, Red Blood Cells,
              Pus Cell, Bacteria, Blood Glucose Random, Blood Urea, Serum Creatinine
    Uses synthetic data mimicking the Chronic Kidney Disease dataset.
    """
    print("\n[6/7] Training Kidney Disease model...")
    np.random.seed(46)
    n = 850

    age = np.random.randint(10, 91, n)
    bp = np.random.normal(80, 15, n).clip(50, 180)
    sg = np.random.choice([1.005, 1.010, 1.015, 1.020, 1.025], n)
    al = np.random.randint(0, 6, n)  # Albumin
    su = np.random.randint(0, 6, n)  # Sugar
    rbc = np.random.randint(0, 2, n) # 0=Abnormal, 1=Normal
    pc = np.random.randint(0, 2, n)  # 0=Abnormal, 1=Normal
    ba = np.random.randint(0, 2, n)  # 0=Notpresent, 1=Present
    bgr = np.random.normal(150, 60, n).clip(20, 500)
    bu = np.random.normal(60, 40, n).clip(1, 400)
    sc = np.random.normal(1.2, 1.0, n).clip(0.1, 35)

    X = np.column_stack([age, bp, sg, al, su, rbc, pc, ba, bgr, bu, sc])

    # Target: influenced by al, su, sc, bp
    prob = 1 / (1 + np.exp(-(0.8 * al + 0.4 * su + 0.5 * sc + 0.02 * bp - 4)))
    y = (np.random.random(n) < prob).astype(int)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    print(f"  Accuracy: {accuracy:.4f}")

    save_model(model, scaler, "kidney_model.pkl")


# ══════════════════════════════════════════════════════════════════════════════
# 7. STROKE PREDICTION MODEL
# ══════════════════════════════════════════════════════════════════════════════
def train_stroke():
    """
    Features: gender, age, hypertension, heart_disease, ever_married, work_type,
              Residence_type, avg_glucose_level, bmi, smoking_status
    Uses synthetic data mimicking the Stroke Prediction dataset.
    """
    print("\n[7/7] Training Stroke Prediction model...")
    np.random.seed(47)
    n = 1000

    gender = np.random.randint(0, 2, n) # 0=Female, 1=Male
    age = np.random.randint(10, 91, n)
    hypertension = np.random.randint(0, 2, n)
    heart_disease = np.random.randint(0, 2, n)
    ever_married = np.random.randint(0, 2, n)
    work_type = np.random.randint(0, 4, n) # 0=Private, 1=Self-employed, 2=Govt, 3=Children
    residence = np.random.randint(0, 2, n) # 0=Rural, 1=Urban
    glucose = np.random.normal(105, 45, n).clip(50, 280)
    bmi = np.random.normal(28, 7, n).clip(10, 60)
    smoking = np.random.randint(0, 4, n) # 0=formerly, 1=never, 2=smokes, 3=Unknown

    X = np.column_stack([gender, age, hypertension, heart_disease, ever_married,
                         work_type, residence, glucose, bmi, smoking])

    # Target: influenced by age, hypertension, glucose, bmi
    prob = 1 / (1 + np.exp(-(0.05 * age + 0.8 * hypertension + 0.5 * heart_disease +
                              0.01 * glucose + 0.02 * bmi - 7)))
    y = (np.random.random(n) < prob).astype(int)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    print(f"  Accuracy: {accuracy:.4f}")

    save_model(model, scaler, "stroke_model.pkl")


# ══════════════════════════════════════════════════════════════════════════════
# 8. PNEUMONIA PREDICTION MODEL
# ══════════════════════════════════════════════════════════════════════════════
def train_pneumonia():
    """
    Features: age, fever, cough, chest_pain, respiratory_rate, oxygen_saturation,
              white_blood_cell_count, fatigue, headache
    Uses synthetic data mimicking Clinical Pneumonia indicators.
    """
    print("\n[8/9] Training Pneumonia model...")
    np.random.seed(48)
    n = 900

    age = np.random.randint(1, 91, n)
    fever = np.random.uniform(96, 105, n) # Fahrenheit
    cough = np.random.randint(0, 2, n) # 0=No, 1=Yes
    chest_pain = np.random.randint(0, 2, n)
    resp_rate = np.random.normal(18, 5, n).clip(10, 45)
    spo2 = np.random.normal(97, 3, n).clip(80, 100)
    wbc = np.random.normal(7000, 3000, n).clip(2000, 25000)
    fatigue = np.random.randint(0, 2, n)
    headache = np.random.randint(0, 2, n)

    X = np.column_stack([age, fever, cough, chest_pain, resp_rate, spo2, wbc, fatigue, headache])

    # Target: influenced by fever, resp_rate, spo2, wbc
    prob = 1 / (1 + np.exp(-(0.5 * (fever-98.6) + 0.2 * resp_rate - 0.3 * (spo2-95) + 0.0005 * wbc - 5)))
    y = (np.random.random(n) < prob).astype(int)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    print(f"  Accuracy: {accuracy:.4f}")

    save_model(model, scaler, "pneumonia_model.pkl")


# ══════════════════════════════════════════════════════════════════════════════
# 9. ANEMIA PREDICTION MODEL
# ══════════════════════════════════════════════════════════════════════════════
def train_anemia():
    """
    Features: gender, hemoglobin, mch, mchc, mcv, dizziness, pale_skin, fatigue
    Uses synthetic data mimicking the Anemia Prediction dataset.
    """
    print("\n[9/9] Training Anemia model...")
    np.random.seed(49)
    n = 1000

    gender = np.random.randint(0, 2, n) # 0=Female, 1=Male
    hemoglobin = np.random.normal(12, 3, n).clip(3, 22)
    mch = np.random.normal(28, 5, n).clip(10, 45)
    mchc = np.random.normal(32, 4, n).clip(15, 45)
    mcv = np.random.normal(85, 10, n).clip(50, 120)
    dizziness = np.random.randint(0, 2, n)
    pale_skin = np.random.randint(0, 2, n)
    fatigue = np.random.randint(0, 2, n)

    X = np.column_stack([gender, hemoglobin, mch, mchc, mcv, dizziness, pale_skin, fatigue])

    # Target: heavily influenced by hemoglobin (lower = higher risk)
    # Normals: Female: 12-16, Male: 14-18
    target_threshold = np.where(gender == 0, 12, 14)
    prob = 1 / (1 + np.exp(-(target_threshold - hemoglobin + 0.5 * dizziness + 0.5 * fatigue - 1)))
    y = (np.random.random(n) < prob).astype(int)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    print(f"  Accuracy: {accuracy:.4f}")

    save_model(model, scaler, "anemia_model.pkl")


# ══════════════════════════════════════════════════════════════════════════════
# MAIN: Train all models
# ══════════════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    print("=" * 60)
    print("  MediPredict AI — Multiple Disease Prediction — Model Training")
    print("=" * 60)

    train_diabetes()
    train_heart()
    train_parkinsons()
    train_breast_cancer()
    train_liver()
    train_kidney()
    train_stroke()
    train_pneumonia()
    train_anemia()

    print("\n" + "=" * 60)
    print("  ✅ All 9 models trained and saved successfully!")
    print("=" * 60)
