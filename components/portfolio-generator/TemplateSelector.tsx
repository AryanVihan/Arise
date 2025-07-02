'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, useAnimation } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';

export interface Template {
  id: string;
  name: string;
  description: string;
  gradient: string;
  features: string[];
}

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design focusing on your content',
    gradient: 'from-blue-500 to-cyan-400',
    features: ['Single Page', 'Responsive', 'Dark Theme'],
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Sleek design with smooth animations',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Animated Sections', 'Project Showcase', 'Dark/Light Mode'],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate look with detailed sections',
    gradient: 'from-emerald-500 to-teal-400',
    features: ['Multi-page', 'Testimonials', 'Contact Form'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and artistic portfolio style',
    gradient: 'from-amber-500 to-orange-500',
    features: ['Custom Animations', 'Interactive Elements', 'Unique Layout'],
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(templates[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: string) => {
    setSelectedTemplate(id);
    onSelect(id);
  };

  const nextTemplate = () => {
    const newIndex = (currentIndex + 1) % templates.length;
    setCurrentIndex(newIndex);
    updateSliderPosition(newIndex);
  };

  const prevTemplate = () => {
    const newIndex = (currentIndex - 1 + templates.length) % templates.length;
    setCurrentIndex(newIndex);
    updateSliderPosition(newIndex);
  };

  const updateSliderPosition = (index: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const scrollPosition = index * (containerWidth * 0.8 + 16); // 80% width + gap
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleDragStart = (e: any) => {
    // Using 'any' type here to bypass the complex union type issue
    // This is a workaround for Framer Motion's drag event typing
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragEnd = (e: any, info: PanInfo) => {
    const dragDistance = info.offset.x;
    const dragThreshold = 50; // Minimum distance to trigger slide change

    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0) {
        prevTemplate();
      } else {
        nextTemplate();
      }
    }
  };

  // Auto-center the selected template on mobile
  const scrollToSelected = () => {
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const selectedCard = document.getElementById(`template-${selectedTemplate}`);
        selectedCard?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }, 100);
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={prevTemplate}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700/80 transition-all duration-200 shadow-lg hidden md:flex"
          aria-label="Previous template"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextTemplate}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700/80 transition-all duration-200 shadow-lg hidden md:flex"
          aria-label="Next template"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        {/* Template Carousel */}
        <motion.div
          ref={containerRef}
          className="flex overflow-x-auto pb-6 md:pb-8 -mx-4 px-4 md:px-0 scrollbar-hide"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          initial={false}
          animate={controls}
        >
          <div className="flex space-x-4 md:space-x-6 px-2">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                id={`template-${template.id}`}
                className={`flex-shrink-0 w-[calc(100vw-4rem)] sm:w-96 h-64 rounded-2xl p-0.5 cursor-pointer transition-all duration-300 ${
                  selectedTemplate === template.id
                    ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-cyan-400 scale-105'
                    : 'opacity-80 hover:opacity-100 hover:scale-[1.02]'
                }`}
                onClick={() => handleSelect(template.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-5">
                  {/* Template Preview */}
                  <div className="absolute inset-0 opacity-20">
                    <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-30`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{template.name}</h3>
                        <p className="text-sm text-gray-300 mt-1">{template.description}</p>
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                          <FiCheck className="text-white w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex-1 flex items-center justify-center">
                      <div className="w-full h-24 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                        <span className="text-xs text-gray-400">Template Preview</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 border border-gray-700"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile Indicators */}
      <div className="flex justify-center mt-6 space-x-2 md:hidden">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => {
              const index = templates.findIndex((t) => t.id === template.id);
              setCurrentIndex(index);
              setSelectedTemplate(template.id);
              updateSliderPosition(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              selectedTemplate === template.id ? 'w-6 bg-cyan-400' : 'bg-gray-600'
            }`}
            aria-label={`Go to ${template.name} template`}
          />
        ))}
      </div>

      {/* Selected Template Info */}
      <AnimatePresence mode="wait">
        {templates.map(
          (template) =>
            selectedTemplate === template.id && (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-8 text-center"
              >
                <h3 className="text-xl font-semibold text-white">{template.name} Template Selected</h3>
                <p className="text-gray-400 mt-1">
                  {template.description}
                </p>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateSelector;
