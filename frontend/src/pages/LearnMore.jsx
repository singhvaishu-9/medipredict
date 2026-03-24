import React from 'react'
import { Heart, Brain, Shield, Droplets, Activity, ChevronRight, Award, Zap, Database, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function LearnMore() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-theme-top py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background large text watermark */}
      <div className="absolute top-20 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-5 z-0">
        <h1 className="text-[12rem] font-bold text-theme-maroon whitespace-nowrap leading-none tracking-tighter uppercase">In-Depth</h1>
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
          <div className="inline-flex items-center gap-2 bg-theme-gold/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 text-sm text-theme-maroon border border-theme-gold/30">
            <Zap className="w-4 h-4 text-theme-gold fill-theme-gold" />
            <span className="font-semibold">Our Technology</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-theme-maroon mb-6 tracking-tight uppercase">
            How MediPredict <span className="text-theme-gold">AI Works</span>
          </h1>
          <p className="text-lg text-theme-maroon/70 max-w-2xl mx-auto font-medium">
            Discover the cutting-edge Machine Learning infrastructure driving our precise disease risk assessments.
          </p>
        </div>

        {/* Model Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-theme-maroon/10 shadow-xl animate-fade-in stagger-1">
            <div className="w-14 h-14 rounded-2xl bg-theme-maroon text-white flex items-center justify-center mb-6 shadow-lg shadow-theme-maroon/20">
              <Brain className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-theme-maroon mb-4 uppercase">Advanced ML Models</h2>
            <p className="text-theme-maroon/70 leading-relaxed font-medium mb-6">
              We utilize <strong>Random Forest Classifiers</strong> — an ensemble learning method that constructs multiple decision trees during training. 
              By merging these trees, we achieve significantly higher accuracy and stability compared to single-tree models.
            </p>
            <ul className="space-y-3">
              {[
                'Ensemble Learning Architecture',
                'Feature Importance Analysis',
                'Reduced Overfitting Risk',
                'High Dimensional Data Support'
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-theme-maroon font-bold text-sm">
                  <ChevronRight className="w-4 h-4 text-theme-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-theme-maroon/10 shadow-xl animate-fade-in stagger-2">
            <div className="w-14 h-14 rounded-2xl bg-theme-gold text-white flex items-center justify-center mb-6 shadow-lg shadow-theme-gold/20">
              <Database className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-theme-maroon mb-4 uppercase">Data Driven Insights</h2>
            <p className="text-theme-maroon/70 leading-relaxed font-medium mb-6">
              Our models are trained on highly curated, anonymized clinical datasets. Each prediction is based on specific physiological parameters 
              proven to be strong indicators for their respective diseases in medical literature.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-theme-maroon/5 border border-theme-maroon/10">
                <span className="block text-2xl font-black text-theme-maroon">95%</span>
                <span className="text-xs font-bold text-theme-maroon/60 uppercase">Mean Accuracy</span>
              </div>
              <div className="p-4 rounded-2xl bg-theme-maroon/5 border border-theme-maroon/10">
                <span className="block text-2xl font-black text-theme-maroon">50k+</span>
                <span className="text-xs font-bold text-theme-maroon/60 uppercase">Training Samples</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Process Card */}
        <section className="bg-theme-maroon rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden mb-20 animate-fade-in stagger-3">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,107,124,0.15),transparent)] z-0" />
          <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 tracking-tight">The 3-Step Predictive Lifecycle</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
               {[
                 { step: '01', title: 'Data Input', desc: 'Securely enter your clinical readings into our specialized forms.', icon: <Activity className="w-6 h-6" /> },
                 { step: '02', title: 'Feature Scaling', desc: 'Real-time normalization ensures your data aligns with the model\'s learned scale.', icon: <Zap className="w-6 h-6" /> },
                 { step: '03', title: 'AI Inference', desc: 'The model analyzes 76+ tree paths to determine your health risk profile.', icon: <Brain className="w-6 h-6" /> }
               ].map((item) => (
                 <div key={item.step} className="flex flex-col items-center">
                    <div className="text-6xl font-black text-white/10 mb-[-2rem]">{item.step}</div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full">
                      <div className="w-10 h-10 rounded-xl bg-theme-gold flex items-center justify-center mb-4 text-theme-maroon mx-auto">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed font-medium">{item.desc}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Confidence Statement */}
        <div className="bg-white/60 backdrop-blur-xl border border-theme-maroon/10 rounded-[2rem] p-8 text-center animate-fade-in stagger-4 shadow-2xl">
          <Award className="w-12 h-12 text-theme-gold mx-auto mb-4" />
          <h2 className="text-2xl font-black text-theme-maroon uppercase mb-3 underline decoration-theme-gold decoration-4 underline-offset-4">The Confidence Factor</h2>
          <p className="text-theme-maroon/70 font-medium leading-relaxed max-w-2xl mx-auto italic">
            "Unlike simple linear regressions, our platform provides a confidence percentage along with every prediction, giving you a detailed view of the likelihood identified by our AI nodes."
          </p>
        </div>
      </div>
    </div>
  )
}
