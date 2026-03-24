/**
 * BreastCancer.jsx — Breast cancer prediction page.
 * Red/Pink themed, 30 cell nuclei features grouped.
 */
import { useState } from 'react'
import axios from 'axios'
import { Shield, Loader2, Heart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'

import { API_BASE_URL } from '../api/config'

const API_URL = API_BASE_URL

const fields = [
  // Mean features
  { name: 'mean_radius', label: 'Radius', placeholder: 'e.g. 17.99', hint: 'Mean distance from center to points', group: 'mean', range: '6.9 - 28.1' },
  { name: 'mean_texture', label: 'Texture', placeholder: 'e.g. 10.38', hint: 'Standard deviation of gray-scale values', group: 'mean', range: '9.7 - 39.2' },
  { name: 'mean_perimeter', label: 'Perimeter', placeholder: 'e.g. 122.8', hint: 'Mean size of the core tumor', group: 'mean', range: '43.8 - 188.5' },
  { name: 'mean_area', label: 'Area', placeholder: 'e.g. 1001', hint: 'Mean area of nuclei', group: 'mean', range: '143.5 - 2501' },
  { name: 'mean_smoothness', label: 'Smoothness', placeholder: 'e.g. 0.1184', hint: 'Mean variation in radius lengths', group: 'mean', range: '0.05 - 0.16' },
  { name: 'mean_compactness', label: 'Compactness', placeholder: 'e.g. 0.2776', hint: 'perimeter^2 / area - 1.0', group: 'mean', range: '0.01 - 0.34' },
  { name: 'mean_concavity', label: 'Concavity', placeholder: 'e.g. 0.3001', hint: 'Severity of concave portions', group: 'mean', range: '0.0 - 0.42' },
  { name: 'mean_concave_points', label: 'Concave Pts', placeholder: 'e.g. 0.1471', hint: 'Number of concave portions', group: 'mean', range: '0.0 - 0.20' },
  { name: 'mean_symmetry', label: 'Symmetry', placeholder: 'e.g. 0.2419', hint: 'Nuclei symmetry score', group: 'mean', range: '0.10 - 0.30' },
  { name: 'mean_fractal_dimension', label: 'Fractal Dim.', placeholder: 'e.g. 0.07871', hint: 'Coastline approximation - 1', group: 'mean', range: '0.04 - 0.09' },
  // SE features
  { name: 'se_radius', label: 'SE Radius', placeholder: 'e.g. 1.095', hint: 'Standard error of radius', group: 'se', range: '0.11 - 2.87' },
  { name: 'se_texture', label: 'SE Texture', placeholder: 'e.g. 0.9053', hint: 'SE of texture', group: 'se', range: '0.36 - 4.88' },
  { name: 'se_perimeter', label: 'SE Perimeter', placeholder: 'e.g. 8.589', hint: 'SE of perimeter', group: 'se', range: '0.75 - 21.9' },
  { name: 'se_area', label: 'SE Area', placeholder: 'e.g. 153.4', hint: 'SE of area', group: 'se', range: '6.8 - 542.2' },
  { name: 'se_smoothness', label: 'SE Smoothness', placeholder: 'e.g. 0.006399', hint: 'SE of smoothness', group: 'se', range: '0.001 - 0.03' },
  { name: 'se_compactness', label: 'SE Compactness', placeholder: 'e.g. 0.04904', hint: 'SE of compactness', group: 'se', range: '0.002 - 0.13' },
  { name: 'se_concavity', label: 'SE Concavity', placeholder: 'e.g. 0.05373', hint: 'SE of concavity', group: 'se', range: '0.0 - 0.39' },
  { name: 'se_concave_points', label: 'SE Concave Pts', placeholder: 'e.g. 0.01587', hint: 'SE of concave points', group: 'se', range: '0.0 - 0.05' },
  { name: 'se_symmetry', label: 'SE Symmetry', placeholder: 'e.g. 0.03003', hint: 'SE of symmetry', group: 'se', range: '0.01 - 0.07' },
  { name: 'se_fractal_dimension', label: 'SE Fractal Dim.', placeholder: 'e.g. 0.006193', hint: 'SE of fractal dimension', group: 'se', range: '0.001 - 0.02' },
  // Worst features
  { name: 'worst_radius', label: 'Worst Radius', placeholder: 'e.g. 25.38', hint: 'Worst (largest) radius', group: 'worst', range: '7.9 - 36.0' },
  { name: 'worst_texture', label: 'Worst Texture', placeholder: 'e.g. 17.33', hint: 'Worst texture', group: 'worst', range: '12.0 - 49.5' },
  { name: 'worst_perimeter', label: 'Worst Perimeter', placeholder: 'e.g. 184.6', hint: 'Worst perimeter', group: 'worst', range: '50.4 - 251.2' },
  { name: 'worst_area', label: 'Worst Area', placeholder: 'e.g. 2019', hint: 'Worst area', group: 'worst', range: '185.2 - 4254' },
  { name: 'worst_smoothness', label: 'Worst Smoothness', placeholder: 'e.g. 0.1622', hint: 'Worst smoothness', group: 'worst', range: '0.07 - 0.22' },
  { name: 'worst_compactness', label: 'Worst Compactness', placeholder: 'e.g. 0.6656', hint: 'Worst compactness', group: 'worst', range: '0.02 - 1.05' },
  { name: 'worst_concavity', label: 'Worst Concavity', placeholder: 'e.g. 0.7119', hint: 'Worst concavity', group: 'worst', range: '0.0 - 1.25' },
  { name: 'worst_concave_points', label: 'Worst Concave', placeholder: 'e.g. 0.2654', hint: 'Worst concave points', group: 'worst', range: '0.0 - 0.29' },
  { name: 'worst_symmetry', label: 'Worst Symmetry', placeholder: 'e.g. 0.4601', hint: 'Worst symmetry', group: 'worst', range: '0.15 - 0.66' },
  { name: 'worst_fractal_dimension', label: 'Worst Fractal', placeholder: 'e.g. 0.1189', hint: 'Worst fractal dimension', group: 'worst', range: '0.05 - 0.20' },
]

const groupTitles = {
  mean: 'Mean Features',
  se: 'Standard Error Features',
  worst: 'Worst (Largest) Features',
}

export default function BreastCancer() {
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
      const response = await axios.post(`${API_URL}/predict/breast-cancer`, payload)
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
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Breast Cancer Prediction</h1>
              <p className="text-pink-100 text-sm mt-1">Classify tumors using 30 cell nuclei measurements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="form-card" id="breast-cancer-form">
          {['mean', 'se', 'worst'].map((group) => (
            <div key={group} className="mb-8">
              <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
                {groupTitles[group]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {fields.filter(f => f.group === group).map((field) => (
                  <div key={field.name} className="relative group/field">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[10px] font-bold text-theme-maroon uppercase tracking-tight truncate mr-1">
                        {field.label}
                      </label>
                      <span className="text-[7px] font-black text-theme-gold bg-theme-gold/10 px-1 py-0.5 rounded-full uppercase whitespace-nowrap">
                        {field.range}
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
                      className="input-field text-[11px] h-8 transition-all group-hover/field:border-theme-maroon/30"
                      id={`input-${field.name}`}
                    />
                    <div className="opacity-0 group-hover/field:opacity-100 transition-opacity absolute -top-8 left-0 right-0 bg-theme-maroon text-white text-[8px] p-1.5 rounded-lg shadow-xl pointer-events-none z-10 border border-white/20 leading-tight">
                      {field.hint}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button type="submit" disabled={loading} className="btn-primary mt-4" id="predict-bc-btn">
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
              <Shield className="w-5 h-5 text-theme-gold" />
              Oncology Metrics
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Mean Concavity', desc: 'The severity of concave portions of the cell nucleus contour. Higher concavity is often associated with malignancy.' },
                { title: 'Fractal Dimension', desc: 'A complex measure of the "raggedness" of the nucleus boundary, important for distinguishing cell types.' },
                { title: 'Standard Error (SE)', desc: 'Measures the variation in measurements across cells. High SE can indicate irregular cell growth patterns.' },
                { title: 'Worst Perimeter', desc: 'The largest perimeter measured among the cell population, often a key indicator of tumor size and stage.' }
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
            <h2 className="text-xl font-black uppercase mb-6 tracking-tight">Cell Nuclei Analysis</h2>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
              Our model uses the <strong>UCI Wisconsin Breast Cancer Dataset</strong> standards. It processes 30 geometric features of cell nuclei to classify tumors as Benign or Malignant.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <h4 className="font-bold text-xs uppercase tracking-widest text-theme-gold mb-2">Did you know?</h4>
              <p className="text-white/70 text-xs italic">
                "Early identification of malignant indicators through fine-needle aspiration (FNA) data can lead to a 90% survival rate through early treatment."
              </p>
            </div>
          </div>
        </div>

        {/* About Disease Section */}
        <div className="mt-12 bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-theme-maroon/10 shadow-xl shadow-theme-maroon/5 animate-fade-in stagger-4">
          <h2 className="text-2xl font-black text-theme-maroon uppercase mb-6 tracking-tight">Understanding Breast Cancer</h2>
          <div className="prose prose-rose max-w-none">
            <p className="text-theme-maroon/80 text-lg leading-relaxed mb-6 font-medium">
              Breast Cancer is a disease where cells in the breast grow out of control, forming a tumor that can be felt as a lump or seen on an X-ray. It is the most common cancer among women globally, though it can occur in men. Early classification between Benign (non-cancerous) and Malignant (cancerous) is the most critical factor in successful treatment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h4 className="font-bold text-red-600 mb-2 uppercase text-sm">Key Symptoms</h4>
                <ul className="text-red-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>New lump in breast/armpit</li>
                  <li>Thickening of breast tissue</li>
                  <li>Skin dimpling or irritation</li>
                  <li>Nipple discharge/pain</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <h4 className="font-bold text-pink-600 mb-2 uppercase text-sm">Classification</h4>
                <ul className="text-pink-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Benign: Non-invasive</li>
                  <li>Malignant: Spreading</li>
                  <li>In Situ: Confined</li>
                  <li>Metastatic: Advanced</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-orange-600 mb-2 uppercase text-sm">Screening</h4>
                <ul className="text-orange-700/80 text-sm space-y-1 font-medium list-disc pl-4">
                  <li>Self-examination</li>
                  <li>Mammograms</li>
                  <li>Ultrasound scans</li>
                  <li>Biopsy/FNA tests</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
