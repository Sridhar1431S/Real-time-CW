
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [isAnimated, setIsAnimated] = useState(false);
  const neonColor = '#e74c3c'; // Default neon color for NotFound page

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div 
        className={`text-center neon-container p-10 ${isAnimated ? 'login-animate' : 'opacity-0'}`}
        style={{
          '--neon-color-from': neonColor,
          '--neon-color-to': neonColor,
          '--neon-glow-color': neonColor
        } as React.CSSProperties}
      >
        <h1 className="text-6xl font-bold mb-4 neon-text" style={{ color: neonColor }}>404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <a 
          href="/" 
          className="text-primary hover:text-primary/80 underline neon-text neon-border px-6 py-2 rounded-md inline-block"
          style={{
            '--neon-glow-color': '#3498db',
          } as React.CSSProperties}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
