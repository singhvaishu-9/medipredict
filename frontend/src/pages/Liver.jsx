/**
 * Liver.jsx — Liver disease prediction page.
 * Red/Pink themed, 10 biochemical features.
 */
import { useState } from 'react'
import axios from 'axios'
import { Droplets, Loader2, Heart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'

import { API_BASE_URL } from '../api/config'

const API_URL = API_BASE_URL

const fields = [
  { name: 'Age', label: 'Age', placeholder: 'e.g. 65', hint: 'Patient age in years', range: '1 - 100' },
  { name: 'Gender', label: 'Gender', placeholder: '0=Female, 1=Male', hint: 'Biological gender (1=M, 0=F)', range: '0 or 1' },
  { name: 'Total_Bilirubin', label: 'Total Bilirubin', placeholder: 'e.g. 0.7', hint: 'Total pigment in blood', range: '0.1 - 1.2 mg/dL' },
  { name: 'Direct_Bilirubin', label: 'Direct Bilirubin', placeholder: 'e.g. 0.1', hint: 'Conjugated bilirubin', range: '0 - 0.3 mg/dL' },
  { name: 'Alkaline_Phosphotase', label: 'Alkaline Phos.', placeholder: 'e.g. 187', hint: 'Liver/Bone enzyme', range: '44 - 147 IU/L' },
  { name: 'Alamine_Aminotransferase', label: 'ALT Enzyme', placeholder: 'e.g. 16', hint: 'Main liver damage marker', range: '7 - 55 IU/L' },
]

export default function Liver() {
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
      const response = await axios.post(`${API_URL}/predict/liver`, payload)
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
              <Droplets className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Liver Disease Prediction</h1>
              <p className="text-pink-100 text-sm mt-1">Evaluate liver health using biochemical markers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="form-card" id="liver-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div key={field.name} className="relative group/field">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-theme-maroon uppercase tracking-tight">
                    {field.label}
                  </label>
                  <span className="text-[10px] font-black text-theme-gold bg-theme-gold/10 px-2 py-0.5 rounded-full uppercase">
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
                  className="input-field group-hover/field:border-theme-maroon/30 transition-all duration-300"
                  id={`input-${field.name}`}
                />
                <div className="opacity-0 group-hover/field:opacity-100 transition-opacity absolute -top-10 left-0 right-0 bg-theme-maroon text-white text-[10px] p-2 rounded-lg shadow-xl pointer-events-none z-10 border border-white/20">
                  {field.hint}
                </div>
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-8" id="predict-liver-btn">
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
              <Droplets className="w-5 h-5 text-theme-gold" />
              Biochem Guide
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Bilirubin', desc: 'A substance produced during the normal breakdown of red blood cells. High levels can indicate liver or bile duct issues.' },
                { title: 'ALT & AST', desc: 'Enzymes primarily found in the liver. When the liver is damaged, these enzymes leak into the bloodstream.' },
                { title: 'Alkaline Phosphatase', desc: 'An enzyme found in the liver and bones. High levels can suggest liver disease or blocked bile ducts.' },
                { title: 'Albumin/Globulin Ratio', desc: 'Measures the proportion of two types of proteins. An abnormal ratio can signal liver or kidney problems.' }
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
            <h2 className="text-xl font-black uppercase mb-6 tracking-tight">Hepatology Analysis</h2>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
              Our model uses the <strong>ILPD (Indian Liver Patient Dataset)</strong> standards. It evaluates 10 clinical data points to identify liver health risks with high specificity.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <h4 className="font-bold text-xs uppercase tracking-widest text-theme-gold mb-2">Health Tip</h4>
              <p className="text-white/70 text-xs italic">
                "Maintaining a balanced diet and limiting alcohol consumption can significantly reduce the liver enzyme burden and promote regeneration."
              </p>
            </div>
          </div>
        </div>

        {/* About Disease Section */}
        <div className="mt-12 bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-theme-maroon/10 shadow-xl shadow-theme-maroon/5 animate-fade-in stagger-4">
          <h2 className="text-2xl font-black text-theme-maroon uppercase mb-6 tracking-tight">Understanding Liver Disease</h2>
          <div className="prose prose-rose max-w-none">
            <p className="text-theme-maroon/80 text-lg leading-relaxed mb-6 font-medium">
              Liver Disease is any disturbance of liver function that causes illness. The liver is responsible for many critical functions, including detoxification, protein synthesis, and production of biochemicals necessary for digestion. Chronic liver disease can progress to Cirrhosis or Liver Cancer if not managed through biochemical monitoring.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h4 className="font-bold text-red-600 mb-2 uppercase text-sm">Common Symptoms</h4>
                <ul className="text-red-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Yellowish skin (Jaundice)</li>
                  <li>Abdominal pain/swelling</li>
                  <li>Chronic fatigue</li>
                  <li>Dark urine color</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <h4 className="font-bold text-pink-600 mb-2 uppercase text-sm">Causes</h4>
                <ul className="text-pink-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Viral Hepatitis (A, B, C)</li>
                  <li>Alcohol consumption</li>
                  <li>Fatty liver (NAFLD)</li>
                  <li>Autoimmune issues</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-orange-600 mb-2 uppercase text-sm">Liver Care</h4>
                <ul className="text-orange-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Limit alcohol intake</li>
                  <li>Healthy weight focus</li>
                  <li>Safe medication use</li>
                  <li>Regular LFT tests</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
