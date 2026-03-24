/**
 * Stroke.jsx — Stroke prediction page.
 */
import { useState } from 'react'
import axios from 'axios'
import { Zap, Loader2, Heart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'

import { API_BASE_URL } from '../api/config'

const API_URL = API_BASE_URL

const fields = [
  { name: 'gender', label: 'Gender', placeholder: '0=Female, 1=Male', hint: 'Biological Gender', range: '0 or 1' },
  { name: 'age', label: 'Age', placeholder: 'e.g. 50', hint: 'Age in years', range: '1 - 100' },
  { name: 'hypertension', label: 'Hypertension', placeholder: '0=No, 1=Yes', hint: 'High blood pressure status', range: '0 or 1' },
  { name: 'heart_disease', label: 'Heart Disease', placeholder: '0=No, 1=Yes', hint: 'Cardiac condition history', range: '0 or 1' },
  { name: 'ever_married', label: 'Ever Married', placeholder: '0=No, 1=Yes', hint: 'Marital status', range: '0 or 1' },
  { name: 'work_type', label: 'Work Type', placeholder: '0-3', hint: '0=Private, 1=Self, 2=Govt, 3=None', range: '0 - 3' },
  { name: 'residence', label: 'Residence', placeholder: '0=Rural, 1=Urban', hint: 'Living environment', range: '0 or 1' },
  { name: 'glucose', label: 'Avg Glucose', placeholder: 'e.g. 105', hint: 'Average blood sugar', range: '70 - 120 mg/dL' },
  { name: 'bmi', label: 'BMI', placeholder: 'e.g. 28.1', hint: 'Body Mass Index', range: '18.5 - 24.9' },
  { name: 'smoking', label: 'Smoking Status', placeholder: '0-3', hint: '0=Former, 1=Never, 2=Active, 3=Unknown', range: '0 - 3' },
]

export default function Stroke() {
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
      const response = await axios.post(`${API_URL}/predict/stroke`, payload)
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
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Stroke Prediction</h1>
              <p className="text-pink-100 text-sm mt-1">Classify stroke risk using demographic & health data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="form-card" id="stroke-form">
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
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</> : <><Heart className="w-5 h-5" /> Predict Now</>}
          </button>
        </form>

        {error && <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm animate-slide-up">⚠️ {error}</div>}
        <ResultCard result={result} />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fade-in stagger-3">
          <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 border border-theme-maroon/10 shadow-lg">
            <h2 className="text-xl font-black text-theme-maroon uppercase mb-6 flex items-center gap-2 tracking-tight">
              <Zap className="w-5 h-5 text-theme-gold" />
              Stroke Risk Guide
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Hypertension', desc: 'High blood pressure is the leading cause of stroke. It damages the arteries over time.' },
                { title: 'BMI & Glucose', desc: 'High BMI and average glucose levels are strongly linked to Type 2 diabetes and cerebrovascular issues.' },
                { title: 'Heart Disease', desc: 'Existing cardio conditions significantly increase the likelihood of clots reaching the brain.' },
                { title: 'Smoking Status', desc: 'Smoking causes narrowing of blood vessels and increases clot formation.' }
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-theme-gold pl-4">
                  <h3 className="font-bold text-theme-maroon text-sm uppercase">{item.title}</h3>
                  <p className="text-theme-maroon/70 text-sm font-medium mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-theme-maroon rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
            <h2 className="text-xl font-black uppercase mb-6 tracking-tight">Rapid AI Response</h2>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
              This model uses the <strong>Stroke Prediction Dataset</strong>. It evaluates 10 non-linear risk factors to detect early signs of cerebrovascular risks.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-xs italic text-white/70">
              "Remember the FAST acronym: Face drooping, Arm weakness, Speech difficulty, Time to call emergency."
            </div>
          </div>
        </div>

        {/* About Disease Section */}
        <div className="mt-12 bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-theme-maroon/10 shadow-xl shadow-theme-maroon/5 animate-fade-in stagger-4">
          <h2 className="text-2xl font-black text-theme-maroon uppercase mb-6 tracking-tight">Understanding Stroke</h2>
          <div className="prose prose-rose max-w-none">
            <p className="text-theme-maroon/80 text-lg leading-relaxed mb-6 font-medium">
              A stroke occurs when the blood supply to part of your brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Brain cells begin to die in minutes. A stroke is a medical emergency, and prompt treatment is crucial. Early action can reduce brain damage and other complications. Risk factors like Hypertension and Heart Disease are the primary drivers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h4 className="font-bold text-red-600 mb-2 uppercase text-sm">Main Symptoms</h4>
                <ul className="text-red-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Trouble speaking</li>
                  <li>Paralysis/Numbness</li>
                  <li>Vision problems</li>
                  <li>Sudden headache</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <h4 className="font-bold text-pink-600 mb-2 uppercase text-sm">Risk Factors</h4>
                <ul className="text-pink-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Hypertension</li>
                  <li>Smoking status</li>
                  <li>High cholesterol</li>
                  <li>Diabetes history</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-orange-600 mb-2 uppercase text-sm">Prevention</h4>
                <ul className="text-orange-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Control BP level</li>
                  <li>Stop smoking</li>
                  <li>Manage diabetes</li>
                  <li>Regular exercise</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
