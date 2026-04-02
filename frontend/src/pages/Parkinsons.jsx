/**
 * Parkinsons.jsx — Parkinson's disease prediction page.
 * Red/Pink themed, 22 voice measurement features.
 */
import { useState } from 'react'
import axios from 'axios'
import { Brain, Loader2, Heart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'

import { API_BASE_URL } from '../api/config'

const API_URL = API_BASE_URL

const fields = [
  { name: 'fo', label: 'MDVP:Fo (Hz)', placeholder: 'e.g. 119.99', hint: 'Avg. vocal frequency', range: '140 - 240 Hz' },
  { name: 'fhi', label: 'MDVP:Fhi (Hz)', placeholder: 'e.g. 157.30', hint: 'Max. vocal frequency', range: '200 - 450 Hz' },
  { name: 'flo', label: 'MDVP:Flo (Hz)', placeholder: 'e.g. 74.99', hint: 'Min. vocal frequency', range: '80 - 150 Hz' },
  { name: 'jitter_pct', label: 'MDVP:Jitter (%)', placeholder: 'e.g. 0.00784', hint: 'Freq. variation %', range: '< 1.04%' },
  { name: 'jitter_abs', label: 'MDVP:Jitter (Abs)', placeholder: 'e.g. 0.00007', hint: 'Absolute jitter (μs)', range: '< 0.00003s' },
  { name: 'rap', label: 'MDVP:RAP', placeholder: 'e.g. 0.00370', hint: 'Relative amp. perturbation', range: '< 0.0068' },
]

export default function Parkinsons() {
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
      const response = await axios.post(`${API_URL}/predict/parkinsons`, payload)
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')}
            className="group mb-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold transition-all border border-white/20 shadow-lg hover:shadow-white/10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Parkinson's Disease Prediction</h1>
              <p className="text-pink-100 text-sm mt-1">Analyze 22 voice measurement biomarkers for early detection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="form-card" id="parkinsons-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div key={field.name} className="relative group/field">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold text-theme-maroon uppercase tracking-tight">
                    {field.label}
                  </label>
                  <span className="text-[8px] font-black text-theme-gold bg-theme-gold/10 px-1.5 py-0.5 rounded-full uppercase whitespace-nowrap">
                    Ref: {field.range}
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
                  className="input-field text-xs h-9 transition-all group-hover/field:border-theme-maroon/30"
                  id={`input-${field.name}`}
                />
                <div className="opacity-0 group-hover/field:opacity-100 transition-opacity absolute -top-10 left-0 right-0 bg-theme-maroon text-white text-[9px] p-2 rounded-lg shadow-xl pointer-events-none z-10 border border-white/20">
                  {field.hint}
                </div>
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-8" id="predict-parkinsons-btn">
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
              <Brain className="w-5 h-5 text-theme-gold" />
              Voice Biomarkers
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Jitter & Shimmer', desc: 'Measures of variations in fundamental frequency and amplitude. High values often indicate vocal tremors associated with Parkinson\'s.' },
                { title: 'NHR & HNR', desc: 'Noise-to-Harmonics and Harmonics-to-Noise ratios. These measure the clarity of the voice vs. background noise or breathiness.' },
                { title: 'RPDE', desc: 'Recurrence Period Density Entropy. A measure of the complexity of the vocal signal periodicity.' },
                { title: 'PPE', desc: 'Pitch Period Entropy. Specifically designed to be sensitive to the impaired voice control in early stage Parkinson\'s.' }
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
            <h2 className="text-xl font-black uppercase mb-6 tracking-tight">Neuro-Acoustic Analysis</h2>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
              This model uses the <strong>Oxford Parkinson\'s Disease Detection Dataset</strong> standards. It analyzes 22 distinct voice features to detect microscopic tremors unnoticeable to the human ear.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <h4 className="font-bold text-xs uppercase tracking-widest text-theme-gold mb-2">Scientific Basis</h4>
              <p className="text-white/70 text-xs italic">
                "Voice impairment (dysphonia) is one of the earliest signs of Parkinson\'s, often appearing years before motor symptoms occur."
              </p>
            </div>
          </div>
        </div>

        {/* About Disease Section */}
        <div className="mt-12 bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-theme-maroon/10 shadow-xl shadow-theme-maroon/5 animate-fade-in stagger-4">
          <h2 className="text-2xl font-black text-theme-maroon uppercase mb-6 tracking-tight">Understanding Parkinson's</h2>
          <div className="prose prose-rose max-w-none">
            <p className="text-theme-maroon/80 text-lg leading-relaxed mb-6 font-medium">
              Parkinson's Disease is a progressive neurological disorder that primarily affects movement. It occurs when nerve cells in the brain don't produce enough dopamine. While it is best known for causing tremors and stiffness, it also affects the muscles used for speech, leading to subtle changes in vocal pitch and stability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h4 className="font-bold text-red-600 mb-2 uppercase text-sm">Motor Symptoms</h4>
                <ul className="text-red-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Tremors (shaking)</li>
                  <li>Bradykinesia (slow move)</li>
                  <li>Rigid muscles</li>
                  <li>Impaired posture</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <h4 className="font-bold text-pink-600 mb-2 uppercase text-sm">Early Indicators</h4>
                <ul className="text-pink-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Soft or slur speech</li>
                  <li>Loss of smell</li>
                  <li>Small handwriting</li>
                  <li>Sleep problems</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-orange-600 mb-2 uppercase text-sm">Management</h4>
                <ul className="text-orange-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Dopamine Therapy</li>
                  <li>Physical Therapy</li>
                  <li>Speech Exercises</li>
                  <li>Healthy Nutrition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
