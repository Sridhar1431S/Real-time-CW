
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="text-center md:text-left">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} ImgBoard. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link to="/" className="text-gray-600 hover:text-primary-500 text-sm">
              Home
            </Link>
            <Link to="/classify" className="text-gray-600 hover:text-primary-500 text-sm">
              Classify
            </Link>
            <Link to="/whiteboard" className="text-gray-600 hover:text-primary-500 text-sm">
              Whiteboard
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-primary-500 text-sm">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
