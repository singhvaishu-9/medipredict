/**
 * Home.jsx — Landing page with gradient hero, animated heart,
 * disease cards grid, how-it-works section, and stats bar.
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AnatomicalHeart from '../components/AnatomicalHeart'
import {
  Heart, Activity, Brain, Shield, Droplets,
  Search, ClipboardList, LineChart,
  Award, Cpu,
  FlaskConical, Zap, Thermometer, Waves
} from 'lucide-react'

import { API_BASE_URL } from '../api/config'

const API_URL = API_BASE_URL

const diseases = [
  {
    title: 'Diabetes',
    path: '/diabetes',
    icon: <Activity className="w-7 h-7" />,
    desc: 'Evaluate diabetes risk using glucose, BMI, and age parameters.',
  },
  {
    title: 'Heart Disease',
    path: '/heart',
    icon: <Heart className="w-7 h-7" />,
    desc: 'Predict heart disease based on clinical indicators like blood pressure and cholesterol.',
  },
  {
    title: "Parkinson's",
    path: '/parkinsons',
    icon: <Brain className="w-7 h-7" />,
    desc: 'Analyze vocal tremor and frequency features for early detection.',
  },
  {
    title: 'Breast Cancer',
    path: '/breast-cancer',
    icon: <Shield className="w-7 h-7" />,
    desc: 'Assess cell nuclei measurements from digitized images.',
  },
  {
    title: 'Liver Disease',
    path: '/liver',
    icon: <Droplets className="w-7 h-7" />,
    desc: 'Check liver health using bilirubin, enzyme, and protein levels.',
  },
  {
    title: 'Kidney Disease',
    path: '/kidney',
    icon: <FlaskConical className="w-7 h-7" />,
    desc: 'Predict chronic kidney disease using renal function indicators.',
  },
  {
    title: 'Stroke',
    path: '/stroke',
    icon: <Zap className="w-7 h-7" />,
    desc: 'Assess stroke risk based on lifestyle and clinical risk factors.',
  },
  {
    title: 'Pneumonia',
    path: '/pneumonia',
    icon: <Thermometer className="w-7 h-7" />,
    desc: 'Evaluate respiratory health and pneumonia risk from symptoms.',
  },
  {
    title: 'Anemia',
    path: '/anemia',
    icon: <Waves className="w-7 h-7" />,
    desc: 'Predict anemia based on hemoglobin and blood markers.',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Select Disease',
    desc: 'Choose from 5 AI-powered disease prediction models.',
    icon: <Search className="w-6 h-6" />,
  },
  {
    step: '02',
    title: 'Enter Parameters',
    desc: 'Fill in your clinical measurements and health data.',
    icon: <ClipboardList className="w-6 h-6" />,
  },
  {
    step: '03',
    title: 'Get Prediction',
    desc: 'Receive instant AI-powered health risk assessment.',
    icon: <LineChart className="w-6 h-6" />,
  },
]


export default function Home() {
  const [textInput, setTextInput] = useState('')
  const [optIn, setOptIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleTextPredict = async (e) => {
    e.preventDefault()
    if (!optIn) {
      setError('You must opt-in to use the AI text predictor.')
      return
    }
    if (textInput.length < 10) {
      setError('Please provide more details about your symptoms.')
      return
    }
    setError('')
    setResult(null)
    setLoading(true)
    
    try {
      const response = await axios.post(`${API_URL}/predict/text`, {
        text: textInput,
        optIn: optIn
      })
      setResult(response.data.prediction)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to connect to the backend AI service.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Background large text watermark as in image */}
      <div className="absolute top-20 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-5 z-0">
        <h1 className="text-[15rem] font-bold text-theme-maroon whitespace-nowrap leading-none tracking-tighter">AI HEALTH</h1>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="w-full relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-theme-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-theme-maroon/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

            {/* LEFT — Text Content */}
            <div className="flex-1 text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 text-sm text-theme-maroon shadow-sm shadow-theme-maroon/5 border border-white/50">
                <Heart className="w-4 h-4 fill-theme-maroon text-theme-maroon" />
                <span className="font-semibold">AI-Powered Health Technology</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-theme-maroon leading-[1.15] mb-6 tracking-tight">
                PRECISION<br className="hidden sm:block" />
                AI-BASED DISEASE<br className="hidden sm:block" />
                PREDICTION
              </h1>

              <p className="text-lg sm:text-lg text-theme-maroon/80 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 font-medium tracking-wide">
                MediPredict AI combines advanced deep learning and health data for precise, real-time disease risk assessment and personalized proactive health management.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => document.getElementById('diseases-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary w-auto rounded-full font-semibold px-8"
                  id="hero-cta"
                >
                  Check Your Health →
                </button>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-outlined w-auto rounded-full font-semibold px-8"
                  id="hero-learn-more"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* RIGHT — Animated Heart */}
            <div className="flex-1 flex justify-center items-center relative animate-fade-in stagger-2">
              {/* Pulse rings */}
              <div className="pulse-ring border-theme-maroon/20" />
              <div className="pulse-ring pulse-ring-delay border-theme-maroon/20" />

              {/* Professional Abstract SVG Anatomical Heart */}
              <div className="relative z-10 animate-float mt-10 lg:mt-0">
                <AnatomicalHeart className="w-[300px] sm:w-[400px] lg:w-[450px] h-auto animate-heartbeat" />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-2 -left-4 sm:top-2 sm:left-4 bg-white/70 backdrop-blur-md rounded-2xl p-3 shadow-lg shadow-theme-maroon/10 border border-white/50 animate-float">
                <p className="text-theme-maroon font-bold text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-theme-gold" />
                  98.7% Confidence
                </p>
              </div>
              <div className="absolute -bottom-2 -right-4 sm:bottom-2 sm:right-4 bg-white/70 backdrop-blur-md rounded-2xl p-3 shadow-lg shadow-theme-maroon/10 border border-white/50 animate-float stagger-3">
                <p className="text-theme-maroon font-bold text-sm flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-theme-gold" />
                  9 AI Models
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DISEASE CARDS GRID ===== */}
      <section id="diseases-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((disease, i) => (
            <Link
              key={disease.path}
              to={disease.path}
              id={`disease-card-${disease.path.replace('/', '')}`}
              className={`disease-card group flex flex-col items-center text-center gap-4 animate-fade-in stagger-${i + 1}`}
            >
              {/* Icon */}
              <div className="flex gap-4 w-full justify-between items-start">
                 <div className="w-16 h-16 rounded-2xl bg-white/50 border border-theme-maroon/10 flex items-center justify-center text-theme-maroon shadow-sm group-hover:scale-110 group-hover:bg-theme-maroon group-hover:text-white transition-all duration-300">
                  {disease.icon}
                 </div>
                 <div className="w-8 h-8 rounded-full bg-theme-gold flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all font-bold">
                   ↗
                 </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-theme-maroon tracking-tight mt-2 uppercase transition-colors duration-300 w-full text-left">
                {disease.title}
              </h3>

              {/* Description */}
              <p className="text-theme-maroon/70 text-sm leading-relaxed w-full text-left font-medium">
                {disease.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== AI TEXT PREDICTOR ===== */}
      <section className="py-16 sm:py-20 relative z-10 border-t border-theme-maroon/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-xl border border-theme-maroon/10 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-theme-maroon/5 text-center">
            <h2 className="text-3xl font-black text-theme-maroon uppercase tracking-tight mb-4">
              AI Symptom Analyzer
            </h2>
            <p className="text-theme-maroon/70 text-base leading-relaxed mb-8 max-w-xl mx-auto font-medium">
              Describe how you're feeling in your own words, and our advanced AI will provide a preliminary risk assessment.
            </p>

            <form onSubmit={handleTextPredict} className="flex flex-col gap-5 text-left">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="E.g., I've been having frequent headaches, feeling very fatigued lately..."
                className="input-field min-h-[120px] resize-y"
                required
              />

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={optIn}
                  onChange={(e) => setOptIn(e.target.checked)}
                  className="w-5 h-5 rounded border-theme-maroon/20 text-theme-maroon focus:ring-theme-maroon cursor-pointer mt-0.5"
                />
                <span className="text-sm text-theme-maroon/80 font-medium leading-relaxed group-hover:text-theme-maroon transition-colors">
                  I consent to having my described symptoms analyzed by the AI for educational and preliminary assessment purposes. I understand this is not medical advice.
                </span>
              </label>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm animate-slide-up">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Analyzing Symptoms...' : 'Analyze My Symptoms'}
              </button>
            </form>

            {result && (
              <div className="mt-8 p-6 rounded-2xl bg-theme-card border border-theme-maroon/20 text-left animate-slide-up shadow-lg shadow-theme-maroon/5">
                <h4 className="text-theme-maroon font-bold text-lg mb-2">AI Assessment</h4>
                <p className="text-theme-maroon/80 leading-relaxed text-sm whitespace-pre-wrap">
                  {result}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 bg-white/40 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-theme-maroon/10 shadow-xl shadow-theme-maroon/5 items-center">
            
            <div className="flex-1 animate-fade-in">
              <div className="inline-block px-4 py-1.5 bg-theme-gold/20 text-theme-maroon rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-theme-gold/30">
                About Us
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-theme-maroon uppercase tracking-tight mb-4">
                Global AI Medic Data Integration Center
              </h2>
              <p className="text-theme-maroon/70 text-lg leading-relaxed mb-8 max-w-xl font-medium">
                Combining advanced high-performance computing, secure medical databases, and deep learning for a patient first approach to early disease diagnosis.
              </p>
              <div className="flex items-center gap-6">
                <Link to="/learn-more" className="btn-primary w-auto rounded-full font-semibold px-8 whitespace-nowrap">
                  Learn More ↗
                </Link>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full relative z-10">
              {howItWorks.map((item, i) => (
                <div key={item.step} className={`flex flex-col items-center text-center bg-white/60 backdrop-blur-md border border-theme-maroon/10 rounded-3xl p-6 shadow-sm animate-fade-in stagger-${i + 1}`}>
                  <div className="w-12 h-12 rounded-2xl bg-theme-maroon/10 flex items-center justify-center text-theme-maroon mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-theme-maroon mb-2">{item.title}</h3>
                  <p className="text-theme-maroon/60 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>



      {/* Very bottom divider mimicking the image layout */}
      <div className="w-full border-t border-theme-maroon/10 py-6 text-center z-10 relative">
        <h2 className="text-2xl font-black text-theme-maroon uppercase tracking-wide">WE OFFER AI GENOMIC INSIGHTS</h2>
      </div>

    </div>
  )
}
