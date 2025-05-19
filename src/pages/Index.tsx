
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with Neon Container */}
        <section className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white">
          <div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 neon-container"
            style={{
              '--neon-color-from': '#3498db',
              '--neon-color-to': '#2980b9',
              '--neon-glow-color': '#3498db'
            } as React.CSSProperties}
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fadeIn neon-text">
                Smart Image Classification & Collaborative Whiteboards
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-primary-50 animate-slideUp">
                Upload images for instant AI classification and collaborate with your team on shared whiteboards
              </p>
              <div className="flex flex-wrap justify-center gap-4 animate-slideUp">
                <Link to="/classify">
                  <Button size="lg" className="neon-btn">
                    Classify Images
                  </Button>
                </Link>
                <Link to={isAuthenticated ? "/whiteboard" : "/login"}>
                  <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white neon-btn">
                    Try Whiteboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section with Neon Cards */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform combines state-of-the-art image classification with intuitive collaboration tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Feature 1 - with neon effect */}
              <div 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow neon-container"
                style={{
                  '--neon-color-from': '#3498db',
                  '--neon-color-to': '#3498db',
                  '--neon-glow-color': '#3498db'
                } as React.CSSProperties}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Image Classification</h3>
                <p className="text-gray-600">
                  Upload images and get instant AI-powered classification results with high accuracy and detailed insights.
                </p>
              </div>
              
              {/* Feature 2 - with neon effect */}
              <div 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow neon-container"
                style={{
                  '--neon-color-from': '#2ecc71',
                  '--neon-color-to': '#27ae60',
                  '--neon-glow-color': '#2ecc71'
                } as React.CSSProperties}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaborative Whiteboard</h3>
                <p className="text-gray-600">
                  Draw together in real-time with your team. Multiple tools, colors, and features for seamless collaboration.
                </p>
              </div>
              
              {/* Feature 3 - with neon effect */}
              <div 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow neon-container"
                style={{
                  '--neon-color-from': '#9b59b6',
                  '--neon-color-to': '#8e44ad',
                  '--neon-glow-color': '#9b59b6'
                } as React.CSSProperties}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
                <p className="text-gray-600">
                  Robust authentication system ensures your data and collaborative sessions remain private and secure.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section with Neon Container */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-secondary-500 to-primary-500 text-white">
          <div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center neon-container"
            style={{
              '--neon-color-from': '#2ecc71',
              '--neon-color-to': '#3498db',
              '--neon-glow-color': '#2ecc71'
            } as React.CSSProperties}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Join thousands of professionals and teams using our platform for image analysis and collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={isAuthenticated ? "/whiteboard" : "/signup"}>
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 neon-btn">
                  {isAuthenticated ? "Open Whiteboard" : "Sign Up for Free"}
                </Button>
              </Link>
              <Link to="/classify">
                <Button size="lg" variant="outline" className="border-white hover:bg-white/10 neon-btn">
                  Try Image Classification
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
