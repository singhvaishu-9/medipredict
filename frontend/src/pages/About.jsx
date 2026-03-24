import React from 'react'
import { Heart, Target, Activity, Brain, Shield, Droplets, ShieldCheck, Cpu, LayoutGrid, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-theme-top py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background large text watermark */}
      <div className="absolute top-20 right-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-5 z-0">
        <h1 className="text-[12rem] font-bold text-theme-maroon whitespace-nowrap leading-none tracking-tighter uppercase translate-x-1/2">PLATFORM</h1>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <button 
          onClick={() => navigate('/')}
          className="group mb-12 flex items-center gap-2 px-4 py-2 bg-theme-maroon/10 hover:bg-theme-maroon/20 backdrop-blur-md rounded-full text-theme-maroon text-sm font-bold transition-all border border-theme-maroon/20 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-theme-maroon/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 text-sm text-theme-maroon border border-theme-maroon/20">
            <LayoutGrid className="w-4 h-4 text-theme-maroon" />
            <span className="font-semibold">Our Ecosystem</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-theme-maroon mb-6 tracking-tight uppercase">
            About the <span className="text-theme-gold">Platform</span>
          </h1>
          <p className="text-lg text-theme-maroon/70 max-w-2xl mx-auto font-medium">
            MediPredict AI is a comprehensive disease analysis suite built to empower individuals with instant, ML-driven health insights.
          </p>
        </div>

        {/* Core Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 animate-fade-in stagger-1">
          <div className="group bg-white/40 backdrop-blur-md rounded-[2.5rem] p-10 border border-theme-maroon/10 hover:bg-theme-maroon hover:text-white transition-all duration-500 shadow-xl">
            <Target className="w-12 h-12 text-theme-gold mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-black uppercase mb-4 tracking-tight">Purpose-Built</h2>
            <p className="text-inherit opacity-80 leading-relaxed font-medium">
              We developed this website to bridge the gap between complex medical datasets and user-friendly diagnostics. 
              Our platform processes multiple clinical parameters to provide immediate, understandable risk assessments.
            </p>
          </div>
          <div className="group bg-white/40 backdrop-blur-md rounded-[2.5rem] p-10 border border-theme-maroon/10 hover:bg-theme-maroon hover:text-white transition-all duration-500 shadow-xl">
            <Cpu className="w-12 h-12 text-theme-gold mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-black uppercase mb-4 tracking-tight">Machine Learning First</h2>
            <p className="text-inherit opacity-80 leading-relaxed font-medium">
              Every prediction is powered by a high-performance Random Forest model, trained on thousands of clinical records to ensure 
              that the results you see are grounded in statistical medical evidence.
            </p>
          </div>
        </div>

        {/* Disease Coverage Section */}
        <section className="mb-20 animate-fade-in stagger-2">
          <h2 className="text-3xl font-black text-theme-maroon uppercase mb-12 tracking-tight text-center">Comprehensive Coverage</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Diabetes', icon: <Activity className="w-6 h-6" />, desc: 'Analyzes insulin, glucose, and BMI to detect metabolic risks early.' },
              { title: 'Cardiopathy', icon: <Heart className="w-6 h-6" />, desc: 'Evaluates cardiovascular health through pressure and cholesterol tracking.' },
              { title: 'Parkinson\'s', icon: <Brain className="w-6 h-6" />, desc: 'Uses advanced voice frequency analysis to detect early neuro-indicators.' },
              { title: 'Oncology', icon: <Shield className="w-6 h-6" />, desc: 'Assesses cell nuclei data for precision screening of malignant indicators.' },
              { title: 'Hepatology', icon: <Droplets className="w-6 h-6" />, desc: 'Monitors liver enzymes and bilirubin levels for biochemical health.' }
            ].map((d, i) => (
              <div key={d.title} className="bg-white/50 backdrop-blur-xl border border-theme-maroon/10 rounded-3xl p-6 shadow-lg shadow-theme-maroon/5 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-theme-maroon/10 flex items-center justify-center text-theme-maroon mb-4">
                  {d.icon}
                </div>
                <h3 className="text-lg font-black text-theme-maroon uppercase mb-2">{d.title}</h3>
                <p className="text-theme-maroon/60 text-sm font-medium leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Commitment Badge */}
        <div className="bg-theme-maroon rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden animate-fade-in stagger-3">
          <div className="absolute top-0 right-0 w-40 h-40 bg-theme-gold/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
             <ShieldCheck className="w-10 h-10 text-theme-gold" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-black uppercase mb-2">Non-Diagnostic Tool</h3>
            <p className="text-white/70 font-medium">
              Please note that MediPredict AI is an educational and screening platform. It does not provide professional medical diagnosis. 
              Its primary purpose is to encourage proactive health awareness and professional consultation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
