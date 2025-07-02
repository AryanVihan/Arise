'use client';

import Image from 'next/image';
import Link from 'next/link';

function HeroSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      
      {/* Glowing Orb */}
      <div className="absolute -right-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-3xl"></div>
      
      {/* Phoenix/Orb Image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
        <div className="relative h-[600px] w-[600px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-2xl"></div>
          <Image
            src="/phoenix-orb.png"
            alt="Phoenix Orb"
            width={600}
            height={600}
            className="relative z-10 h-full w-full object-contain"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-screen flex-col items-start justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl animate-fade-in-up opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards]">
          <h1 className="mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent md:text-7xl lg:text-8xl">
            A.R.I.S.E.
          </h1>
          
          <p className="mb-12 max-w-2xl text-xl text-gray-300 md:text-2xl animate-fade-in-up opacity-0 [animation-delay:0.4s] [animation-fill-mode:forwards]">
            AI Recruitment & Interview Simulation Engine
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 animate-fade-in-up opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
            <Link 
              href="/begin-ascent" 
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-center font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
            >
              <span className="relative z-10">Begin Ascent</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="absolute inset-0 bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 group-hover:animate-shine group-hover:opacity-100"></div>
            </Link>
            
            <Link 
              href="/launch-codex" 
              className="group relative overflow-hidden rounded-lg border-2 border-blue-400/50 bg-transparent px-8 py-4 text-center font-bold text-blue-300 transition-all duration-300 hover:border-blue-300 hover:bg-blue-500/10 hover:text-white"
            >
              <span className="relative z-10">Launch Codex</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,transparent)]"></div>
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-1 w-1 rounded-full bg-blue-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              animationDirection: Math.random() > 0.5 ? 'alternate' : 'alternate-reverse',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
