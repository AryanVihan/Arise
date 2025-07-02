'use client';

import { motion } from 'framer-motion';
import { Code, MessageSquare, FileText, Zap, Map, Briefcase, Sparkles } from 'lucide-react';

const features = [
  {
    title: 'AI Interview',
    description: 'Practice with our intelligent interview simulator',
    icon: <MessageSquare className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Resume Analyzer',
    description: 'Get instant feedback on your resume',
    icon: <FileText className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Feedback Engine',
    description: 'Detailed performance insights and tips',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-amber-400 to-orange-500',
  },
  {
    title: 'AI Chat Agent',
    description: '24/7 career guidance and support',
    icon: <Code className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-500',
  },
  {
    title: 'Roadmap Generator',
    description: 'Personalized career path planning',
    icon: <Map className="w-8 h-8" />,
    color: 'from-rose-500 to-pink-500',
  },
  {
    title: 'Portfolio Builder',
    description: 'Create stunning portfolio websites',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'from-violet-500 to-indigo-500',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,transparent)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            Core Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to ace your job search and advance your career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
              <div className="relative bg-gray-900 p-6 rounded-xl h-full border border-gray-800 group-hover:border-transparent transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className="mt-4 flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated elements */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default FeaturesSection;
