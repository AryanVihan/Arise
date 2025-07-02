'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMonitor, FiTablet, FiSmartphone, FiRefreshCw, FiDownload, FiGithub, FiCheck } from 'react-icons/fi';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface LivePreviewPaneProps {
  htmlContent?: string;
  cssContent?: string;
  jsContent?: string;
  className?: string;
}

const deviceDimensions = {
  desktop: { width: '1024px', height: '768px' },
  tablet: { width: '768px', height: '1024px' },
  mobile: { width: '375px', height: '812px' },
};

const LivePreviewPane: React.FC<LivePreviewPaneProps> = ({
  htmlContent = '',
  cssContent = '',
  jsContent = '',
  className = '',
}) => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showHologram, setShowHologram] = useState(false);
  const [buttonState, setButtonState] = useState<{
    download: 'idle' | 'loading' | 'success';
    deploy: 'idle' | 'loading' | 'success';
  }>({
    download: 'idle',
    deploy: 'idle',
  });

  // Generate iframe content
  const generateIframeContent = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            ${cssContent}
            body { 
              margin: 0; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              background: #0f172a;
              color: #f8fafc;
              min-height: 100vh;
            }
          </style>
        </head>
        <body>
          ${htmlContent || '<div class="flex items-center justify-center h-full text-gray-400">Preview will appear here</div>'}
          <script>
            ${jsContent}
            window.parent.postMessage({ type: 'iframeLoaded' }, '*');
          </script>
        </body>
      </html>
    `;
  };

  // Handle iframe messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'iframeLoaded') {
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Update iframe content when dependencies change
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(generateIframeContent());
        iframeDoc.close();
      }
    }
  }, [htmlContent, cssContent, jsContent, refreshKey]);

  // Toggle holographic effect
  useEffect(() => {
    if (!showHologram) return;
    
    const interval = setInterval(() => {
      setShowHologram(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [showHologram]);

  const refreshPreview = () => {
    setIsLoading(true);
    setRefreshKey(prev => prev + 1);
  };

  const handleDownload = () => {
    setButtonState(prev => ({ ...prev, download: 'loading' }));
    
    // Simulate download
    setTimeout(() => {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setButtonState(prev => ({ ...prev, download: 'success' }));
      setTimeout(() => {
        setButtonState(prev => ({ ...prev, download: 'idle' }));
      }, 2000);
    }, 1000);
  };

  const handleDeploy = () => {
    setButtonState(prev => ({ ...prev, deploy: 'loading' }));
    
    // Simulate deployment
    setTimeout(() => {
      setButtonState(prev => ({ ...prev, deploy: 'success' }));
      setTimeout(() => {
        setButtonState(prev => ({ ...prev, deploy: 'idle' }));
      }, 2000);
    }, 1500);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Device Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2 bg-gray-800/50 rounded-lg p-1">
          {(Object.keys(deviceDimensions) as DeviceType[]).map((deviceType) => (
            <button
              key={deviceType}
              onClick={() => setDevice(deviceType)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                device === deviceType
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
              }`}
            >
              {deviceType === 'desktop' && <FiMonitor className="mr-1.5" />}
              {deviceType === 'tablet' && <FiTablet className="mr-1.5" />}
              {deviceType === 'mobile' && <FiSmartphone className="mr-1.5" />}
              {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}
            </button>
          ))}
        </div>
        
        <button
          onClick={refreshPreview}
          disabled={isLoading}
          className="p-2 rounded-md text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 transition-colors"
          title="Refresh preview"
        >
          <FiRefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>

        <div className="flex space-x-3">
          <motion.button
            onClick={handleDownload}
            disabled={buttonState.download !== 'idle'}
            className={`relative px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all duration-300 ${
              buttonState.download === 'success' 
                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonState.download === 'loading' ? (
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mr-2" />
            ) : buttonState.download === 'success' ? (
              <FiCheck className="w-4 h-4 mr-2" />
            ) : (
              <FiDownload className="w-4 h-4 mr-2" />
            )}
            {buttonState.download === 'success' ? 'Downloaded!' : 'Download HTML'}
          </motion.button>

          <motion.button
            onClick={handleDeploy}
            disabled={buttonState.deploy !== 'idle'}
            className={`relative px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all duration-300 ${
              buttonState.deploy === 'success'
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 border border-purple-500/30 hover:border-purple-400/50 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonState.deploy === 'loading' ? (
              <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mr-2" />
            ) : buttonState.deploy === 'success' ? (
              <FiCheck className="w-4 h-4 mr-2" />
            ) : (
              <FiGithub className="w-4 h-4 mr-2" />
            )}
            {buttonState.deploy === 'success' ? 'Deployed!' : 'Deploy to GitHub'}
          </motion.button>
        </div>
      </div>

      {/* Preview Container */}
      <motion.div
        key={`${device}-${refreshKey}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mx-auto rounded-xl bg-gray-900/80 border border-gray-700/50 shadow-2xl overflow-hidden"
        style={{
          width: deviceDimensions[device].width,
          maxWidth: '100%',
          height: deviceDimensions[device].height,
          boxShadow: showHologram 
            ? '0 0 40px rgba(14, 165, 233, 0.2), 0 0 80px rgba(168, 85, 247, 0.15)' 
            : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Loading overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-3" />
                <span className="text-cyan-400 font-medium">Loading Preview...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Holographic effect */}
        <div 
          className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
            showHologram ? 'opacity-30' : 'opacity-10'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          className="w-full h-full bg-white"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="Portfolio Preview"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />

        {/* Glow effect */}
        <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,255,0.05),transparent_70%)]" />
        </div>
      </motion.div>
    </div>
  );
};

export default LivePreviewPane;
