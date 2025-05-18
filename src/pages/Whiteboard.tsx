
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Canvas } from '@/components/whiteboard/Canvas';
import { AuthGuard } from '@/components/AuthGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

const Whiteboard = () => {
  const [sessionId, setSessionId] = useState<string>('default-session');
  const [newSessionId, setNewSessionId] = useState<string>('');
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [activeColor, setActiveColor] = useState<string>('#3498db'); // Default neon color
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleJoinSession = () => {
    if (!newSessionId.trim()) {
      toast.error('Please enter a valid session ID');
      return;
    }
    
    setSessionId(newSessionId.trim());
    setIsJoining(false);
    toast.success(`Joined session: ${newSessionId.trim()}`);
  };

  const createNewSession = () => {
    const randomId = `session-${Math.random().toString(36).substring(2, 9)}`;
    setNewSessionId(randomId);
    setSessionId(randomId);
    toast.success(`Created new session: ${randomId}`);
  };

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-6 sm:py-8 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mt-16">
          <div className={`space-y-4 sm:space-y-6 ${isAnimated ? 'login-animate' : 'opacity-0'}`}>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight neon-text text-primary">Collaborative Whiteboard</h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
                  Create and share drawings with your team in real-time.
                </p>
              </div>
              
              <div className="flex flex-col xs:flex-row sm:flex-row gap-2">
                <Button 
                  onClick={() => setIsJoining(!isJoining)} 
                  variant="outline" 
                  className="neon-btn neon-border"
                  style={{
                    '--neon-glow-color': activeColor,
                  } as React.CSSProperties}
                >
                  Join Session
                </Button>
                <Button 
                  onClick={createNewSession} 
                  className="neon-btn neon-border"
                  style={{
                    '--neon-glow-color': activeColor,
                  } as React.CSSProperties}
                >
                  New Session
                </Button>
              </div>
            </div>
            
            {isJoining && (
              <div className="flex flex-col xs:flex-row gap-2 items-start xs:items-center animate-fadeIn">
                <Input
                  placeholder="Enter session ID"
                  value={newSessionId}
                  onChange={(e) => setNewSessionId(e.target.value)}
                  className="flex-grow max-w-full xs:max-w-xs"
                />
                <Button 
                  onClick={handleJoinSession} 
                  className="w-full xs:w-auto neon-btn neon-border"
                  style={{
                    '--neon-glow-color': activeColor,
                  } as React.CSSProperties}
                >
                  Join
                </Button>
              </div>
            )}
            
            <div 
              className="bg-white p-3 sm:p-4 rounded-lg shadow-md neon-container login-container-glow"
              style={{
                '--neon-color-from': activeColor,
                '--neon-color-to': activeColor,
                '--neon-glow-color': activeColor
              } as React.CSSProperties}
            >
              <div className="mb-3 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-semibold">Current Session:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm break-all">{sessionId}</code>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(sessionId);
                    toast.success('Session ID copied to clipboard');
                  }}
                  className="self-start xs:self-center"
                >
                  Copy ID
                </Button>
              </div>
              
              <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <Canvas 
                  sessionId={sessionId}
                  onColorChange={setActiveColor}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Whiteboard;
