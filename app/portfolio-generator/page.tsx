'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalInfoForm from '@/components/portfolio-generator/PersonalInfoForm';
import TemplateSelector from '@/components/portfolio-generator/TemplateSelector';
import LivePreviewPane from '@/components/portfolio-generator/LivePreviewPane';

const defaultHtml = `
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-white mb-4">Your Portfolio</h1>
      <p class="text-gray-300 mb-8">Start building your portfolio by filling out the form</p>
      <div class="animate-pulse flex space-x-4 justify-center">
        <div class="h-3 w-3 bg-cyan-500 rounded-full"></div>
        <div class="h-3 w-3 bg-purple-500 rounded-full"></div>
        <div class="h-3 w-3 bg-pink-500 rounded-full"></div>
      </div>
    </div>
  </div>
`;

const defaultCss = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  body {
    background: linear-gradient(-45deg, #0f172a, #1e293b, #1e1b4b, #1e1b4b);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }
`;

export default function PortfolioGeneratorPage() {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    about: '',
    skills: '',
    projects: [{ id: 1, name: '', url: '', description: '' }],
  });

  // Generate portfolio HTML based on form data
  const portfolioHtml = useMemo(() => {
    if (step === 1) return defaultHtml;
    
    const skills = formData.skills.split(',').filter(skill => skill.trim() !== '');
    
    return `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <!-- Hero Section -->
        <section class="py-20 px-6 text-center">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              ${formData.name || 'Your Name'}
            </h1>
            <p class="text-xl text-cyan-300 mb-8">${formData.tagline || 'Professional Tagline'}</p>
            <p class="text-gray-300 max-w-2xl mx-auto">
              ${formData.about || 'A passionate developer building amazing web experiences.'}
            </p>
          </div>
        </section>

        <!-- Skills Section -->
        ${skills.length > 0 ? `
          <section class="py-16 bg-gray-800/50">
            <div class="max-w-6xl mx-auto px-6">
              <h2 class="text-3xl font-bold text-center mb-12">Skills</h2>
              <div class="flex flex-wrap justify-center gap-3">
                ${skills.map(skill => `
                  <span class="px-4 py-2 bg-cyan-900/30 text-cyan-300 rounded-full text-sm font-medium">
                    ${skill.trim()}
                  </span>
                `).join('')}
              </div>
            </div>
          </section>
        ` : ''}

        <!-- Projects Section -->
        <section class="py-16">
          <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-12">Projects</h2>
            <div class="grid md:grid-cols-2 gap-8">
              ${formData.projects
                .filter(p => p.name || p.description)
                .map(project => `
                  <div class="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50">
                    <h3 class="text-xl font-semibold text-cyan-400 mb-2">${project.name || 'Project Name'}</h3>
                    ${project.url ? `
                      <a href="${project.url}" target="_blank" rel="noopener noreferrer" 
                        class="text-sm text-cyan-300 hover:underline inline-block mb-3">
                        ${new URL(project.url).hostname}
                      </a>
                    ` : ''}
                    ${project.description ? `
                      <p class="text-gray-300">${project.description}</p>
                    ` : ''}
                  </div>
                `).join('')}
            </div>
          </div>
        </section>
      </div>
    `;
  }, [formData, step]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Portfolio Generator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-md mx-auto mb-2">
                {[1, 2].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span className="mt-2 text-sm text-gray-400">
                      {stepNumber === 1 ? 'Template' : 'Details'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative h-1 bg-gray-700 rounded-full max-w-md mx-auto">
                <div
                  className="absolute top-0 left-0 h-full bg-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${(step - 1) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="template-selector"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full"
                >
                  <TemplateSelector onSelect={handleTemplateSelect} />
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={nextStep}
                      disabled={!selectedTemplate}
                      className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                        selectedTemplate
                          ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Next: Your Information
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="personal-info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full"
                >
                  <div className="mb-6">
                    <button
                      onClick={prevStep}
                      className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
                    >
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back to Templates
                    </button>
                    <h2 className="text-2xl font-bold text-white">
                      Tell us about yourself
                    </h2>
                    <p className="text-gray-400 mt-1">
                      Fill in your details to generate your portfolio
                    </p>
                  </div>
                  <PersonalInfoForm 
                    formData={formData}
                    setFormData={setFormData}
                    onGenerate={() => {}}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side - Preview */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <div className="h-full">
              <LivePreviewPane 
                htmlContent={portfolioHtml}
                cssContent={defaultCss}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
