'use client';

import { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX, FiLink, FiUser, FiAward, FiFileText } from 'react-icons/fi';

type Project = {
  id: string;
  name: string;
  url: string;
  description: string;
};

type FormData = {
  name: string;
  tagline: string;
  about: string;
  skills: string;
  projects: Project[];
};

type PersonalInfoFormProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onGenerate: () => void;
};

const PersonalInfoForm = ({ formData, setFormData, onGenerate }: PersonalInfoFormProps) => {
  // Memoize the form fields to prevent unnecessary re-renders
  const { name, tagline, about, skills, projects } = formData;

  // Memoize handlers to prevent unnecessary re-renders
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, [setFormData]);

  const handleProjectChange = useCallback((id: string, field: keyof Project, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  }, [setFormData]);

  const addProject = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { 
          id: Date.now().toString(), // Convert to string to match the type
          name: '', 
          url: '', 
          description: '' 
        }
      ]
    }));
  }, [setFormData]);

  const removeProject = useCallback((id: string) => {
    if (formData.projects.length > 1) {
      setFormData(prev => ({
        ...prev,
        projects: prev.projects.filter(project => project.id !== id)
      }));
    }
  }, [formData.projects.length, setFormData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10,
        delay: i * 0.1
      }
    })
  } as const;

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        variants={itemVariants}
      >
        Create Your Portfolio
      </motion.h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="relative w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="tagline">
            Professional Tagline
          </label>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <input
              type="text"
              id="tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleInputChange}
              className="relative w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Full Stack Developer | React Specialist"
              required
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="about">
            About Me
          </label>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              rows={4}
              className="relative w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself, your experience, and what makes you unique..."
              required
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="skills">
            Skills (comma separated)
          </label>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="relative w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., React, Node.js, TypeScript, UI/UX"
              required
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-200">Projects</h3>
            <button
              type="button"
              onClick={addProject}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-cyan-400 bg-cyan-900/50 hover:bg-cyan-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <FiPlus className="mr-1.5 h-3.5 w-3.5" />
              Add Project
            </button>
          </div>

          <div className="space-y-4">
            {formData.projects.map((project, index) => (
              <motion.div 
                key={project.id}
                className="relative p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                variants={itemVariants}
              >
                {formData.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-400 focus:outline-none"
                    title="Remove project"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Project Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-md blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                        className="relative w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Project Name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Project URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-md blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-700 text-gray-300 text-sm">
                          <FiLink className="h-4 w-4" />
                        </span>
                        <input
                          type="url"
                          value={project.url}
                          onChange={(e) => handleProjectChange(project.id, 'url', e.target.value)}
                          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-gray-800 border border-l-0 border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/project"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Description
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-md blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                      <textarea
                        value={project.description}
                        onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                        rows={2}
                        className="relative w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Brief description of the project and your role..."
                        required
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="pt-6"
          variants={itemVariants}
        >
          <button
            type="submit"
            className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <span className="relative z-10 flex items-center">
              <FiAward className="mr-2 h-5 w-5" />
              Generate My Portfolio
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0 blur-md"></div>
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default PersonalInfoForm;
