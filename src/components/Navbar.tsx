
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, Image, Edit3 } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-white font-bold text-lg">ImgBoard</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-primary-100 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/classify" className="text-white hover:text-primary-100 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Image className="w-4 h-4 mr-1" />
              Classify
            </Link>
            {isAuthenticated && (
              <Link to="/whiteboard" className="text-white hover:text-primary-100 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <Edit3 className="w-4 h-4 mr-1" />
                Whiteboard
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:text-primary-100 flex items-center"
                >
                  <User className="w-4 h-4 mr-1" />
                  {user?.name}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-white hover:text-primary-100 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="ghost" size="sm" className="text-white">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary">
            <Link 
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-primary-100 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link 
              to="/classify"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-primary-100 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Image className="w-4 h-4 mr-2" />
              Classify
            </Link>
            {isAuthenticated && (
              <Link 
                to="/whiteboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-primary-100 block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Whiteboard
              </Link>
            )}
            
            {isAuthenticated ? (
              <>
                <div className="text-white hover:text-primary-100 block px-3 py-2 rounded-md text-base font-medium flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {user?.name}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:text-primary-100 block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-primary-100 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-primary-100 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
