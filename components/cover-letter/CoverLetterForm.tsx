'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoverLetterPreview from './CoverLetterPreview';

const CoverLetterForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    skills: '',
    tone: 'Professional', // Default tone
    highlights: ''
  });
  
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const tones = ['Professional', 'Enthusiastic', 'Formal', 'Creative', 'Friendly'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setShowPreview(true);
    
    try {
      // Simulate API call to generate cover letter
      // Replace this with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock generated content - replace with actual API response
      const mockContent = `Dear Hiring Manager,

I am excited to apply for the ${formData.role} position at ${formData.company}. With my expertise in ${formData.skills}, I am confident in my ability to contribute effectively to your team.

${formData.highlights}

I look forward to the opportunity to discuss how my skills and experiences align with your needs. Thank you for your time and consideration.

Best regards,
[Your Name]`;
      
      setGeneratedContent(mockContent);
    } catch (error) {
      console.error('Error generating cover letter:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleEdit = () => {
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full ${showPreview ? 'max-w-7xl' : 'max-w-2xl'} transition-all duration-300`}
      >
        <div className="relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-cyan-400/20 shadow-2xl shadow-cyan-500/10">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 -z-10" />
          
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Generate Your Cover Letter
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                placeholder=" "
                required
              />
              <label className="absolute left-3 -top-2.5 px-1 text-sm bg-gray-900 text-cyan-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400 pointer-events-none">
                Role you're applying for
              </label>
            </div>

            <div className="relative group">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                placeholder=" "
                required
              />
              <label className="absolute left-3 -top-2.5 px-1 text-sm bg-gray-900 text-cyan-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400 pointer-events-none">
                Company name
              </label>
            </div>

            <div className="relative group">
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                placeholder=" "
                required
              />
              <label className="absolute left-3 -top-2.5 px-1 text-sm bg-gray-900 text-cyan-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400 pointer-events-none">
                Key skills (comma separated)
              </label>
            </div>

            <div className="relative group">
              <select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
              >
                {tones.map(tone => (
                  <option key={tone} value={tone} className="bg-gray-800">
                    {tone}
                  </option>
                ))}
              </select>
              <label className="absolute left-3 -top-2.5 px-1 text-sm bg-gray-900 text-cyan-400">
                Tone
              </label>
            </div>

            <div className="relative group">
              <textarea
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 resize-none"
                placeholder=" "
                required
              />
              <label className="absolute left-3 -top-2.5 px-1 text-sm bg-gray-900 text-cyan-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400 pointer-events-none">
                Your key achievements & highlights
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2">Generate Cover Letter</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </form>
          
          <AnimatePresence mode="wait">
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <CoverLetterPreview 
                  content={generatedContent}
                  onEdit={handleEdit}
                  isGenerating={isGenerating}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CoverLetterForm;
