export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
            Welcome to ARISE
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Your personal career development platform powered by AI. Get interview-ready, build your resume, and navigate your career path with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/dashboard"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </a>
            <a
              href="/features"
              className="px-8 py-3 border border-cyan-400 text-cyan-400 font-medium rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'AI-Powered Interviews',
              description: 'Practice with our AI interviewer that adapts to your skill level and provides detailed feedback.',
              icon: '💬'
            },
            {
              title: 'Smart Resume Builder',
              description: 'Create a professional resume that stands out with our AI-powered builder and templates.',
              icon: '📄'
            },
            {
              title: 'Personalized Roadmap',
              description: 'Get a customized learning path based on your career goals and skill level.',
              icon: '🗺️'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
