'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CallToActionSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden
        before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent">
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="text-gray-300">The world doesn't want you to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">win</span>
            <span className="text-gray-300">.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">We do.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-2xl md:text-3xl font-semibold text-gray-300 mt-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-cyan-400"
            >
              Reforge.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-purple-400"
            >
              Retrain.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-pink-400"
            >
              Rise.
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-16"
        >
          <Link 
            href="/signup" 
            className="relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white transition-all duration-300 rounded-lg group"
          >
            <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity"></span>
            <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></span>
            <span className="relative z-10 flex items-center">
              Begin Your Ascent
              <svg 
                className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
    </section>
  );
}
