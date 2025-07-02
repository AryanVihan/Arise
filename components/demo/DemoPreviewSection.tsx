'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Monitor, FileText, Briefcase, Code } from 'lucide-react';

const demos = [
  {
    id: 1,
    title: 'AI Mock Interview',
    description: 'Experience realistic interview scenarios with our AI interviewer',
    icon: <Monitor className="w-8 h-8" />,
    color: 'from-cyan-400 to-blue-500',
    image: '/demos/interview-preview.png',
  },
  {
    id: 2,
    title: 'Resume Feedback',
    description: 'Get instant, detailed feedback on your resume',
    icon: <FileText className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-500',
    image: '/demos/resume-preview.png',
  },
  {
    id: 3,
    title: 'Portfolio Showcase',
    description: 'Create an impressive portfolio to showcase your work',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'from-amber-400 to-orange-500',
    image: '/demos/portfolio-preview.png',
  },
  {
    id: 4,
    title: 'Code Analysis',
    description: 'Get insights on your coding style and improvements',
    icon: <Code className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-500',
    image: '/demos/code-preview.png',
  },
];

export default function DemoPreviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainer.current) return;
    
    const container = scrollContainer.current;
    const scrollAmount = direction === 'right' 
      ? container.offsetWidth 
      : -container.offsetWidth;
    
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!scrollContainer.current) return;
    
    const container = scrollContainer.current;
    const scrollPosition = container.scrollLeft + container.offsetWidth / 2;
    const cardWidth = container.scrollWidth / demos.length;
    const newIndex = Math.floor(scrollPosition / cardWidth);
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(Math.min(Math.max(0, newIndex), demos.length - 1));
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore interactive demos of our powerful features
          </p>
        </div>

        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 p-2 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/90 transition-all hover:scale-110"
            aria-label="Previous demo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div 
            ref={scrollContainer}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-8 px-2"
          >
            <div className="flex space-x-8 px-8">
              {demos.map((demo, index) => (
                <motion.div
                  key={demo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 md:w-96 snap-center"
                >
                  <div className="group relative h-64 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-400/50 transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                    
                    <div className="relative h-full flex flex-col p-6">
                      <div className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${demo.color} text-white`}>
                        {demo.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{demo.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{demo.description}</p>
                      
                      <div className="mt-auto bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                        <div className="w-full h-32 bg-gray-700/50 rounded flex items-center justify-center text-gray-500">
                          <span className="text-sm">{demo.title} Preview</span>
                        </div>
                      </div>
                      
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-lg transition-all duration-300 -z-10"></div>
                    </div>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg border border-gray-800">
                      Click to view full demo
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-gray-900 border-t border-l border-gray-800"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 p-2 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/90 transition-all hover:scale-110"
            aria-label="Next demo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {demos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!scrollContainer.current) return;
                const container = scrollContainer.current;
                const cardWidth = container.scrollWidth / demos.length;
                container.scrollTo({
                  left: cardWidth * index,
                  behavior: 'smooth'
                });
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-6 bg-gradient-to-r from-cyan-400 to-purple-400' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              aria-label={`Go to demo ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      </div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
    </section>
  );
}
