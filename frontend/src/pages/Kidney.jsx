/**
 * Kidney.jsx — Kidney disease prediction page.
 */
import { useState } from 'react'
import axios from 'axios'
import { FlaskConical, Loader2, Heart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'

import { API_BASE_URL } from '../api/config'

const API_URL = API_BASE_URL

const fields = [
  { name: 'age', label: 'Age', placeholder: 'e.g. 48', hint: 'Age in years', range: '1 - 100' },
  { name: 'bp', label: 'Blood Pressure', placeholder: 'e.g. 80', hint: 'Resting BP', range: '60 - 120 mmHg' },
  { name: 'sg', label: 'Specific Gravity', placeholder: 'e.g. 1.020', hint: 'Urine concentration', range: '1.005 - 1.030' },
  { name: 'al', label: 'Albumin', placeholder: '0-5', hint: 'Protein in urine (0=None)', range: '0 - 5' },
  { name: 'su', label: 'Sugar', placeholder: '0-5', hint: 'Sugar in urine (0=None)', range: '0 - 5' },
  { name: 'rbc', label: 'Red Blood Cells', placeholder: '0=Abnormal, 1=Normal', hint: 'Presence of RBCs', range: '0 or 1' },
  { name: 'pc', label: 'Pus Cell', placeholder: '0=Abnormal, 1=Normal', hint: 'Presence of pus cells', range: '0 or 1' },
  { name: 'ba', label: 'Bacteria', placeholder: '0=Not Present, 1=Present', hint: 'Urine bacteria status', range: '0 or 1' },
  { name: 'bgr', label: 'Blood Glucose Rand', placeholder: 'e.g. 121', hint: 'Random blood sugar', range: '70 - 140 mg/dL' },
  { name: 'bu', label: 'Blood Urea', placeholder: 'e.g. 36', hint: 'Waste nitrogen in blood', range: '7 - 20 mg/dL' },
  { name: 'sc', label: 'Serum Creatinine', placeholder: 'e.g. 1.2', hint: 'Muscle waste filter rate', range: '0.6 - 1.3 mg/dL' },
]

export default function Kidney() {
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
      const response = await axios.post(`${API_URL}/predict/kidney`, payload)
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
              <FlaskConical className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Kidney Disease Prediction</h1>
              <p className="text-pink-100 text-sm mt-1">Assess renal health using clinical indicators</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="form-card" id="kidney-form">
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
              <FlaskConical className="w-5 h-5 text-theme-gold" />
              Renal Guide
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Serum Creatinine', desc: 'A waste product from muscle breakdown. High levels indicate kidneys aren\'t filtering effectively.' },
                { title: 'Albumin (al)', desc: 'A protein that shouldn\'t be in urine. Levels from 1-5 indicate varying degrees of kidney leakage.' },
                { title: 'Specific Gravity', desc: 'Measures urine concentration. Low values can indicate the kidneys\' inability to concentrate urine.' },
                { title: 'Blood Urea', desc: 'Measures the amount of nitrogen in your blood that comes from the waste product urea.' }
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-theme-gold pl-4">
                  <h3 className="font-bold text-theme-maroon text-sm uppercase">{item.title}</h3>
                  <p className="text-theme-maroon/70 text-sm font-medium mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-theme-maroon rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
            <h2 className="text-xl font-black uppercase mb-6 tracking-tight">Kidney Function Insights</h2>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
              Our model uses <strong>Chronic Kidney Disease dataset</strong> parameters. It identifies renal failure patterns by analyzing 11 critical biochemical markers.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-xs italic text-white/70">
              "Chronic kidney disease often has no symptoms until it is very advanced. Early AI screening can be life-saving."
            </div>
          </div>
        </div>

        {/* About Disease Section */}
        <div className="mt-12 bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-theme-maroon/10 shadow-xl shadow-theme-maroon/5 animate-fade-in stagger-4">
          <h2 className="text-2xl font-black text-theme-maroon uppercase mb-6 tracking-tight">Understanding Kidney Disease</h2>
          <div className="prose prose-rose max-w-none">
            <p className="text-theme-maroon/80 text-lg leading-relaxed mb-6 font-medium">
              Chronic Kidney Disease (CKD) involves a gradual loss of kidney function over time. Kidneys are responsible for filtering wastes and excess fluids from your blood. If kidney disease worsens, wastes can build up to high levels in your blood and make you feel sick. Early detection through biochemical markers like Creatinine and Specific Gravity is vital for management.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h4 className="font-bold text-red-600 mb-2 uppercase text-sm">Potential Signs</h4>
                <ul className="text-red-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Nausea & Vomiting</li>
                  <li>Sleep problems</li>
                  <li>Changes in urination</li>
                  <li>Swelling of feet/ankles</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <h4 className="font-bold text-pink-600 mb-2 uppercase text-sm">Major Causes</h4>
                <ul className="text-pink-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Diabetes (Type 1 or 2)</li>
                  <li>High blood pressure</li>
                  <li>Glomerulonephritis</li>
                  <li>Polycystic kidney</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-orange-600 mb-2 uppercase text-sm">Management</h4>
                <ul className="text-orange-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Control BP & Sugar</li>
                  <li>Low-salt nutrition</li>
                  <li>Stay hydrated</li>
                  <li>Regular GFR testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
