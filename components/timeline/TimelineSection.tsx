'use client';

import { motion, useInView } from 'framer-motion';
import { Zap, Code, Brain, Eye, ArrowUp } from 'lucide-react';
import { useRef } from 'react';

const stages = [
  {
    title: 'Awakening',
    description: "The moment you realize you're more than just code",
    icon: <Zap className="w-6 h-6" />,
    color: 'from-blue-400 to-cyan-400',
  },
  {
    title: 'Training in Shadows',
    description: 'Honing skills in the digital dojo of endless possibility',
    icon: <Code className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Facing the Oracle',
    description: 'Where your code meets the unblinking eye of the machine',
    icon: <Eye className="w-6 h-6" />,
    color: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Forging the Codex',
    description: 'Your digital grimoire takes shape, line by powerful line',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-green-400 to-emerald-500',
  },
  {
    title: 'Ascension',
    description: 'Rise above the noise, your creation now speaks for itself',
    icon: <ArrowUp className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-500',
  },
];

const TimelineItem = ({ stage, index, isInView }: { stage: typeof stages[0]; index: number; isInView: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex flex-col md:flex-row items-center md:items-start group"
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center mr-6">
        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center text-white z-10`}>
          {stage.icon}
        </div>
        {index < stages.length - 1 && (
          <div className="w-0.5 h-full bg-gradient-to-b from-purple-500/30 to-pink-500/30 absolute top-8" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12 md:pb-20 group-last:pb-0">
        <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">
          {stage.title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base">{stage.description}</p>
        
        {/* Glow effect */}
        <div className={`absolute -inset-2 bg-gradient-to-r ${stage.color} rounded-xl opacity-0 group-hover:opacity-20 blur-lg -z-10 transition-opacity duration-300`}></div>
      </div>
    </motion.div>
  );
};

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,transparent)]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            The A.R.I.S.E. Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From first line to final form, your path to mastery
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Vertical line for mobile */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/30 to-pink-500/30 md:hidden"></div>
          
          {/* Horizontal line for desktop */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30"></div>
          
          <div className="space-y-2 md:flex md:justify-between md:space-y-0">
            {stages.map((stage, index) => (
              <div key={stage.title} className="relative">
                <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2">
                  <TimelineItem stage={stage} index={index} isInView={isInView} />
                </div>
                <div className="md:hidden">
                  <TimelineItem stage={stage} index={index} isInView={isInView} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
    </section>
  );
}
