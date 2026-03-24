/**
 * Navbar.jsx — MediPredict AI navigation bar.
 * White background with pink bottom border, heart logo, pink underline hover effects.
 */
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/learn-more', label: 'Learn More' },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 bg-theme-top/90 backdrop-blur-md border-b-[1px] border-theme-maroon/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-10 h-10 rounded-xl bg-theme-maroon flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-md shadow-theme-maroon/20">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-theme-maroon tracking-tight">
              MediPredict <span className="text-theme-gold">AI</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                id={`nav-${link.path.replace('/', '') || 'home'}`}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300
                  ${location.pathname === link.path
                    ? 'text-theme-maroon font-bold'
                    : 'text-theme-maroon/70 hover:text-theme-maroon'
                  }`}
              >
                {link.label}
                {/* Active red underline */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-theme-maroon transition-all duration-300
                  ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-theme-maroon/70 hover:text-theme-maroon hover:bg-theme-maroon/5 transition-all duration-300"
              id="nav-mobile-toggle"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-theme-top border-t border-theme-maroon/10 px-4 pt-2 pb-4 space-y-1 shadow-lg shadow-theme-maroon/5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300
                ${location.pathname === link.path
                  ? 'bg-theme-maroon/10 text-theme-maroon border-l-4 border-theme-maroon'
                  : 'text-theme-maroon/70 hover:text-theme-maroon hover:bg-theme-maroon/5'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
