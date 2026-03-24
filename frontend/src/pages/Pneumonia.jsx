/**
 * Pneumonia.jsx — Pneumonia risk assessment page.
 */
import { useState } from 'react'
import axios from 'axios'
import { Thermometer, Loader2, Heart, Activity, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'

import { API_BASE_URL } from '../api/config'

const API_URL = API_BASE_URL

const fields = [
  { name: 'age', label: 'Age', placeholder: 'e.g. 45', hint: 'Age in years', range: '1 - 100' },
  { name: 'fever', label: 'Body Temp', placeholder: 'e.g. 101.5', hint: 'Fahrenheit temperature', range: '97 - 99 °F' },
  { name: 'cough', label: 'Cough', placeholder: '0=No, 1=Yes', hint: 'Persistent cough status', range: '0 or 1' },
  { name: 'chest_pain', label: 'Chest Pain', placeholder: '0=No, 1=Yes', hint: 'Pain during breathing', range: '0 or 1' },
  { name: 'resp_rate', label: 'Resp. Rate', placeholder: 'e.g. 24', hint: 'Breaths per minute', range: '12 - 20 bpm' },
  { name: 'spo2', label: 'SpO2 Level', placeholder: 'e.g. 94', hint: 'Blood oxygen saturation', range: '95 - 100%' },
  { name: 'wbc', label: 'WBC Count', placeholder: 'e.g. 11000', hint: 'White blood cells /µL', range: '4500 - 11000' },
  { name: 'fatigue', label: 'Fatigue', placeholder: '0=No, 1=Yes', hint: 'Severe exhaustion status', range: '0 or 1' },
  { name: 'headache', label: 'Headache', placeholder: '0=No, 1=Yes', hint: 'Persistent head pain', range: '0 or 1' },
]

export default function Pneumonia() {
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
      const response = await axios.post(`${API_URL}/predict/pneumonia`, payload)
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get prediction.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-rose-bg">
      <div className="bg-gradient-to-r from-red-600 via-pink-500 to-rose-400 py-6 md:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')}
            className="group mb-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold transition-all border border-white/20 shadow-lg hover:shadow-white/10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
              <Thermometer className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Pneumonia Assessment</h1>
              <p className="text-pink-100 text-sm mt-1">AI-based respiratory health evaluation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="form-card" id="pneumonia-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div key={field.name} className="relative group/field">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-theme-maroon uppercase tracking-tight">
                    {field.label}
                  </label>
                  <span className="text-[10px] font-black text-theme-gold bg-theme-gold/10 px-2 py-0.5 rounded-full uppercase">
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
                  className="input-field group-hover/field:border-theme-maroon/30 transition-all duration-300"
                  id={`input-${field.name}`}
                />
                <div className="opacity-0 group-hover/field:opacity-100 transition-opacity absolute -top-10 left-0 right-0 bg-theme-maroon text-white text-[10px] p-2 rounded-lg shadow-xl pointer-events-none z-10 border border-white/20">
                  {field.hint}
                </div>
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-8">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</> : <><Activity className="w-5 h-5" /> Predict Risk</>}
          </button>
        </form>

        {error && <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm animate-slide-up">⚠️ {error}</div>}
        <ResultCard result={result} />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fade-in stagger-3">
          <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 border border-theme-maroon/10 shadow-lg">
            <h2 className="text-xl font-black text-theme-maroon uppercase mb-6 flex items-center gap-2 tracking-tight">
              <Thermometer className="w-5 h-5 text-theme-gold" />
              Respiratory Guide
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Oxygen Saturation (SpO2)', desc: 'Measures how much oxygen your blood is carrying. Values below 94% can indicate respiratory distress.' },
                { title: 'Respiratory Rate', desc: 'Number of breaths per minute. Elevated rates (Tachypnea) are common in pneumonia infections.' },
                { title: 'WBC Count', desc: 'White blood cells increase significantly (Leukocytosis) when the body is fighting a lung infection.' },
                { title: 'Chest Pain', desc: 'Pleuritic chest pain (sharp pain when breathing) is a hallmark symptom of lung inflammation.' }
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-theme-gold pl-4">
                  <h3 className="font-bold text-theme-maroon text-sm uppercase">{item.title}</h3>
                  <p className="text-theme-maroon/70 text-sm font-medium mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-theme-maroon rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
            <h2 className="text-xl font-black uppercase mb-6 tracking-tight">Clinical Insight</h2>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
              This model uses variables from clinical pneumonia diagnostic datasets. It differentiates between mild respiratory symptoms and potential infection.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-xs italic text-white/70">
              "Bacterial pneumonia can progress rapidly. If SPO2 drops below 90%, seek emergency care regardless of AI prediction."
            </div>
          </div>
        </div>

        {/* About Disease Section */}
        <div className="mt-12 bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-theme-maroon/10 shadow-xl shadow-theme-maroon/5 animate-fade-in stagger-4">
          <h2 className="text-2xl font-black text-theme-maroon uppercase mb-6 tracking-tight">Understanding Pneumonia</h2>
          <div className="prose prose-rose max-w-none">
            <p className="text-theme-maroon/80 text-lg leading-relaxed mb-6 font-medium">
              Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus, causing cough with phlegm, fever, chills, and difficulty breathing. Organisms like bacteria, viruses, and fungi can cause pneumonia. It can range in seriousness from mild to life-threatening, especially for infants and seniors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h4 className="font-bold text-red-600 mb-2 uppercase text-sm">Key Symptoms</h4>
                <ul className="text-red-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Sharp chest pain</li>
                  <li>Productive cough</li>
                  <li>Shortness of breath</li>
                  <li>Fever & chills</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <h4 className="font-bold text-pink-600 mb-2 uppercase text-sm">Causes</h4>
                <ul className="text-pink-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Bacterial infection</li>
                  <li>Viral (flu/COVID)</li>
                  <li>Fungal factors</li>
                  <li>Aspiration issues</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-orange-600 mb-2 uppercase text-sm">Prevention</h4>
                <ul className="text-orange-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Vaccination packs</li>
                  <li>Good hand hygiene</li>
                  <li>Non-smoking habit</li>
                  <li>Strong immune system</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
