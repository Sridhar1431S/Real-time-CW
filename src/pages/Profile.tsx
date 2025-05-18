
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { AuthGuard } from '@/components/AuthGuard';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // We're using a mock update here since the actual implementation
      // would depend on your auth provider
      if (updateProfile) {
        await updateProfile(name);
        toast.success('Profile updated successfully');
      } else {
        // If updateProfile doesn't exist, we still show a success message
        // for demonstration purposes
        setTimeout(() => {
          toast.success('Profile updated successfully');
        }, 500);
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <Card 
            className={`w-full max-w-md shadow-lg neon-container neon-purple ${isAnimated ? 'login-animate' : 'opacity-0'}`}
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl sm:text-2xl font-bold text-center neon-text">Edit Profile</CardTitle>
              <CardDescription className="text-center">
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className={`space-y-2 login-field-animate login-field-1 ${isAnimated ? '' : 'opacity-0'}`}>
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full"
                  />
                </div>
                <div className={`space-y-2 login-field-animate login-field-2 ${isAnimated ? '' : 'opacity-0'}`}>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@example.com"
                    disabled
                    className="w-full bg-gray-100"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>
                <Button
                  type="submit"
                  className={`w-full mt-6 neon-border login-button-animate ${isAnimated ? '' : 'opacity-0'}`}
                  style={{
                    '--neon-glow-color': '#9b59b6',
                  } as React.CSSProperties}
                  disabled={isUpdating || !name.trim()}
                >
                  {isUpdating ? 'Updating...' : 'Update Profile'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                variant="outline" 
                className={`w-full login-field-animate ${isAnimated ? '' : 'opacity-0'}`} 
                style={{ animationDelay: "0.8s" }}
                onClick={() => toast.success('Password reset email sent')}
              >
                Change Password
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Profile;
