/**
 * Diabetes.jsx — Diabetes prediction page.
 * Red/Pink themed form card with gradient button.
 */
import { useState } from 'react'
import axios from 'axios'
import { Activity, Loader2, Heart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'

import { API_BASE_URL } from '../api/config'

const API_URL = API_BASE_URL

const fields = [
  { name: 'Pregnancies', label: 'Pregnancies', placeholder: 'e.g. 6', type: 'number', hint: 'Number of pregnancies', range: '0 - 17' },
  { name: 'Glucose', label: 'Glucose Level', placeholder: 'e.g. 148', type: 'number', hint: 'Plasma glucose (mg/dL)', range: '70 - 140 mg/dL' },
  { name: 'BloodPressure', label: 'Blood Pressure', placeholder: 'e.g. 72', type: 'number', hint: 'Diastolic BP (mm Hg)', range: '60 - 90 mm Hg' },
  { name: 'SkinThickness', label: 'Skin Thickness', placeholder: 'e.g. 35', type: 'number', hint: 'Triceps fold (mm)', range: '10 - 50 mm' },
  { name: 'Insulin', label: 'Insulin Level', placeholder: 'e.g. 0', type: 'number', hint: '2-Hour serum insulin', range: '15 - 276 μU/mL' },
  { name: 'BMI', label: 'BMI', placeholder: 'e.g. 33.6', type: 'number', hint: 'Body Mass Index', range: '18.5 - 25' },
  { name: 'DiabetesPedigreeFunction', label: 'Hereditary Score', placeholder: 'e.g. 0.627', type: 'number', hint: 'Genetic risk factor', range: '0.08 - 2.42' },
  { name: 'Age', label: 'Age', placeholder: 'e.g. 50', type: 'number', hint: 'Age in years', range: '1 - 100' },
]

export default function Diabetes() {
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
      const response = await axios.post(`${API_URL}/predict/diabetes`, payload)
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
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Diabetes Prediction</h1>
              <p className="text-pink-100 text-sm mt-1">Enter clinical parameters to assess diabetes risk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="form-card" id="diabetes-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div key={field.name} className="relative group/field">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-bold text-theme-maroon uppercase tracking-tight">
                    {field.label}
                  </label>
                  <span className="text-[10px] font-black text-theme-gold bg-theme-gold/10 px-2 py-0.5 rounded-full uppercase">
                    Normal: {field.range}
                  </span>
                </div>
                <input
                  type={field.type}
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

          <button type="submit" disabled={loading} className="btn-primary mt-8" id="predict-diabetes-btn">
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</>
            ) : (
              <><Heart className="w-5 h-5" /> Predict Now</>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm animate-slide-up">
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        <ResultCard result={result} />

        {/* Information Guide Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fade-in stagger-3">
          <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 border border-theme-maroon/10 shadow-lg">
            <h2 className="text-xl font-black text-theme-maroon uppercase mb-6 flex items-center gap-2 tracking-tight">
              <Activity className="w-5 h-5 text-theme-gold" />
              Parameter Guide
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Plasma Glucose', desc: 'The concentration of sugar in your blood. Readings above 140 mg/dL after fasting can indicate pre-diabetes or diabetes.' },
                { title: 'Blood Pressure', desc: 'Diastolic pressure is the pressure in your arteries when your heart rests between beats. High BP is strongly correlated with Type 2 diabetes.' },
                { title: 'Body Mass Index (BMI)', desc: 'A measure of body fat based on height and weight. A BMI over 30 is considered a significant risk factor.' },
                { title: 'Pedigree Function', desc: 'A score based on family history that estimates the hereditary risk of developing diabetes.' }
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
            <h2 className="text-xl font-black uppercase mb-6 tracking-tight">Why these details matter?</h2>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
              Our AI model uses the <strong>PIMA Indian Diabetes Dataset</strong> standards. It analyzes the complex non-linear relationships between these 8 variables to find patterns that a simple chart might miss.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <h4 className="font-bold text-xs uppercase tracking-widest text-theme-gold mb-2">Pro Tip</h4>
              <p className="text-white/70 text-xs italic">
                "Consistent monitoring and early detection can reduce the risk of long-term complications by up to 60% through proactive lifestyle changes."
              </p>
            </div>
          </div>
        </div>

        {/* About Disease Section */}
        <div className="mt-12 bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-theme-maroon/10 shadow-xl shadow-theme-maroon/5 animate-fade-in stagger-4">
          <h2 className="text-2xl font-black text-theme-maroon uppercase mb-6 tracking-tight">Understanding Diabetes</h2>
          <div className="prose prose-rose max-w-none">
            <p className="text-theme-maroon/80 text-lg leading-relaxed mb-6 font-medium">
              Diabetes Mellitus is a chronic metabolic disorder characterized by elevated levels of blood glucose (blood sugar), which leads over time to serious damage to the heart, blood vessels, eyes, kidneys, and nerves. The most common is Type 2 diabetes, usually in adults, which occurs when the body becomes resistant to insulin or doesn't make enough insulin.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h4 className="font-bold text-red-600 mb-2 uppercase text-sm">Key Symptoms</h4>
                <ul className="text-red-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Increased thirst (Polydipsia)</li>
                  <li>Frequent urination</li>
                  <li>Unexplained weight loss</li>
                  <li>Extreme fatigue</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <h4 className="font-bold text-pink-600 mb-2 uppercase text-sm">Main Drivers</h4>
                <ul className="text-pink-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Genetics & Heredity</li>
                  <li>Inactivity & Obesity</li>
                  <li>High Blood Pressure</li>
                  <li>Poor Diet Choices</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-orange-600 mb-2 uppercase text-sm">Prevention</h4>
                <ul className="text-orange-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Active Lifestyle</li>
                  <li>Fiber-rich Diet</li>
                  <li>Regular check-ups</li>
                  <li>Weight Management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
