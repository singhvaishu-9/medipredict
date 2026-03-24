/**
 * ResultCard.jsx — Reusable prediction result card.
 * Green for negative, Red/Pink gradient for positive.
 * Animated progress bar + pulsing border.
 */
import { CheckCircle, AlertTriangle } from 'lucide-react'

export default function ResultCard({ result }) {
  if (!result) return null

  const isPositive = result.prediction === 1
  const confidence = result.confidence || 0

  return (
    <div
      className={`mt-8 rounded-2xl p-6 sm:p-8 animate-slide-up result-card-pulse relative overflow-hidden ${
        isPositive
          ? 'bg-theme-maroon/5 border-2 border-theme-maroon/20'
          : 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
      }`}
    >
      {/* Decorative gradient bar at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        isPositive
          ? 'bg-theme-maroon'
          : 'bg-gradient-to-r from-green-500 to-emerald-400'
      }`} />

      {/* Icon + Title */}
      <div className="flex items-center gap-4 mb-5">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
          isPositive
            ? 'bg-theme-maroon text-white'
            : 'bg-gradient-to-br from-green-500 to-emerald-500'
        }`}>
          {isPositive ? (
            <AlertTriangle className="w-7 h-7 text-white" />
          ) : (
            <CheckCircle className="w-7 h-7 text-white" />
          )}
        </div>
        <div>
          <h3 className={`text-xl font-bold ${
            isPositive ? 'text-theme-maroon' : 'text-green-600'
          }`}>
            {isPositive ? '⚠️ Disease Detected' : '✅ No Disease Detected'}
          </h3>
          <p className="text-gray-500 text-sm mt-0.5">{result.disease}</p>
        </div>
      </div>

      {/* Confidence Progress Bar */}
      <div className="mb-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 font-medium">Confidence Level</span>
          <span className={`font-bold ${isPositive ? 'text-theme-maroon' : 'text-green-600'}`}>
            {confidence}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full progress-fill ${
              isPositive
                ? 'bg-theme-maroon'
                : 'bg-gradient-to-r from-green-500 to-emerald-400'
            }`}
            style={{ '--fill-width': `${confidence}%`, width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* Health Advice */}
      {result.message && (
        <div className={`p-4 rounded-xl text-sm leading-relaxed ${
          isPositive
            ? 'bg-theme-maroon/10 text-theme-maroon border border-theme-maroon/20'
            : 'bg-green-50 text-green-700 border border-green-100'
        }`}>
          {result.message}
        </div>
      )}
    </div>
  )
}
