/**
 * Heart.jsx — Heart disease prediction page.
 * Red/Pink themed form card with gradient button.
 */
import { useState } from 'react'
import axios from 'axios'
import { HeartPulse, Loader2, Heart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'

import { API_BASE_URL } from '../api/config'

const API_URL = API_BASE_URL

const fields = [
  { name: 'age', label: 'Age', placeholder: 'e.g. 63', hint: 'Age in years', range: '1 - 100' },
  { name: 'sex', label: 'Sex', placeholder: '1=Male, 0=Female', hint: 'Biological gender (1=M, 0=F)', range: '0 or 1' },
  { name: 'cp', label: 'Chest Pain Type', placeholder: '0-3', hint: 'Pain severity (0=Low, 3=Highest)', range: '0 - 3' },
  { name: 'trestbps', label: 'Resting BP', placeholder: 'e.g. 145', hint: 'Systolic blood pressure at rest', range: '90 - 120 mmHg' },
  { name: 'chol', label: 'Cholesterol', placeholder: 'e.g. 233', hint: 'Serum cholesterol (Total)', range: '125 - 200 mg/dL' },
  { name: 'fbs', label: 'Fasting Blood Sugar', placeholder: '0 or 1', hint: 'Is sugar > 120 mg/dL? (1=Yes, 0=No)', range: '0 or 1' },
  { name: 'restecg', label: 'Resting ECG', placeholder: '0-2', hint: 'ECG results (0=Normal, 2=Problem)', range: '0 - 2' },
  { name: 'thalach', label: 'Max Heart Rate', placeholder: 'e.g. 150', hint: 'Maximum rate during stress test', range: '60 - 200 bpm' },
  { name: 'exang', label: 'Exercise Angina', placeholder: '0 or 1', hint: 'Chest pain during exercise? (1=Y, 0=N)', range: '0 or 1' },
  { name: 'oldpeak', label: 'ST Depression', placeholder: 'e.g. 2.3', hint: 'Stress test ECG marker', range: '0.0 - 6.2' },
  { name: 'slope', label: 'ST Segment Slope', placeholder: '0-2', hint: 'ST segment peak slope', range: '0 - 2' },
  { name: 'ca', label: 'Major Vessels', placeholder: '0-3', hint: 'Number of highlighted vessels', range: '0 - 3' },
  { name: 'thal', label: 'Thalassemia Status', placeholder: '0-2', hint: 'Blood disorder screening', range: '0 - 2' },
]

export default function HeartDisease() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map(f => [f.name, '']))
  )
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const payload = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, parseFloat(v) || 0])
      )
      const response = await axios.post(`${API_URL}/predict/heart`, payload)
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get prediction. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-rose-bg">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-pink-500 to-rose-400 py-6 md:py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')}
            className="group mb-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold transition-all border border-white/20 shadow-lg hover:shadow-white/10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
              <HeartPulse className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Heart Disease Prediction</h1>
              <p className="text-pink-100 text-sm mt-1">Assess heart disease risk using cardiovascular indicators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="form-card" id="heart-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fields.map((field) => (
              <div key={field.name} className="relative group/field">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-theme-maroon uppercase tracking-tight">
                    {field.label}
                  </label>
                  <span className="text-[9px] font-black text-theme-gold bg-theme-gold/10 px-2 py-0.5 rounded-full uppercase whitespace-nowrap">
                    Normal: {field.range}
                  </span>
                </div>
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  step="any"
                  required
                  className="input-field text-sm transition-all group-hover/field:border-theme-maroon/30"
                  id={`input-${field.name}`}
                />
                <div className="opacity-0 group-hover/field:opacity-100 transition-opacity absolute -top-10 left-0 right-0 bg-theme-maroon text-white text-[10px] p-2 rounded-lg shadow-xl pointer-events-none z-10 border border-white/20">
                  {field.hint}
                </div>
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-8" id="predict-heart-btn">
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</>
            ) : (
              <><Heart className="w-5 h-5" /> Predict Now</>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm animate-slide-up">
            ⚠️ {error}
          </div>
        )}

        <ResultCard result={result} />

        {/* Information Guide Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fade-in stagger-3">
          <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 border border-theme-maroon/10 shadow-lg">
            <h2 className="text-xl font-black text-theme-maroon uppercase mb-6 flex items-center gap-2 tracking-tight">
              <HeartPulse className="w-5 h-5 text-theme-gold" />
              Cardio Guide
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Chest Pain (CP)', desc: 'Categorized from 0 to 3. Typical angina (0) or atypical cases help pinpoint vascular blockages.' },
                { title: 'Cholesterol', desc: 'High serum cholesterol (over 200 mg/dL) can lead to plaque buildup in the coronary arteries.' },
                { title: 'ST Depression', desc: 'The "Oldpeak" value measuring ECG depression after exercise, indicating heart stress.' },
                { title: 'Major Vessels', desc: 'Number of major vessels (0-3) colored by fluoroscopy; fewer colored vessels often suggest blockages.' }
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-theme-gold pl-4">
                  <h3 className="font-bold text-theme-maroon text-sm uppercase">{item.title}</h3>
                  <p className="text-theme-maroon/70 text-sm font-medium mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-theme-maroon rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-theme-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <h2 className="text-xl font-black uppercase mb-6 tracking-tight">Heart Health Metrics</h2>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
              This assessment uses the <strong>UCI Cleveland Heart Disease Dataset</strong> parameters. Our model evaluates 13 key biomarkers to calculate your cardiovascular health score.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <h4 className="font-bold text-xs uppercase tracking-widest text-theme-gold mb-2">Did you know?</h4>
              <p className="text-white/70 text-xs italic">
                "Early detection of heart issues through screening can reduce the risk of major cardiac events by nearly 45%."
              </p>
            </div>
          </div>
        </div>

        {/* About Disease Section */}
        <div className="mt-12 bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-theme-maroon/10 shadow-xl shadow-theme-maroon/5 animate-fade-in stagger-4">
          <h2 className="text-2xl font-black text-theme-maroon uppercase mb-6 tracking-tight">Understanding Heart Disease</h2>
          <div className="prose prose-rose max-w-none">
            <p className="text-theme-maroon/80 text-lg leading-relaxed mb-6 font-medium">
              Heart Disease describes a range of conditions that affect your heart. It remains the leading cause of death globally. Most common forms include Coronary Artery Disease (CAD), which affects the blood flow to the heart, potentially leading to heart attacks. Risk factors often work together, making early combined assessment vital.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h4 className="font-bold text-red-600 mb-2 uppercase text-sm">Symptoms</h4>
                <ul className="text-red-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Chest pain (Angina)</li>
                  <li>Shortness of breath</li>
                  <li>Pain in neck/jaw/back</li>
                  <li>Numbness in limbs</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <h4 className="font-bold text-pink-600 mb-2 uppercase text-sm">Risk Factors</h4>
                <ul className="text-pink-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>High Blood Pressure</li>
                  <li>High Cholesterol</li>
                  <li>Smoking & Alcohol</li>
                  <li>Physical Inactivity</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-orange-600 mb-2 uppercase text-sm">Prevention</h4>
                <ul className="text-orange-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Regular Exercise</li>
                  <li>Heart-Healthy Diet</li>
                  <li>Stress Management</li>
                  <li>Maintain Healthy Weight</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
