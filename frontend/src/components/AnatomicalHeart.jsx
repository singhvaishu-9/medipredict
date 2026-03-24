import React from 'react';

export default function AnatomicalHeart({ className }) {
  return (
    <div className={`relative ${className}`}>
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(107,29,32,0.25)]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb3ba" stopOpacity="0.85"/>
            <stop offset="40%" stopColor="#fcaba0" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#6b1d20" stopOpacity="1"/>
          </linearGradient>
          
          <linearGradient id="aortaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#6b1d20" />
            <stop offset="100%" stopColor="#e35d5b" />
          </linearGradient>
          
          <linearGradient id="pulmonaryGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cca471" />
            <stop offset="100%" stopColor="#fcaba0" />
          </linearGradient>
          
          <radialGradient id="highlight" cx="35%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </radialGradient>

          <filter id="glassBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Subtle glowing halo/pulse behind the heart */}
        <circle cx="100" cy="110" r="75" fill="#cca471" opacity="0.08" className="animate-pulse-ring" />
        <circle cx="100" cy="110" r="60" fill="#6b1d20" opacity="0.05" />

        {/* Superior Vena Cava */}
        <path d="M 65,75 C 60,40 70,30 85,30 C 90,30 95,45 85,75 Z" fill="url(#aortaGrad)" opacity="0.8" />
        
        {/* Aorta Arch */}
        <path d="M 90,65 C 80,10 135,10 140,30 C 145,50 140,65 125,75 C 110,65 100,65 90,65 Z" fill="url(#aortaGrad)" />
        <path d="M 120,25 C 125,15 130,10 135,20 L 140,30 Z" fill="url(#aortaGrad)" opacity="0.5"/>
        <path d="M 105,18 L 110,10 L 115,18 Z" fill="url(#aortaGrad)"/>
        
        {/* Pulmonary Artery */}
        <path d="M 105,75 C 130,50 160,55 165,75 C 170,95 145,95 135,85 C 125,95 115,85 105,75 Z" fill="url(#pulmonaryGrad)" />

        {/* Right Atrium */}
        <path d="M 65,75 C 30,85 30,115 50,135 C 75,115 75,95 85,85 Z" fill="url(#bodyGrad)" opacity="0.9" />

        {/* Main Ventricles (Left & Right blended) */}
        <path d="M 50,135 C 30,175 85,195 115,190 C 160,180 165,120 150,90 C 130,80 80,75 50,135 Z" fill="url(#bodyGrad)" />
        
        {/* Glossy Overlay for Glassmorphism 3D effect */}
        <path d="M 55,130 C 45,150 70,170 95,170 C 125,170 145,130 140,100 C 130,90 90,85 55,130 Z" fill="url(#highlight)" />

        {/* Coronary Arteries / Tech AI Veins */}
        <path d="M 105,90 C 105,125 150,150 120,180" fill="none" stroke="#cca471" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        <path d="M 105,90 C 80,115 95,145 75,170" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
        
        {/* Smaller branching vessels */}
        <path d="M 125,115 C 135,130 155,140 145,160" fill="none" stroke="#cca471" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 85,115 C 70,125 70,140 60,145" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        
        {/* Nodes simulating AI / Data processing overlaid on the heart */}
        <circle cx="105" cy="90" r="4.5" fill="#ffffff" filter="url(#glassBlur)"/>
        <circle cx="125" cy="115" r="3.5" fill="#ffffff" />
        <circle cx="85" cy="115" r="3.5" fill="#ffffff" />
        <circle cx="145" cy="140" r="2.5" fill="#ffffff" />
        <circle cx="95" cy="145" r="2.5" fill="#ffffff" />

        {/* Data processing interconnect lines */}
        <path d="M 105,90 L 125,115 L 145,140" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 2"/>
        <path d="M 105,90 L 85,115 L 95,145" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 2"/>

      </svg>
    </div>
  );
}
