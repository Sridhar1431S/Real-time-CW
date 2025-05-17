
import { useState } from 'react';
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
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Collaborative Whiteboard</h1>
                <p className="mt-2 text-gray-600">
                  Create and share drawings with your team in real-time.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={() => setIsJoining(!isJoining)} variant="outline">
                  Join Session
                </Button>
                <Button onClick={createNewSession}>
                  New Session
                </Button>
              </div>
            </div>
            
            {isJoining && (
              <div className="flex gap-2 items-center animate-fadeIn">
                <Input
                  placeholder="Enter session ID"
                  value={newSessionId}
                  onChange={(e) => setNewSessionId(e.target.value)}
                  className="max-w-xs"
                />
                <Button onClick={handleJoinSession}>
                  Join
                </Button>
              </div>
            )}
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Current Session:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">{sessionId}</code>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(sessionId);
                    toast.success('Session ID copied to clipboard');
                  }}
                >
                  Copy ID
                </Button>
              </div>
              
              <div className="h-[600px]">
                <Canvas sessionId={sessionId} />
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
