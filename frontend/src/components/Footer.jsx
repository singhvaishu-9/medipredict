/**
 * Footer.jsx — Deep red/rose gradient footer.
 * White text, beating heart icon, disclaimer.
 */
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-theme-maroon mt-auto shadow-[0_-4px_20px_rgba(107,29,32,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-theme-gold fill-theme-gold animate-heartbeat" />
              <span className="text-xl font-bold text-white tracking-tight">
                MediPredict AI
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              AI-powered disease prediction using state-of-the-art machine learning models for early health risk assessment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/" className="hover:text-theme-gold transition-colors">Home</a></li>
              <li><a href="/diabetes" className="hover:text-theme-gold transition-colors">Diabetes</a></li>
              <li><a href="/heart" className="hover:text-theme-gold transition-colors">Heart Disease</a></li>
              <li><a href="/parkinsons" className="hover:text-theme-gold transition-colors">Parkinson's</a></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">More</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/breast-cancer" className="hover:text-theme-gold transition-colors">Breast Cancer</a></li>
              <li><a href="/liver" className="hover:text-theme-gold transition-colors">Liver Disease</a></li>
              <li><a href="/learn-more" className="hover:text-theme-gold transition-colors">Learn More</a></li>
              <li><a href="/about" className="hover:text-theme-gold transition-colors">About</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-white/60 text-xs text-center leading-relaxed">
            ⚕️ <strong>Disclaimer:</strong> MediPredict AI is built for educational purposes only.
            This tool is not a substitute for professional medical advice, diagnosis, or treatment.
            Always seek the advice of your physician or other qualified health provider.
          </p>
          <p className="text-white/40 text-xs text-center mt-3">
            © {new Date().getFullYear()} MediPredict AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
